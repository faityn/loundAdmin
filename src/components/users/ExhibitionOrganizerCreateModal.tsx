import { createExOrganizerOpenAtom, dataSavedAtom } from "@/atom";
import { encrypt } from "@/helper/utility";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

import { SubmitHandler, useForm } from "react-hook-form";
import getToken from "@/helper/getToken";
import { createExhibitionOrganizer } from "@/hooks/useUser";
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

const ExhibitionOrganizerCreateModal: React.FC = () => {
  const setCreateOpen = useSetRecoilState(createExOrganizerOpenAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [useStatus, setUseStatus] = useState("");

  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setCreateOpen(false);
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

    const encryptedPass = encrypt(data.pass);
    const formdata = new FormData();
    formdata.append("token", String(userToken));

    formdata.append("username", data.username);
    formdata.append("password", String(encryptedPass));
    formdata.append("firstName", data.firstName);

    formdata.append("companyName", data.companyName);
    formdata.append("email", data.email);
    formdata.append("phone", data.phone);
    formdata.append("status", useStatus);

    const res = await createExhibitionOrganizer(String(userToken), formdata);

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setErrorMessage(String(res?.result));
      setCreateError(true);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[600px] flex-col ">
        {/* <button className="place-self-end text-xl text-white" onClick={onClose}>X</button> */}
        <div className=" rounded-lg border border-slate-600 bg-white  p-5 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between border-b pb-3">
              <div className="">전지 주최사 등록</div>
              <div></div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setCreateOpen(false)}
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <div
                className={` mx-auto h-[650px] max-w-[350px]  pt-5 text-left text-sm`}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <div>회사 이름</div>
                    <div>
                      <input
                        type="text"
                        {...register("companyName", {
                          required: true,
                        })}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.companyName && (
                        <span className="text-xs font-medium text-red">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div>대표자명</div>
                    <div>
                      <input
                        type="text"
                        {...register("firstName", {
                          required: true,
                        })}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.firstName && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div>대표 연락처</div>
                    <div>
                      <input
                        type="number"
                        {...register("phone", {
                          required: true,
                          minLength: 6,
                        })}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.phone && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요 min length 6
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div>대표 이메일</div>
                    <div>
                      <input
                        type="email"
                        {...register("email", {
                          required: true,
                        })}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.email && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>아이디</div>
                    <div>
                      <input
                        type="text"
                        {...register("username", {
                          required: true,
                        })}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.username && (
                        <span className="text-xs font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div>비밀번호</div>
                    <div>
                      <input
                        type="password"
                        {...register("pass", {
                          required: true,
                        })}
                        autoComplete="new-password"
                        placeholder="**********"
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
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
                        <div className="mr-6">상태</div>
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
                                className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                  useStatus === "use" && "border-primary"
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                    useStatus === "use" && "!bg-primary"
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
                                className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                  useStatus === "disabled" && "border-primary"
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                    useStatus === "disabled" && "!bg-primary"
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
                      className="inline-flex items-center justify-center rounded-md bg-slate-300 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                      onClick={() => setCreateOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
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

export default ExhibitionOrganizerCreateModal;
