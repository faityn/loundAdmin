import {
  ActiveRoleAtom,
  dataSavedAtom,
  detailOpenAtom,
  fileAtom,
  userDetailAtom,
  userDetailOptionsAtom,
} from "@/atom";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaCaretDown, FaRegCheckCircle } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import UsersExhibitionList from "./UsersExhibitionList";
import RateSummary from "./RateSummary";
import { SubmitHandler, useForm } from "react-hook-form";
import getToken from "@/helper/getToken";
import {
  checkUsername,
  updateUserInfo,
  updateUserProfile,
} from "@/hooks/useUser";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";
import { FaUserLarge } from "react-icons/fa6";
import Loader from "../common/Loader";
import UsersLecturesList from "./UsersLecturesList";
import UsersConferenceList from "./UsersConferenceList";
import StartDatePicker from "../common/StartDatePickerByModal";
import MessageActivity from "./MessageActivity";
interface FormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  birthday: string;
  status: string;
}

interface FormData2 {
  gender: string;
  roleId: number;
  professionId: number;
  companyName: string;
  position: string;
  img: string;
  description: string;
}

const DetailModal: React.FC = () => {
  const userRole = useRecoilValue(ActiveRoleAtom);
  const setDetailOpen = useSetRecoilState(detailOpenAtom);
  const userDetail = useRecoilValue(userDetailAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file1, setFile1] = useRecoilState(fileAtom);
  const userDetailOptions = useRecoilValue(userDetailOptionsAtom);
  const [birthDate, setBirthDate] = useState("");
  const [optionRole, setOptionRole] = useState("");
  const [optionProfession, setOptionProfession] = useState("");
  const [useStatus, setUseStatus] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const [gender, setGender] = useState("");
  const [activeButton, setActiveButton] = useState("1");
  const [contentValue, setContentValue] = useState("");
  const [checkError, setCheckError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const {
    register: register2,
    setValue,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm<FormData2>({
    mode: "onBlur",
  });

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setDetailOpen(false);
  };

  const closeError = () => {
    setCreateError(false);
    setCheckError(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDateChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setBirthDate(formattedDate);
  };

  const changeGender = (val: string) => {
    setGender(val);
  };

  const changeTab = (val: string) => {
    setActiveTab(val);
  };

  const changeStatus = (val: string) => {
    setUseStatus(val);
  };

  //const [value, setValue] = useState("");

  const handleRoleOption = (val: string) => {
    setOptionRole(val);
  };

  const handleProOption = (val: string) => {
    setOptionProfession(val);
  };
  const handleEditorChange = (newContent: string) => {
    setContentValue(newContent);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange1 = (e: any) => {
    const newFile = e.target.files[0];

    setFile1(newFile);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const userToken = getToken();
    const check = await checkUsername(
      String(userToken),
      Number(userDetail[0]?.userId),
      String(data.username)
    );
    if (check) {
      setErrorMessage(String(check));

      setLoading(false);
      setCheckError(true);
    } else {
      const formdata = {
        userId: userDetail[0]?.userId,
        username: data.username,
        name: data.name,
        email: data.email,
        phone: data.phone,
        birthday: birthDate,
        status: useStatus,
      };
      const res = await updateUserInfo(String(userToken), formdata);
      if (res?.status) {
        setIsOpen(true);
        setLoading(false);
      } else {
        setCreateError(true);
        setLoading(false);
      }
    }
  };

  const profileSubmit: SubmitHandler<FormData2> = async (data) => {
    setLoading(true);
    const userToken = getToken();
    const formdata = new FormData();
    formdata.append("token", String(userToken));
    formdata.append("userId", String(userDetail[0]?.userId));
    formdata.append("gender", gender);
    formdata.append("roleId", optionRole);
    formdata.append("professionId", optionProfession);
    formdata.append("companyName", data.companyName);
    formdata.append("position", data.position);
    formdata.append("description", contentValue);

    if (file1 !== null) {
      formdata.append("img", file1);
    }

    const res = await updateUserProfile(String(userToken), formdata);

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setCreateError(true);
      setLoading(false);
    }
  };

  const selectButton = (val: string) => {
    setActiveButton(val);
  };

  useEffect(() => {
    setOptionRole(String(userDetail[0]?.roleId));
    setOptionProfession(String(userDetail[0]?.professionId));
    setContentValue(userDetail[0]?.description);
    setGender(userDetail[0]?.gender as string);
    setUseStatus(userDetail[0]?.status as string);
    const birthday =
      userDetail[0]?.birthday !== null
        ? format(String(userDetail[0]?.birthday), "yyyy-MM-dd")
        : "";
    setBirthDate(birthday);

    setValue("professionId", Number(userDetail[0]?.professionId));
    setValue("roleId", Number(userDetail[0]?.roleId));
  }, [userDetail]);
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[800px] flex-col text-[#111111]">
        {/* <button className="place-self-end text-xl text-white" onClick={onClose}>X</button> */}
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold  ">회원 정보</div>
              <div>
                <div className="flex items-center gap-8">
                  <div>
                    <label
                      htmlFor="userInfo"
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="userInfo"
                          value={"info"}
                          className="sr-only"
                          onChange={(e) => {
                            changeTab(e.target.value);
                          }}
                        />
                        <div
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            activeTab === "info"
                              ? "border-[#002453]"
                              : "border-[#DBDBDB]"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-[#DBDBDB] ${
                              activeTab === "info" && "!bg-[#002453]"
                            }`}
                          >
                            {" "}
                          </span>
                        </div>
                      </div>
                      개인 정보
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="profile"
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="profile"
                          value={"profile"}
                          className="sr-only"
                          onChange={(e) => {
                            changeTab(e.target.value);
                          }}
                        />
                        <div
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            activeTab === "profile"
                              ? "border-[#002453]"
                              : "border-[#DBDBDB]"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-[#DBDBDB] ${
                              activeTab === "profile" && "!bg-[#002453]"
                            }`}
                          >
                            {" "}
                          </span>
                        </div>
                      </div>
                      프로필
                    </label>
                  </div>
                  <div className="flex gap-5">
                    <label
                      htmlFor="activity"
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="activity"
                          value={"activity"}
                          className="sr-only"
                          onChange={(e) => {
                            changeTab(e.target.value);
                          }}
                        />
                        <div
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            activeTab === "activity"
                              ? "border-[#002453]"
                              : "border-[#DBDBDB]"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-[#DBDBDB] ${
                              activeTab === "activity" && "!bg-[#002453]"
                            }`}
                          >
                            {" "}
                          </span>
                        </div>
                      </div>
                      활동 정보
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setDetailOpen(false)}
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <div
                className={`${
                  activeTab !== "info" ? "hidden" : ""
                } mx-auto h-[650px] max-w-[524px]  pt-10 text-left text-[16px] `}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">이름</div>
                    <div className="w-full">
                      <input
                        type="text"
                        {...register("name", {
                          required: true,
                        })}
                        defaultValue={userDetail[0]?.name}
                        className="w-full rounded-lg border-[1.5px] border-slate-300 bg-transparent px-4 py-2 h-[52px] text-[#111111] outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.name && (
                        <span className="font-medium text-red ">
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
                        defaultValue={userDetail[0]?.username}
                        className="w-full rounded-lg border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px]
                         text-[#111111] outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.username && (
                        <span className="font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">
                      비밀번호 입력
                    </div>
                    <div className="w-full">
                      <input
                        type="password"
                        defaultValue=""
                        placeholder="**********"
                        className="w-full rounded-lg border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-[#111111] outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">생년월일</div>
                    <div className="w-full">
                      <div className="relative w-full">
                        <StartDatePicker
                          label=""
                          onDateChange={startDateChange}
                          defaultDate={birthDate}
                        />

                        {errors.birthday && (
                          <span className="font-medium text-red ">
                            입력해주세요
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">이메일</div>
                    <div className="w-full">
                      <input
                        type="text"
                        {...register("email", {
                          required: true,
                        })}
                        defaultValue={userDetail[0]?.email}
                        className="w-full rounded-lg border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-[#111111] outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.email && (
                        <span className="font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">전화번호</div>
                    <div className="w-full">
                      <input
                        type="text"
                        {...register("phone", {
                          required: true,
                        })}
                        defaultValue={userDetail[0]?.phone}
                        className="w-full rounded-lg border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-[#111111] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.phone && (
                        <span className="font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 pt-5">
                    <div className="">
                      <div className="flex items-center gap-1">
                        <div className="min-w-[124px]">상태 </div>
                        <div className="flex w-full">
                          <div className="w-full">
                            <label
                              htmlFor="use"
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="use"
                                  value="use"
                                  className="sr-only"
                                  onChange={(e) => {
                                    changeStatus(e.target.value);
                                  }}
                                />
                                <div
                                  className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                    useStatus === "use" && "border-[#002453]"
                                  }`}
                                >
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                      useStatus === "use" && "!bg-[#002453]"
                                    }`}
                                  >
                                    {" "}
                                  </span>
                                </div>
                              </div>
                              활성
                            </label>
                          </div>
                          <div className="w-full last:flex gap-5">
                            <label
                              htmlFor="notUse"
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="notUse"
                                  value="disabled"
                                  className="sr-only"
                                  onChange={(e) => {
                                    changeStatus(e.target.value);
                                  }}
                                />
                                <div
                                  className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                    useStatus === "disabled" &&
                                    "border-[#002453]"
                                  }`}
                                >
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                      useStatus === "disabled" &&
                                      "!bg-[#002453]"
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
                    </div>
                  </div>

                  <div
                    className={`flex justify-center gap-4 pt-5 ${
                      userRole === "Super Admin" ? "" : "hidden"
                    }`}
                  >
                    {" "}
                    <button
                      type="button"
                      className="inline-flex w-[114px] items-center justify-center rounded-3xl bg-[#C6C6C6] px-5 py-1.5 h-[44px] text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                      onClick={() => setDetailOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="inline-flex w-[116px] items-center justify-center rounded-3xl bg-[#002453] px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                    >
                      수정 확인
                    </button>
                  </div>
                </form>
              </div>
              <div
                className={`${
                  activeTab !== "profile" ? "hidden" : ""
                } mx-auto h-[650px] max-w-[524px] pt-10 text-left text-[16px]`}
              >
                <form onSubmit={handleSubmit2(profileSubmit)}>
                  <div className="grid grid-cols-12">
                    <div className="col-span-12">
                      <div className="flex w-full items-center text-[16px]">
                        <div className="w-30 ">
                          <div className="h-20 w-20 rounded-full  bg-slate-400">
                            <label htmlFor="doc">
                              <div className="flex h-full items-center justify-center ">
                                {userDetail[0]?.imgUrl !== null ? (
                                  <img
                                    src={`${userDetail[0]?.imgUrl}`}
                                    contextMenu="false"
                                    alt={userDetail[0]?.name}
                                    className="max-h-20 max-w-20 rounded-full "
                                  />
                                ) : (
                                  <FaUserLarge className="text-[40px] text-white" />
                                )}
                              </div>
                              <input
                                type="file"
                                id="doc"
                                onChange={handleFileChange1}
                                name="doc"
                                hidden
                              />
                            </label>
                          </div>
                        </div>
                        <div className=" ">
                          <div className="mb-2 font-semibold text-black">
                            {userDetail[0]?.name}
                          </div>
                          <div className="flex items-center gap-5">
                            <div className="mr-4">성별</div>
                            {userDetailOptions?.gender?.map((e, i) => (
                              <div key={`g${i}`}>
                                <label
                                  htmlFor={`g${e?.value}`}
                                  className="flex cursor-pointer select-none items-center"
                                >
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      id={`g${e?.value}`}
                                      value={e?.value}
                                      className="sr-only"
                                      onChange={(e) => {
                                        changeGender(e.target.value);
                                      }}
                                    />
                                    <div
                                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                        gender === e?.value
                                          ? "border-[#002453]"
                                          : "border-[#DBDBDB]"
                                      }`}
                                    >
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full bg-[#DBDBDB] ${
                                          gender === e?.value && "!bg-[#002453]"
                                        }`}
                                      >
                                        {" "}
                                      </span>
                                    </div>
                                  </div>
                                  {e?.text}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 text-[16px]">
                        <div className="mb-5 flex gap-1 items-center">
                          <div className="min-w-[124px] text-[#666666]">
                            역할
                          </div>
                          <div className="w-full">
                            <div className="relative z-20 w-full bg-transparent  ">
                              <select
                                value={optionRole}
                                {...register2("roleId")}
                                onChange={(e) =>
                                  handleRoleOption(String(e.target.value))
                                }
                                className={`text-md relative z-10 w-full appearance-none rounded-xl border border-slate-300 bg-transparent px-5 py-1.5 h-[52px] text-[16px] text-black outline-none transition focus:border-slate-400 active:border-slate-400    `}
                              >
                                <option value="" className="text-[#666666] ">
                                  역할을 선택하세요.
                                </option>
                                {userDetailOptions?.role?.map((e, i) => (
                                  <option
                                    key={i}
                                    value={e?.roleId}
                                    className="text-[#666666] "
                                  >
                                    {e?.role_name}
                                  </option>
                                ))}
                              </select>

                              <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-black ">
                                <FaCaretDown />
                              </span>
                            </div>
                            {optionRole === "" && (
                              <span className="font-medium text-red ">
                                입력해주세요
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5 flex gap-1 items-center">
                          <div className="min-w-[124px] text-[#666666]">
                            직업{" "}
                          </div>
                          <div className="w-full">
                            <div className="relative z-20 w-full bg-transparent ">
                              <select
                                {...register2("professionId", {
                                  required: true,
                                })}
                                value={optionProfession}
                                onChange={(e) =>
                                  handleProOption(e.target.value)
                                }
                                className={`text-md relative z-10 w-full appearance-none rounded-xl border border-slate-300 \ px-5 py-1.5 h-[52px] text-[16px] text-black outline-none transition focus:border-slate-400 active:border-slate-400  `}
                              >
                                <option value="" className="text-[#666666] ">
                                  직업을 선택하세요.
                                </option>
                                {userDetailOptions?.profession?.map((e, i) => (
                                  <option
                                    key={i}
                                    value={String(e?.professionId)}
                                    className="text-[#666666] "
                                  >
                                    {e?.title}
                                  </option>
                                ))}
                              </select>

                              <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-black ">
                                <FaCaretDown />
                              </span>
                            </div>
                            {optionProfession === "" && (
                              <span className="font-medium text-red ">
                                입력해주세요
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5 flex gap-1 items-center">
                          <div className="min-w-[124px] text-[#666666]">
                            회사이름
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              {...register2("companyName", {
                                required: true,
                              })}
                              defaultValue={userDetail[0]?.companyName}
                              className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-2 h-[52px] text-[16px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                            />
                            {errors2.companyName && (
                              <span className="font-medium text-red ">
                                입력해주세요
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5 flex gap-1 items-center">
                          <div className="min-w-[124px] text-[#666666]">
                            직함
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              {...register2("position")}
                              defaultValue={userDetail[0]?.position}
                              className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-2 h-[52px] text-[16px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                            />
                            {errors2.position && (
                              <span className="font-medium text-red ">
                                입력해주세요
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5 flex gap-1 items-center">
                          <div className="min-w-[124px] text-[#666666]">
                            자기 소개
                          </div>
                          <div className="w-full">
                            <textarea
                              defaultValue={contentValue}
                              onChange={(e) =>
                                handleEditorChange(e.target.value)
                              }
                              className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-2 h-[150px] text-[16px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex justify-center gap-4 pt-5 ${
                      userRole === "Super Admin" ? "" : "hidden"
                    }`}
                  >
                    {" "}
                    <button
                      type="button"
                      className="inline-flex w-[116px] items-center justify-center rounded-3xl bg-[#C6C6C6] px-5 py-2 h-[44px] text-center text-[16px] font-medium text-white hover:bg-opacity-90 "
                      onClick={() => setDetailOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="inline-flex w-[116px] items-center justify-center rounded-3xl bg-[#002453] px-5 py-2 h-[44px] text-center text-[16px] font-medium text-white hover:bg-opacity-90 "
                    >
                      수정 확인
                    </button>
                  </div>
                </form>
              </div>

              <div
                className={`${
                  activeTab !== "activity" ? "hidden" : ""
                } mx-auto h-[650px]   pt-10 text-left`}
              >
                <div className="grid h-full grid-cols-12 gap-5">
                  <div className="col-span-6">
                    <div className="flex w-full items-center ">
                      <div className="w-25 ">
                        <div className="h-20 w-20 rounded-full  bg-slate-400">
                          <div className="flex h-full items-center justify-center ">
                            {userDetail[0]?.imgUrl !== null ? (
                              <img
                                src={`${userDetail[0]?.imgUrl}`}
                                contextMenu="false"
                                alt={userDetail[0]?.name}
                                className="max-h-20 max-w-20 rounded-full "
                              />
                            ) : (
                              <FaUserLarge className="text-[40px] text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-[16px] ">
                        <div className="mb-2 font-semibold text-black">
                          {userDetail[0]?.name}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="mr-4">성별</div>
                          {userDetailOptions?.gender?.map((e, i) => (
                            <div key={`d${i}`}>
                              <label
                                htmlFor={`d${e?.value}`}
                                className="flex cursor-pointer select-none items-center"
                              >
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    id={`d${e?.value}`}
                                    value={e?.value}
                                    className="sr-only"
                                    readOnly
                                  />
                                  <div
                                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                      gender === e?.value
                                        ? "border-[#002453]"
                                        : "border-[#DBDBDB]"
                                    }`}
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full bg-[#DBDBDB] ${
                                        gender === e?.value && "!bg-[#002453]"
                                      }`}
                                    >
                                      {" "}
                                    </span>
                                  </div>
                                </div>
                                {e?.text}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-7">
                      <div className="flex flex-col gap-5">
                        <button
                          type="button"
                          className={`flex w-full items-center justify-center gap-4 rounded-[30px] border border-slate-300  px-5 py-1 h-[60px] hover:bg-[#002453] hover:text-white ${
                            activeButton === "1"
                              ? "bg-[#002453] text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("1")}
                        >
                          <div className="font-semibold">참가한 행사 정보</div>
                        </button>
                        <button
                          type="button"
                          className={`flex w-full items-center justify-center gap-4 rounded-[30px] border border-slate-300  px-5 py-1 h-[60px]  hover:bg-[#002453] hover:text-white ${
                            activeButton === "2"
                              ? "bg-[#002453] text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("2")}
                        >
                          <div className="font-semibold">참여한 강연 정보</div>
                        </button>
                        <button
                          type="button"
                          className={`flex w-full items-center justify-center gap-4 rounded-[30px] border border-slate-300  px-5 py-1  h-[60px] hover:bg-[#002453] hover:text-white ${
                            activeButton === "3"
                              ? "bg-[#002453] text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("3")}
                        >
                          <div className="font-semibold">활동한 회의 정보</div>
                        </button>
                        <button
                          type="button"
                          className={`flex w-full items-center justify-center gap-4 rounded-[30px] border border-slate-300  px-5 py-1  h-[60px] hover:bg-[#002453] hover:text-white ${
                            activeButton === "5"
                              ? "bg-[#002453] text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("5")}
                        >
                          <div className="font-semibold">메시지 활동 요약</div>
                        </button>
                        <button
                          type="button"
                          className={`flex w-full items-center justify-center gap-4 rounded-[30px] border border-slate-300  px-5 py-1 h-[60px] hover:bg-[#002453] hover:text-white ${
                            activeButton === "4"
                              ? "bg-[#002453] text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("4")}
                        >
                          <div className="font-semibold">평가 활동 요약</div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6  text-black">
                    {activeButton === "1" ? (
                      <UsersExhibitionList
                        userId={Number(userDetail[0]?.userId)}
                      />
                    ) : activeButton === "2" ? (
                      <UsersLecturesList
                        userId={Number(userDetail[0]?.userId)}
                      />
                    ) : activeButton === "3" ? (
                      <UsersConferenceList
                        userId={Number(userDetail[0]?.userId)}
                      />
                    ) : activeButton === "4" ? (
                      <RateSummary userId={Number(userDetail[0]?.userId)} />
                    ) : (
                      <MessageActivity userId={Number(userDetail[0]?.userId)} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {checkError ? (
        <AlertModal>
          <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-xl text-red">
            <LuAlertCircle className="text-xl" />{" "}
            <div className="">{errorMessage}</div>
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

export default DetailModal;
