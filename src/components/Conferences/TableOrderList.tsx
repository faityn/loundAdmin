"use client";

import getToken from "@/helper/getToken";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import {
  getExhibitionTable,
  getExhibitionTableOrder,
  saveExhibitionTable,
} from "@/hooks/useData";
import AlertModal from "../Modal/AlertModal";
import { FaCaretDown, FaChevronDown, FaRegCheckCircle } from "react-icons/fa";
import { LuAlertCircle } from "react-icons/lu";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  detailOpenAtom,
  exhibitionAllAtom,
  menuPermissionAtom,
  tableNumberAtom,
  tableOrderDetailAtom,
  userExhibitionTablesAtom,
} from "@/atom";

import { getExhibitionAll } from "@/hooks/useEvents";
import TableOrderDetailModal from "./TableOrderDetailModal";
interface Props {
  url?: string;
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

const TableOrderList = ({ url }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [detailOpen, setDetailOpen] = useRecoilState(detailOpenAtom);
  const menuPermission = useRecoilValue(menuPermissionAtom);
  const [exhibitionTableArray, setExhibitionTableArray] = useRecoilState(
    userExhibitionTablesAtom
  );
  const [exhibitionAllList, setExhibitionAllList] = useRecoilState(
    exhibitionAllAtom
  );
  const setTableOrderDetail = useSetRecoilState(tableOrderDetailAtom);
  const setTableNumber = useSetRecoilState(tableNumberAtom);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getData = async () => {
    const userToken = getToken();

    const response = await getExhibitionAll(String(userToken));

    setExhibitionAllList(response?.rows);
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);

  const selectExhibition = async (val: string) => {
    const userToken = getToken();

    const response = await getExhibitionTable(String(userToken), Number(val));

    setExhibitionTableArray(response?.result);
  };

  const tableOrderDetail = async (val: number, tableNo: number) => {
    const userToken = getToken();

    const response = await getExhibitionTableOrder(
      String(userToken),
      Number(val)
    );

    setTableOrderDetail(response?.result);
    setTableNumber(tableNo);

    setDetailOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push(`${url}`);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    setLoading(true);
    const token = getToken();
    const exhibitionId = 0;

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
  useEffect(() => {}, [exhibitionTableArray]);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="max-w-180">
          <div className="flex items-center gap-2 w-full px-4 mb-6">
            <div className="w-[150px]">행사 선택</div>
            <div className="relative z-20 bg-transparent dark:bg-form-input w-full">
              <select
                onChange={(e) => selectExhibition(e.target.value)}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-bodydark`}
              >
                <option value="" className="text-black dark:text-white">
                  선택
                </option>
                {exhibitionAllList?.map((item, index) => (
                  <option
                    key={index}
                    value={item?.exhibitionId}
                    className="text-black dark:text-white"
                  >
                    {item?.title}
                  </option>
                ))}
              </select>

              <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-black">
                <FaChevronDown />
              </span>
            </div>
          </div>
          {menuPermission?.status === "write" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-sm px-4">
                {exhibitionTableArray
                  ?.filter((val) => val.tableAction !== "delete")
                  .map((val, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center w-full h-[62px] gap-6 text-[#222222] px-5 bg-[#ECECEC] rounded-lg mb-8"
                      >
                        <div className="flex items-center gap-1 min-w-[200px] ">
                          <div className="px-1 min-w-[100px]">테이블 번호</div>
                          <div className="px-1 ">
                            <div className="relative z-20 w-full  ">
                              <input
                                type="number"
                                value={val?.tableNo}
                                className={`relative z-10 w-full appearance-none rounded-lg bg-white px-5 py-1.5 h-10 text-sm text-black outline-none transition focus:border-primary active:border-primary  `}
                                disabled={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 min-w-[200px] ">
                          <div className="px-1 w-[150px]">인원 수</div>
                          <div className="px-1 w-full">
                            <div className="relative z-20 w-39  ">
                              <div className="relative z-20 w-39  ">
                                <input
                                  type="number"
                                  value={val?.personCnt}
                                  className={`relative z-10 w-full appearance-none rounded-lg bg-white px-5 py-1.5 h-10 text-sm text-black outline-none transition focus:border-primary active:border-primary `}
                                  disabled={true}
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
                        <div
                          className=" relative min-w-[80px] flex items-center justify-center cursor-pointer"
                          onClick={() =>
                            tableOrderDetail(
                              Number(val.tableId),
                              Number(val?.tableNo)
                            )
                          }
                        >
                          <img
                            src={`/images/icon/tablaordercount.png`}
                            contextMenu="false"
                            className="min-w-[30px] min-h-[30px]  "
                          />

                          <div className="absolute flex  w-full items-center justify-center  mt-1 text-[11px] font-semibold text-slate-700">
                            {val?.exhibitionConferenceTable?.length}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="px-4 mt-5"></div>
              <div className="flex w-full justify-end gap-4 px-4 text-center"></div>
            </form>
          ) : (
            <div className=" text-3xl pt-10">Access Denied</div>
          )}
        </div>
      </div>
      <div className="my-5 text-right">
        {detailOpen ? <TableOrderDetailModal /> : ""}
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

export default TableOrderList;
