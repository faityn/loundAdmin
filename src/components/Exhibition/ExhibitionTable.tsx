"use client";

import getToken from "@/helper/getToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { getExhibitionTable, saveExhibitionTable } from "@/hooks/useData";
import AlertModal from "../Modal/AlertModal";
import { FaCaretDown, FaRegCheckCircle } from "react-icons/fa";
import { LuAlertCircle } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPlusCircle } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuPermissionAtom, userExhibitionTablesAtom } from "@/atom";

import { UserExhibitionTablesType } from "@/types/adminType";
interface Props {
  url?: string;
  id: number;
}
interface FormData {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  image: string;
  status: string;
  interests?: string;
  purposes?: string;
  lectures?: string;
  lecture_img?: string;
}

const ExhibitionTable = ({ id, url }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);

  const menuPermission = useRecoilValue(menuPermissionAtom);
  const [exhibitionTableArray, setExhibitionTableArray] = useRecoilState(
    userExhibitionTablesAtom
  );

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getData = async () => {
    const userToken = getToken();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nArray: UserExhibitionTablesType[] = [];
    const response = await getExhibitionTable(String(userToken), id);

    if (response?.status) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response?.result?.map((item: UserExhibitionTablesType) => {
        const newObject = {
          tableNo: item?.tableNo,
          personCnt: item?.personCnt,
        };
        nArray.push(newObject);
      });

      setExhibitionTableArray(nArray);
    }

    //setOptionsList([response?.result]);
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    router.push(`${url}`);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const handleTablePlus = () => {
    const newObject = { tableNo: 0, personCnt: 0 };

    setExhibitionTableArray([...exhibitionTableArray, newObject]);
  };

  const handleTableNumber = (val: string, index: number) => {
    if (Number(val) >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedArray = exhibitionTableArray?.map((item: any, i: number) =>
        i === index
          ? {
              ...item,
              tableNo: Number(val),
            }
          : item
      );
      setExhibitionTableArray(updatedArray);
    }
  };

  const handlePersonCount = (val: string, index: number) => {
    if (Number(val) >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedArray = exhibitionTableArray?.map((item: any, i: number) =>
        i === index
          ? {
              ...item,
              personCnt: Number(val),
            }
          : item
      );
      setExhibitionTableArray(updatedArray);
    }
  };

  const tableRemove = (index: number) => {
    const updatedItems = exhibitionTableArray?.filter((_, i) => i !== index);
    setExhibitionTableArray(updatedItems);
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    setLoading(true);
    const token = getToken();
    const exhibitionId = id;

    const res = await saveExhibitionTable(
      token as string,
      exhibitionId,
      exhibitionTableArray
    );

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setCreateError(true);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 pt-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="max-w-180">
          {menuPermission?.status === "write" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-sm px-4">
                {exhibitionTableArray?.map((val, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center w-full h-[62px] gap-4 text-[#222222] px-5 bg-[#ECECEC] rounded-lg mb-8"
                    >
                      <div className="flex items-center gap-1 w-[300px] ">
                        <div className="px-1 w-[150px]">테이블 번호</div>
                        <div className="px-1 w-full">
                          <div className="relative z-20 w-39  ">
                            <input
                              type="number"
                              value={val?.tableNo}
                              className={`relative z-10 w-full appearance-none rounded-lg bg-white px-5 py-1.5 h-10 text-sm text-black outline-none transition focus:border-primary active:border-primary  `}
                              onChange={(e) =>
                                handleTableNumber(e.target.value, index)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 w-[300px] ">
                        <div className="px-1 w-[150px]">인원 수</div>
                        <div className="px-1 w-full">
                          <div className="relative z-20 w-39  ">
                            <div className="relative z-20 w-39  ">
                              <input
                                type="number"
                                value={val?.personCnt}
                                className={`relative z-10 w-full appearance-none rounded-lg bg-white px-5 py-1.5 h-10 text-sm text-black outline-none transition focus:border-primary active:border-primary  `}
                                onChange={(e) =>
                                  handlePersonCount(e.target.value, index)
                                }
                              />
                            </div>
                            <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-sm text-black dark:text-white">
                              <FaCaretDown />
                            </span>
                          </div>
                          {errors.title && (
                            <span className="font-medium text-red ">
                              입력해주세요
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full ">
                        <RiDeleteBinLine
                          className="text-xl cursor-pointer"
                          onClick={() => tableRemove(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 mt-5">
                <button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => handleTablePlus()}
                >
                  <BsPlusCircle />
                  테이블 추가
                </button>
              </div>
              <div className="flex w-full justify-end gap-4 px-4 text-center">
                <Link
                  href={`${url}`}
                  className="inline-flex w-26 items-center justify-center rounded-md border border-primary p-2 text-center font-medium text-primary hover:bg-opacity-90 "
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="flex w-26 justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
                >
                  저장
                </button>
              </div>
            </form>
          ) : (
            <div className=" text-3xl pt-10">Access Denied</div>
          )}
        </div>
      </div>
      <div className="my-5 text-right">
        {isOpen ? (
          <AlertModal>
            <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-xl text-green-600">
              <FaRegCheckCircle className="text-xl" />{" "}
              <div className="">저장되었습니다</div>
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={closeModal}
                className="rounded-md bg-black px-4 py-1 text-white"
              >
                확인
              </button>
            </div>
          </AlertModal>
        ) : (
          ""
        )}
        {createError ? (
          <AlertModal>
            <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-xl text-red">
              <LuAlertCircle className="text-xl" />{" "}
              <div className="">Not saved!!</div>
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={closeError}
                className="rounded-md bg-black px-4 py-1 text-white"
              >
                확인
              </button>
            </div>
          </AlertModal>
        ) : (
          ""
        )}
        {loading ? <Loader /> : ""}
      </div>
    </div>
  );
};

export default ExhibitionTable;