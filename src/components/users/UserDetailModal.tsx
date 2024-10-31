import {
  checkedInterestAtom,
  checkedPurposesAtom,
  dataSavedAtom,
  detailOpenAtom,
  fileAtom,
  userDetailAtom,
  userDetailOptionsAtom,
} from "@/atom";
import { datePickerOption1, Interests, Purposes } from "@/helper/utility";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { RiCloseFill } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Datepicker from "tailwind-datepicker-react";
import TextEditor from "../Editor/TextEditor";
import { PiUserList, PiUserSwitch, PiUsersThreeLight } from "react-icons/pi";
import UsersExhibitionList from "./UsersExhibitionList";
import RateSummary from "./RateSummary";
import { SubmitHandler, useForm } from "react-hook-form";
import getToken from "@/helper/getToken";
import { updateUserInfo, updateUserProfile } from "@/hooks/useUser";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";
import { FaUserLarge } from "react-icons/fa6";
import Loader from "../common/Loader";
import UsersLecturesList from "./UsersLecturesList";
import UsersConferenceList from "./UsersConferenceList";
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
  const setDetailOpen = useSetRecoilState(detailOpenAtom);
  const userDetail = useRecoilValue(userDetailAtom);
  const [show, setShow] = useState(false);
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
  const options = datePickerOption1(birthDate);
  const [contentValue, setContentValue] = useState("");
  const [checkedInterest, setChechedInterest] = useRecoilState(
    checkedInterestAtom
  );

  const [checkedPurposes, setChechedPurposes] = useRecoilState(
    checkedPurposesAtom
  );
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
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDateChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setBirthDate(formattedDate);
  };
  const handleStartClose = (state: boolean) => {
    setShow(state);
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

  const handleRoleOption = (val: string) => {
    setOptionRole(val);
  };

  const handleProOption = (val: string) => {
    setOptionProfession(val);
  };
  const handleEditorChange = (newContent: string) => {
    setContentValue(newContent);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setChechedInterest((prevChecked) =>
      e.target.checked
        ? [...prevChecked, id]
        : prevChecked.filter((item: string) => item !== id)
    );
  };

  const handleCheck2 = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setChechedPurposes((prevChecked) =>
      e.target.checked
        ? [...prevChecked, id]
        : prevChecked.filter((item: string) => item !== id)
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange1 = (e: any) => {
    const newFile = e.target.files[0];

    setFile1(newFile);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const userToken = getToken();

    const formdata = {
      userId: userDetail[0]?.userId,
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

  const InterestsList = Interests();

  const PurposesList = Purposes();

  useEffect(() => {
    setOptionRole(String(userDetail[0]?.roleId));
    setOptionProfession(String(userDetail[0]?.professionId));
    setContentValue(userDetail[0]?.description);
    setGender(userDetail[0]?.gender as string);
    setUseStatus(userDetail[0]?.status as string);
    setBirthDate(format(String(userDetail[0]?.birthday), "yyyy-MM-dd"));
    setChechedInterest([]);
    setChechedPurposes([]);
    setValue("professionId", Number(userDetail[0]?.professionId));
    setValue("roleId", Number(userDetail[0]?.roleId));
  }, [userDetail]);
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[800px] flex-col ">
        {/* <button className="place-self-end text-xl text-white" onClick={onClose}>X</button> */}
        <div className=" rounded-lg border border-black bg-white  p-5 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between border-b pb-3">
              <div className="">회원 정보</div>
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
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                            activeTab === "info" && "border-primary"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                              activeTab === "info" && "!bg-primary"
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
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                            activeTab === "profile" && "border-primary"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                              activeTab === "profile" && "!bg-primary"
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
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                            activeTab === "activity" && "border-primary"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                              activeTab === "activity" && "!bg-primary"
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
                } mx-auto h-[650px] max-w-[400px]  pt-5 text-left text-sm`}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                    <div>이름/Name</div>
                    <div>
                      <input
                        type="text"
                        {...register("name", {
                          required: true,
                        })}
                        defaultValue={userDetail[0]?.name}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.name && (
                        <span className="font-medium text-red ">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div>아이디/ID</div>
                    <div>
                      <input
                        type="text"
                        {...register("username", {
                          required: true,
                        })}
                        defaultValue={userDetail[0]?.username}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.username && (
                        <span className="font-medium text-red ">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div>비밀번호 입력/Password</div>
                    <div>
                      <input
                        type="password"
                        defaultValue=""
                        placeholder="**********"
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <div>생년월일</div>
                    <div>
                      <div className="relative w-full">
                        <Datepicker
                          options={options}
                          onChange={startDateChange}
                          show={show}
                          setShow={handleStartClose}
                        >
                          <div className="relative z-20 flex h-[40px] w-full  appearance-none rounded border border-slate-300 bg-transparent px-1 py-1.5 text-black outline-none transition focus:border-primary active:border-primary  ">
                            <div className="pointer-events-none absolute inset-0 left-auto right-3 flex items-center">
                              <HiOutlineCalendarDays className="text-xl" />
                            </div>
                            <input
                              type="text"
                              {...register("birthday")}
                              className="h-full w-full rounded  bg-transparent pl-4 pr-9 font-normal outline-none transition focus:border-primary active:border-primary"
                              placeholder="Select Date"
                              defaultValue={birthDate}
                              onFocus={() => setShow(true)}
                              readOnly
                            />
                          </div>
                        </Datepicker>
                        {errors.birthday && (
                          <span className="font-medium text-red ">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div>이메일</div>
                    <div>
                      <input
                        type="text"
                        {...register("email", {
                          required: true,
                        })}
                        defaultValue={userDetail[0]?.email}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.email && (
                        <span className="font-medium text-red ">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <div>전화번호</div>
                    <div>
                      <input
                        type="number"
                        {...register("phone", {
                          required: true,
                        })}
                        defaultValue={userDetail[0]?.phone}
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.phone && (
                        <span className="font-medium text-red ">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 pt-5">
                    <div className="">
                      <div className="flex items-center gap-8">
                        <div className="mr-8">상태</div>
                        <div>
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
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-5">
                    {" "}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md bg-slate-300 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                      onClick={() => setDetailOpen(false)}
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
              <div
                className={`${
                  activeTab !== "profile" ? "hidden" : ""
                } mx-auto h-[650px]   pt-5 text-left`}
              >
                <form onSubmit={handleSubmit2(profileSubmit)}>
                  <div className="grid grid-cols-12">
                    <div className="col-span-6">
                      <div className="flex w-full items-center text-sm">
                        <div className="w-30 ">
                          <div className="h-20 w-20 rounded-full border bg-slate-400">
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
                          <div className="flex items-center gap-4">
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
                                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                        gender === e?.value && "border-primary"
                                      }`}
                                    >
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                          gender === e?.value && "!bg-primary"
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

                      <div className="mt-5 text-xs">
                        <div className="mb-5">
                          <div>역할</div>
                          <div>
                            <div className="relative z-20 w-full bg-transparent dark:bg-form-input ">
                              <select
                                value={optionRole}
                                {...register2("roleId")}
                                onChange={(e) =>
                                  handleRoleOption(String(e.target.value))
                                }
                                className={`text-md relative z-10 w-full appearance-none rounded border border-slate-300 bg-transparent px-5 py-1.5 text-xs text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                              >
                                <option
                                  value=""
                                  className="text-black dark:text-bodydark"
                                >
                                  역할을 선택하세요.
                                </option>
                                {userDetailOptions?.role?.map((e, i) => (
                                  <option
                                    key={i}
                                    value={e?.roleId}
                                    className="text-black dark:text-bodydark"
                                  >
                                    {e?.role_name}
                                  </option>
                                ))}
                              </select>

                              <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-slate-400 dark:text-white">
                                <FaChevronDown />
                              </span>
                            </div>
                            {optionRole === "" && (
                              <span className="font-medium text-red ">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5">
                          <div>직업 </div>
                          <div>
                            <div className="relative z-20 w-full bg-transparent dark:bg-form-input ">
                              <select
                                {...register2("professionId", {
                                  required: true,
                                })}
                                value={optionProfession}
                                onChange={(e) =>
                                  handleProOption(e.target.value)
                                }
                                className={`text-md relative z-10 w-full appearance-none rounded border border-slate-300 bg-transparent px-5 py-1.5 text-xs text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                              >
                                <option
                                  value=""
                                  className="text-black dark:text-bodydark"
                                >
                                  직업을 선택하세요.
                                </option>
                                {userDetailOptions?.profession?.map((e, i) => (
                                  <option
                                    key={i}
                                    value={String(e?.professionId)}
                                    className="text-black dark:text-bodydark"
                                  >
                                    {e?.title}
                                  </option>
                                ))}
                              </select>

                              <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-slate-400 dark:text-white">
                                <FaChevronDown />
                              </span>
                            </div>
                            {optionProfession === "" && (
                              <span className="font-medium text-red ">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5">
                          <div>회사이름</div>
                          <div>
                            <input
                              type="text"
                              {...register2("companyName", {
                                required: true,
                              })}
                              defaultValue={userDetail[0]?.companyName}
                              className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                            />
                            {errors2.companyName && (
                              <span className="font-medium text-red ">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5">
                          <div>직함</div>
                          <div>
                            <input
                              type="text"
                              {...register2("position")}
                              defaultValue={userDetail[0]?.position}
                              className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                            />
                            {errors2.position && (
                              <span className="font-medium text-red ">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-5">
                          <div>자기 소개</div>
                          <div className="">
                            <TextEditor
                              initialValue=""
                              contentValue={contentValue}
                              onEditorChange={handleEditorChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6  px-5 pt-20 text-xs">
                      <div className="flex h-full w-full flex-col items-center gap-4   p-4">
                        <div className="w-full rounded-md border border-dashed border-slate-400 p-3">
                          <div className="mb-4">관심 분야</div>
                          <div>
                            <div className="grid grid-cols-2 items-center gap-4 ">
                              {InterestsList &&
                                InterestsList?.map((item, index) => (
                                  <div key={index} className="col-span-1">
                                    <label
                                      htmlFor={`${item?.id}${index}`}
                                      className="flex cursor-pointer select-none items-center"
                                    >
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`${item?.id}${index}`}
                                          value={item?.id}
                                          className="sr-only"
                                          onChange={(e) =>
                                            handleCheck(
                                              e,
                                              (item?.id as unknown) as string
                                            )
                                          }
                                          checked={checkedInterest.includes(
                                            (item?.id as unknown) as string
                                          )}
                                        />
                                        <div
                                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                            checkedInterest.includes(
                                              (item?.id as unknown) as string
                                            ) && "border-primary "
                                          }`}
                                        >
                                          <span
                                            className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                              checkedInterest.includes(
                                                (item?.id as unknown) as string
                                              ) && "!bg-primary"
                                            }`}
                                          >
                                            {" "}
                                          </span>
                                        </div>
                                      </div>
                                      {item?.name}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="w-full rounded-md border border-dashed border-slate-400 p-3">
                          <div className="mb-4">참가 목적</div>
                          <div>
                            <div className="grid grid-cols-2 items-center gap-4 ">
                              {PurposesList &&
                                PurposesList?.map((item, index) => (
                                  <div key={index} className="col-span-1">
                                    <label
                                      htmlFor={`purpose${item?.id}${index}`}
                                      className="flex cursor-pointer select-none items-center"
                                    >
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`purpose${item?.id}${index}`}
                                          value={item?.id}
                                          className="sr-only"
                                          onChange={(e) =>
                                            handleCheck2(
                                              e,
                                              (item?.id as unknown) as string
                                            )
                                          }
                                          checked={checkedPurposes.includes(
                                            (item?.id as unknown) as string
                                          )}
                                        />
                                        <div
                                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                            checkedPurposes.includes(
                                              (item?.id as unknown) as string
                                            ) && "border-primary "
                                          }`}
                                        >
                                          <span
                                            className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                              checkedPurposes.includes(
                                                (item?.id as unknown) as string
                                              ) && "!bg-primary"
                                            }`}
                                          >
                                            {" "}
                                          </span>
                                        </div>
                                      </div>
                                      {item?.name}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-5">
                    {" "}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md bg-slate-300 px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                      onClick={() => setDetailOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                    >
                      수정 확인
                    </button>
                  </div>
                </form>
              </div>

              <div
                className={`${
                  activeTab !== "activity" ? "hidden" : ""
                } mx-auto h-[650px]   pt-5 text-left`}
              >
                <div className="grid h-full grid-cols-12 gap-5">
                  <div className="col-span-5">
                    <div className="flex w-full items-center ">
                      <div className="w-25 ">
                        <div className="h-20 w-20 rounded-full border bg-slate-400">
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
                      <div className="text-xs ">
                        <div className="mb-2 font-semibold text-black">
                          {userDetail[0]?.name}2
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
                                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                      gender === e?.value && "border-primary"
                                    }`}
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                        gender === e?.value && "!bg-primary"
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
                          className={`flex w-full items-center gap-4 rounded-lg border border-slate-300  px-5 py-1  hover:bg-primary hover:text-white ${
                            activeButton === "1"
                              ? "bg-primary text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("1")}
                        >
                          <div className="w-20 ">
                            <PiUserList className="text-[50px]" />
                          </div>{" "}
                          <div className="font-semibold">참가한 전시 정보</div>
                        </button>
                        <button
                          type="button"
                          className={`flex w-full items-center gap-4 rounded-lg border border-slate-400  px-5 py-1  hover:bg-primary hover:text-white ${
                            activeButton === "2"
                              ? "bg-primary text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("2")}
                        >
                          <div className="w-20 text-center">
                            <PiUserSwitch className="text-[50px]" />
                          </div>{" "}
                          <div className="font-semibold">참여한 강연 정보</div>
                        </button>
                        <button
                          type="button"
                          className={`flex w-full items-center gap-4 rounded-lg border border-slate-400  px-5 py-1  hover:bg-primary hover:text-white ${
                            activeButton === "3"
                              ? "bg-primary text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("3")}
                        >
                          <div className="w-20 text-center">
                            <PiUsersThreeLight className="text-[50px]" />
                          </div>{" "}
                          <div className="font-semibold">활동한 회의 정보</div>
                        </button>
                        <button
                          type="button"
                          className={`flex w-full items-center gap-4 rounded-lg border border-slate-400  px-5 py-1  hover:bg-primary hover:text-white ${
                            activeButton === "4"
                              ? "bg-primary text-white "
                              : "bg-white text-slate-600"
                          }`}
                          onClick={() => selectButton("4")}
                        >
                          <div className="w-20 text-center">
                            <MdOutlineRateReview className="text-[50px]" />
                          </div>{" "}
                          <div className="font-semibold">평가 활동 요약</div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-7 border-l border-dashed text-black">
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
                    ) : (
                      <RateSummary userId={Number(userDetail[0]?.userId)} />
                    )}
                  </div>
                </div>
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
          <div className="flex w-full items-center justify-center gap-4">
            <button
              onClick={closeError}
              className="rounded-md bg-black px-4 py-1 text-white"
            >
              Ok
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
            <div className="">Saved successfully</div>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <button
              onClick={closeModal}
              className="rounded-md bg-black px-4 py-1 text-white"
            >
              Ok
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
