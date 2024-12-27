import { dataSavedAtom, detailOpenAtom, organizerDetailAtom } from "@/atom";
import { encrypt } from "@/helper/utility";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { SubmitHandler, useForm } from "react-hook-form";
import getToken from "@/helper/getToken";
import { updateExhibitionOrganizer } from "@/hooks/useUser";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";

import Loader from "../common/Loader";
interface FormData {
  companyName: string;
  username: string;
  firstName: string;
  pass: string;
  email: string;
  phone: string;
  img: string;
  status: string;
}

const ExhibitionOrganizerDetailModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(detailOpenAtom);

  const organizerDetail = useRecoilValue(organizerDetailAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [useStatus, setUseStatus] = useState("");

  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setDetailOpen(false);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const changeStatus = (val: string) => {
    setUseStatus(val);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const userToken = getToken();

    const formdata = new FormData();
    formdata.append("token", String(userToken));
    formdata.append("adminId", String(organizerDetail[0]?.adminId));
    if (data.pass) {
      const encryptedPass = encrypt(data.pass);
      formdata.append("password", String(encryptedPass));
    }
    formdata.append("firstName", data.firstName);

    formdata.append("companyName", data.companyName);
    formdata.append("email", data.email);
    formdata.append("phone", data.phone);
    formdata.append("status", useStatus);

    const res = await updateExhibitionOrganizer(String(userToken), formdata);

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setErrorMessage(String(res?.result));
      setCreateError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    setUseStatus(organizerDetail[0]?.status as string);
    setValue("status", organizerDetail[0]?.status as string);
  }, [organizerDetail]);
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[700px] flex-col text-[#111111]">
        {/* <button className="place-self-end text-xl text-white" onClick={onClose}>X</button> */}
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold">전지 주최사 등록</div>
              <div></div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setDetailOpen(false)}
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <div
                className={` mx-auto h-[650px] max-w-[524px] pt-10  text-left text-[16px]`}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">
                      회사 이름
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        {...register("companyName", {
                          required: true,
                        })}
                        defaultValue={organizerDetail[0]?.companyName}
                        className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.companyName && (
                        <span className="text-xs font-medium text-red">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">대표자명</div>
                    <div className="w-full">
                      <input
                        type="text"
                        {...register("firstName", {
                          required: true,
                        })}
                        defaultValue={organizerDetail[0]?.firstName}
                        className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.firstName && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">
                      대표 연락처
                    </div>
                    <div className="w-full">
                      <input
                        type="number"
                        {...register("phone", {
                          required: true,
                          minLength: 6,
                        })}
                        defaultValue={organizerDetail[0]?.phone}
                        className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.phone && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요 min length 6
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">
                      대표 이메일
                    </div>
                    <div className="w-full">
                      <input
                        type="email"
                        {...register("email", {
                          required: true,
                        })}
                        defaultValue={organizerDetail[0]?.email}
                        className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.email && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">아이디</div>
                    <div className="w-full">
                      <input
                        type="text"
                        {...register("username", {
                          required: true,
                        })}
                        defaultValue={organizerDetail[0]?.username}
                        className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.username && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">비밀번호</div>
                    <div className="w-full">
                      <input
                        type="password"
                        {...register("pass")}
                        autoComplete="new-password"
                        placeholder="**********"
                        className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.pass && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 pt-3">
                    <div className="">
                      <div className="flex items-center gap-8">
                        <div className="mr-18 text-[#666666]">상태</div>
                        <div className="flex gap-8">
                          <div>
                            <label
                              htmlFor="use"
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="relative">
                                <input
                                  type="radio"
                                  id="use"
                                  {...register("status", {
                                    required: true,
                                  })}
                                  value="use"
                                  className="sr-only"
                                  onChange={(e) => {
                                    changeStatus(e.target.value);
                                  }}
                                />
                                <div
                                  className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                    useStatus === "use"
                                      ? "border-[#002453]"
                                      : "border-[#DBDBDB]"
                                  }`}
                                >
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full  ${
                                      useStatus === "use"
                                        ? "!bg-[#002453]"
                                        : "!bg-[#DBDBDB]"
                                    }`}
                                  >
                                    {" "}
                                  </span>
                                </div>
                              </div>
                              활성
                            </label>
                          </div>
                          <div className="flex gap-5">
                            <label
                              htmlFor="notUse"
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="relative">
                                <input
                                  type="radio"
                                  {...register("status", {
                                    required: true,
                                  })}
                                  id="notUse"
                                  value="disabled"
                                  className="sr-only"
                                  onChange={(e) => {
                                    changeStatus(e.target.value);
                                  }}
                                />
                                <div
                                  className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                    useStatus === "disabled"
                                      ? "border-[#002453]"
                                      : "border-[#DBDBDB]"
                                  }`}
                                >
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${
                                      useStatus === "disabled"
                                        ? "!bg-[#002453]"
                                        : "!bg-[#DBDBDB]"
                                    }`}
                                  >
                                    {" "}
                                  </span>
                                </div>
                              </div>
                              비활성
                            </label>
                          </div>
                        </div>
                      </div>
                      {errors.status && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
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
      {loading ? <Loader /> : ""}
    </div>
  );
};

export default ExhibitionOrganizerDetailModal;
