"use client";
import {
  conferenceOptionAtom,
  conferencesDetailAtom,
  endDateAtom,
  menuPermissionAtom,
  startDateAtom,
} from "@/atom";
import getToken from "@/helper/getToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";
import NotFound from "../common/NotFound";
import {
  getConferenceDetail,
  getConferencesOptions,
  updateConferenceStatus,
} from "@/hooks/useEvents";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
interface Props {
  id: number;
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
const ConferenceUpdate = ({ id, url }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [itemsDetail, setItemsDetail] = useRecoilState(conferencesDetailAtom);
  const [contentValue, setContentValue] = useState("");
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const [optionsList, setOptionsList] = useRecoilState(conferenceOptionAtom);

  const [optionValue, setOptionValue] = useState("");
  const menuPermission = useRecoilValue(menuPermissionAtom);

  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
    getOptions();
  }, []);

  const getOptions = async () => {
    const userToken = getToken();
    const response = await getConferencesOptions(String(userToken));
    setOptionsList(response?.result?.request);
  };
  const getData = async () => {
    const userToken = getToken();
    const response = await getConferenceDetail(String(userToken), id);

    if (response?.status) {
      setStartDate(
        formatInTimeZone(
          parseISO(response?.result?.startDate),
          "UTC",
          "yyyy-MM-dd HH:mm"
        )
      );
      setEndDate(
        formatInTimeZone(
          parseISO(response?.result?.endDate),
          "UTC",
          "yyyy-MM-dd HH:mm"
        )
      );
      setContentValue(response?.result?.description);

      setOptionValue(response?.result?.request);
      setItemsDetail([response?.result]);
    } else {
      setNotFound(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push(`${url}`);
  };

  const closeError = () => {
    setCreateError(false);
  };
  const handleOption = (val: string) => {
    setOptionValue(val);
  };
  const onSubmit: SubmitHandler<FormData> = async () => {
    setLoading(true);
    const token = getToken();

    const res = await updateConferenceStatus(
      String(token),
      String(id),
      optionValue
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
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {notFound && <NotFound />}
        {itemsDetail?.length > 0 &&
          itemsDetail?.map((item, index) => (
            <div key={index} className="max-w-203">
              {menuPermission?.status === "write" ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <table className=" w-full table-auto text-sm">
                    <tbody>
                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            제목
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <input
                            type="text"
                            readOnly
                            defaultValue={item?.title}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            회의 개최자
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <input
                            type="text"
                            readOnly
                            defaultValue={item?.user?.name}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            행사명
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <input
                            type="text"
                            readOnly
                            defaultValue={item?.exhibition?.title}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            회의 참가자
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <input
                            type="text"
                            readOnly
                            defaultValue={item?.personCnt}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            회의 날짜
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <div className="flex max-sm:flex-col w-full gap-4 ">
                            <div className="relative w-full">
                              <div className="font-medium text-black dark:text-white">
                                시작
                              </div>
                              <div className="relative flex w-full h-[40px] z-20  appearance-none rounded border border-stroke bg-transparent px-1 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white">
                                <input
                                  {...register("startDate")}
                                  type="text"
                                  className="w-full h-full rounded  outline-none bg-transparent focus:border-primary active:border-primary font-normal transition pl-4 pr-9"
                                  placeholder="선택 Date"
                                  value={startDate}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="relative w-full">
                              <div className="font-medium text-black dark:text-white">
                                끝
                              </div>
                              <div className="relative flex w-full h-[40px] z-20  appearance-none rounded border border-stroke bg-transparent px-1 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white">
                                <input
                                  {...register("endDate")}
                                  type="text"
                                  className="w-full h-full rounded  outline-none bg-transparent focus:border-primary active:border-primary font-normal transition pl-4 pr-9"
                                  placeholder="선택 Date"
                                  value={endDate}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            이미지
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          Current image
                          <div className="mb-4">
                            {item?.img && (
                              <img
                                src={`${item?.imgUrl}`}
                                contextMenu="false"
                                alt={item?.title}
                                className="max-w-[500px] max-h-[200px]  "
                              />
                            )}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            내용
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <div className="bg-white rounded-xl p-5">
                            <div
                              dangerouslySetInnerHTML={{ __html: contentValue }}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            상태
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <div className="relative z-20 bg-transparent dark:bg-form-input w-full">
                            <select
                              value={optionValue}
                              onChange={(e) => handleOption(e.target.value)}
                              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                            >
                              <option
                                value={"0"}
                                className="text-black dark:text-bodydark"
                              >
                                선택
                              </option>
                              {optionsList?.map((e, i) => (
                                <option
                                  key={i}
                                  value={String(e?.value)}
                                  className="text-black dark:text-bodydark"
                                >
                                  {e?.text}
                                </option>
                              ))}
                            </select>

                            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-black dark:text-white">
                              <FaChevronDown />
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex w-full justify-end gap-4 px-4 text-center">
                    <Link
                      href={`${url}`}
                      className="inline-flex w-26 items-center justify-center rounded-md border border-primary p-2 text-center font-medium text-primary hover:bg-opacity-90 "
                    >
                      취소
                    </Link>
                    <button
                      type="submit"
                      className="flex w-30 justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
                    >
                      저장
                    </button>
                  </div>
                </form>
              ) : (
                <div className=" text-3xl pt-10">Access Denied</div>
              )}
            </div>
          ))}
      </div>
      {isOpen ? (
        <AlertModal>
          <div className="flex items-center justify-center gap-2 mb-3 mt-2 text-xl text-green-600">
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
          <div className="flex items-center justify-center gap-2 mb-3 mt-2 text-xl text-red">
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
      <div className="my-5 text-right">{loading ? <Loader /> : ""}</div>
    </div>
  );
};

export default ConferenceUpdate;
