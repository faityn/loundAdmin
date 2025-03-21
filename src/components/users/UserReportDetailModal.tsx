import {
  dataSavedAtom,
  detailOpenAtom,
  endDateAtom,
  startDateAtom,
  userReportDetailAtom,
} from "@/atom";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import AlertModal from "../Modal/AlertModal";

import getToken from "@/helper/getToken";
import Loader from "../common/Loader";
import { SubmitHandler, useForm } from "react-hook-form";
import StartDatePicker from "../common/StartDatePicker";
import EndDatePicker from "../common/EndDatePicker";
import { format } from "date-fns";
import { userReportUpdate } from "@/hooks/useData";
import { LuAlertCircle } from "react-icons/lu";

interface FormData {
  startDate: string;
  status: string;
  endDate: string;
  description: string;
}
const UserReportDetailModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(detailOpenAtom);
  const [optionStatus, setOptionStatus] = useState("");
  const userReportDetail = useRecoilValue(userReportDetailAtom);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const [errorMessage, setErrorMessage] = useState("");
  const [createError, setCreateError] = useState(false);

  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const closeError = () => {
    setCreateError(false);
  };

  const handleStatusOption = (val: string) => {
    setOptionStatus(val);
  };

  const startDateChange = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setStartDate(formattedDate);
  };

  const endDateChange = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setEndDate(formattedDate);
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    setLoading(true);
    const userToken = getToken();
    const id = userReportDetail?.id;
    if (optionStatus !== "block") {
      setStartDate("");
      setEndDate("");
    }
    const post = {
      status: optionStatus,
      start: startDate,
      end: endDate,
    };
    const res = await userReportUpdate(String(userToken), Number(id), post);

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setErrorMessage(String(res?.result));
      setCreateError(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setDetailOpen(false);
  };

  useEffect(() => {
    const status = String(userReportDetail?.request);
    const startDate = userReportDetail?.startDate
      ? format(String(userReportDetail?.startDate), "yyyy-MM-dd")
      : "";
    const endDate = userReportDetail?.endDate
      ? format(String(userReportDetail?.endDate), "yyyy-MM-dd")
      : "";
    setValue("status", status);
    setOptionStatus(status);
    setStartDate(startDate);
    setEndDate(endDate);
  }, [userReportDetail]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[700px] flex-col text-[#111111]">
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold"></div>
              <div className="font-bold">신고 내용 확인</div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setDetailOpen(false)}
                />
              </div>

              {createError ? (
                <AlertModal>
                  <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-xl text-red">
                    <LuAlertCircle className="text-xl" />{" "}
                    <div className="">Not saved!!</div>
                  </div>
                  <div className="mb-4">{errorMessage}</div>
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
            <div className="">
              <div className={` mx-auto h-[600px]   pt-5 text-left text-sm`}>
                <div className="px-20">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5 flex gap-1 items-center">
                      <div className="min-w-[124px] text-[#666666]">신고자</div>
                      <div className="w-full">
                        <input
                          type="text"
                          defaultValue={userReportDetail?.blocked?.name}
                          disabled={true}
                          className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                        />
                      </div>
                    </div>
                    <div className="mb-5 flex gap-1 items-center">
                      <div className="min-w-[124px] text-[#666666]">
                        신고 당한 자
                      </div>
                      <div className="w-full">
                        <input
                          type="text"
                          defaultValue={userReportDetail?.blocker?.name}
                          disabled={true}
                          className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                        />
                      </div>
                    </div>
                    <div className="mb-5 flex gap-1 items-center">
                      <div className="min-w-[124px] text-[#666666]">
                        신고 처리하기
                      </div>
                      <div className="w-full">
                        <div className="w-full relative z-20 bg-transparent dark:bg-form-input ">
                          <select
                            {...register("status", {
                              required: true,
                            })}
                            value={optionStatus}
                            onChange={(e) => handleStatusOption(e.target.value)}
                            className={`relative z-10 text-md w-full appearance-none rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter`}
                          >
                            <option value="" className="text-black ">
                              선택
                            </option>

                            <option
                              value={`report`}
                              className="text-black dark:text-white"
                            >
                              대기
                            </option>
                            <option
                              value={`reject`}
                              className="text-black dark:text-white"
                            >
                              신고 취소
                            </option>
                            <option
                              value={`block`}
                              className="text-black dark:text-white"
                            >
                              계정 일시 정지
                            </option>
                            <option
                              value={`kick`}
                              className="text-black dark:text-white"
                            >
                              영구 차단
                            </option>
                          </select>

                          <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-black dark:text-white">
                            <FaChevronDown />
                          </span>
                        </div>
                        {errors.status && (
                          <span className="text-xs font-medium text-red">
                            입력해주세요
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`mb-5 flex gap-1 items-center ${
                        optionStatus === "block" ? "" : "hidden"
                      } `}
                    >
                      <div className="min-w-[124px] text-[#666666]">
                        정지 기간
                      </div>
                      <div className="w-full">
                        <div className="flex w-full gap-4 max-sm:flex-col ">
                          <div className="relative w-full">
                            <StartDatePicker
                              label="시작일"
                              onDateChange={startDateChange}
                              defaultDate={startDate}
                            />
                          </div>
                          <div className="relative w-full">
                            <EndDatePicker
                              label="종료일"
                              onDateChange={endDateChange}
                              defaultDate={endDate}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 pt-5">
                      {" "}
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-[114px] h-[44px] rounded-3xl bg-[#C6C6C6] px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                        onClick={() => setDetailOpen(false)}
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-[116px] rounded-3xl bg-[#002453] px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                      >
                        수정 확인
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default UserReportDetailModal;
