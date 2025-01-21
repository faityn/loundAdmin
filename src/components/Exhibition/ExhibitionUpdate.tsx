"use client";
import {
  checkedInterestsListAtom,
  checkedPurposesListAtom,
  companyListAtom,
  endDateAtom,
  exhibitionDetailAtom,
  exhibitionOptionAtom,
  fileAtom,
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
import { getInterestsOptions } from "@/hooks/useData";
import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";
import NotFound from "../common/NotFound";

import { getExhibitionDetail, updateExhibition } from "@/hooks/useEvents";
import { format, parseISO } from "date-fns";
import TextEditor from "../Editor/TextEditor";
import { formatInTimeZone } from "date-fns-tz";
import EndDatePicker from "../common/EndDatePicker";
import StartDatePicker from "../common/StartDatePicker";
import { getCompanyAllList } from "@/hooks/useUser";
interface Props {
  id: number;
  url?: string;
}

interface FormData {
  companyId: string;
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
const ExhibitionUpdate = ({ id, url }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [itemsDetail, setItemsDetail] = useRecoilState(exhibitionDetailAtom);
  const [file1, setFile1] = useRecoilState(fileAtom);
  const [useStatus, setUseStatus] = useState("use");
  const [contentValue, setContentValue] = useState("");
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const [optionsList, setOptionsList] = useRecoilState(exhibitionOptionAtom);
  const [optionValue, setOptionValue] = useState(0);
  const [contentRequired, setContentRequired] = useState(false);
  const [checkedInterests, setChechedInterests] = useRecoilState(
    checkedInterestsListAtom
  );
  const [checkedPurposes, setChechedPurposes] = useRecoilState(
    checkedPurposesListAtom
  );
  const menuPermission = useRecoilValue(menuPermissionAtom);
  const [companyList, setCompanyList] = useRecoilState(companyListAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
    getOptions();
  }, []);
  useEffect(() => {}, [checkedInterests]);

  const getOptions = async () => {
    const userToken = getToken();
    const response = await getInterestsOptions(String(userToken));

    setOptionsList([response?.result]);

    const res = await getCompanyAllList(String(userToken));

    if (res) {
      setCompanyList(res?.rows);
    }
  };
  const getData = async () => {
    const userToken = getToken();
    const response = await getExhibitionDetail(String(userToken), id);

    if (response?.status) {
      const newCheckedInterestsArray = response?.result?.interests?.map(
        (item: { interestId: number }) => item.interestId
      );
      const newCheckedPurposesArray = response?.result?.purposes?.map(
        (item: { purposeId: number }) => item.purposeId
      );

      const startDate = formatInTimeZone(
        parseISO(response?.result?.startDate),
        "UTC",
        "yyyy-MM-dd"
      );
      const endDate = formatInTimeZone(
        parseISO(response?.result?.endDate),
        "UTC",
        "yyyy-MM-dd"
      );

      setStartDate(startDate);
      setEndDate(endDate);

      setChechedInterests(newCheckedInterestsArray);
      setChechedPurposes(newCheckedPurposesArray);

      setContentValue(response?.result?.description);
      setUseStatus(response?.result?.status);
      setOptionValue(response?.result?.companyId);
      setItemsDetail([response?.result]);
    } else {
      setNotFound(true);
    }
  };

  const handleOption = (val: string) => {
    setOptionValue(Number(val));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange1 = (e: any) => {
    const newFile = e.target.files[0];

    setFile1(newFile);
  };

  const handleEditorChange = (newContent: string) => {
    setContentValue(newContent);
  };

  const handleCheckInterests = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setChechedInterests((prevChecked) =>
      e.target.checked
        ? [...prevChecked, id]
        : prevChecked.filter((item: string) => item !== id)
    );
  };

  const handleCheckPurposes = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setChechedPurposes((prevChecked) =>
      e.target.checked
        ? [...prevChecked, id]
        : prevChecked.filter((item: string) => item !== id)
    );
  };

  const changeStatus = (val: string) => {
    setUseStatus(val);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDateChange = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setStartDate(formattedDate);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setEndDate(formattedDate);
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push(`${url}`);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (contentValue === "") {
      setContentRequired(true);
    } else {
      setLoading(true);
      const token = getToken();
      const newCheckedInterestsArray = checkedInterests?.map((item) => ({
        interestId: item,
      }));
      const newCheckedPurposesArray = checkedPurposes?.map((item) => ({
        purposeId: item,
      }));
      const formdata = new FormData();
      formdata.append("token", String(token));
      formdata.append("exhibitionId", String(id));
      formdata.append("companyId", data.companyId ? data.companyId : "");
      formdata.append("title", data.title ? data.title : "");
      formdata.append("short_desc", data.subtitle ? data.subtitle : "");
      formdata.append("startDate", startDate);
      formdata.append("endDate", endDate);
      formdata.append("description", contentValue);
      formdata.append("status", useStatus);

      if (file1 !== null) {
        formdata.append("img", file1);
      }
      const res = await updateExhibition(
        formdata,
        newCheckedInterestsArray,
        newCheckedPurposesArray
      );

      if (res?.status) {
        setIsOpen(true);
        setLoading(false);
      } else {
        setCreateError(true);
        setLoading(false);
      }
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
                            회사 선택하기
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <div className="relative z-20 bg-transparent dark:bg-form-input w-full">
                            <select
                              {...register(`companyId`, {
                                required: true,
                              })}
                              value={optionValue}
                              onChange={(e) => handleOption(e.target.value)}
                              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-bodydark`}
                            >
                              <option
                                value=""
                                className="text-black dark:text-white"
                              >
                                선택
                              </option>
                              {companyList?.map((item, index) => (
                                <option
                                  key={index}
                                  value={item?.id}
                                  className="text-black dark:text-white"
                                >
                                  {item?.name}{" "}
                                </option>
                              ))}
                            </select>

                            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-black">
                              <FaChevronDown />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            행사 이름
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <input
                            type="text"
                            {...register("title", {
                              required: true,
                            })}
                            defaultValue={item?.title}
                            placeholder="제목 입력해주세요"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {errors.title && (
                            <span className="font-medium text-red ">
                              입력해주세요
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            행사 일정
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <div className="flex w-full gap-4 max-sm:flex-col ">
                            <div className="relative w-full">
                              <StartDatePicker
                                label="시작"
                                onDateChange={startDateChange}
                                defaultDate={startDate}
                              />
                            </div>
                            <div className="relative w-full">
                              <EndDatePicker
                                label="종료일"
                                onDateChange={handleChange}
                                defaultDate={endDate}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            대표 이미지 등록
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
                                className="max-h-[200px] max-w-[500px]  "
                              />
                            )}
                          </div>
                          <div className="rounded-sm  ">
                            <input
                              {...register("image")}
                              type="file"
                              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                              onChange={handleFileChange1}
                            />
                            {errors.image && (
                              <span className="font-medium text-red">
                                이미지 업로드해주세요
                              </span>
                            )}
                            <span className="font-medium text-red text-[13px]">
                              행사를 잘 보여줄 대표 이미지를 등록해주세요. (권장
                              사이즈: 335x160px 이상, 최대 20MB까지)
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            행사 소개
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <TextEditor
                            initialValue=""
                            contentValue={contentValue}
                            onEditorChange={handleEditorChange}
                          />

                          {contentRequired && (
                            <span className="font-medium text-red ">
                              입력해주세요
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            관심 분야
                          </h5>
                        </td>
                        <td className=" border-b border-slate-500 px-4 py-6 dark:border-strokedark ">
                          <div className=" grid grid-cols-12 gap-6">
                            {optionsList[0]?.interest?.map((item, index) => (
                              <div key={index} className="col-span-4">
                                <label
                                  htmlFor={`Interests${item?.interestId}`}
                                  className="flex cursor-pointer select-none items-center"
                                >
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      id={`Interests${item?.interestId}`}
                                      className="sr-only"
                                      onChange={(e) =>
                                        handleCheckInterests(
                                          e,
                                          (item?.interestId as unknown) as string
                                        )
                                      }
                                      checked={checkedInterests.includes(
                                        (item?.interestId as unknown) as string
                                      )}
                                    />
                                    <div
                                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                                        checkedInterests.includes(
                                          (item?.interestId as unknown) as string
                                        ) &&
                                        "border-primary bg-gray dark:bg-transparent"
                                      }`}
                                    >
                                      <span
                                        className={`h-2 w-2 rounded-sm ${
                                          checkedInterests.includes(
                                            (item?.interestId as unknown) as string
                                          ) && "bg-primary"
                                        }`}
                                      ></span>
                                    </div>
                                  </div>
                                  {item?.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            참가 목적
                          </h5>
                        </td>
                        <td className=" border-b border-slate-500 px-4 py-6 dark:border-strokedark ">
                          <div className=" grid grid-cols-12 gap-6">
                            {optionsList[0]?.purpose?.map((item, index) => (
                              <div key={index} className="col-span-4">
                                <label
                                  htmlFor={`Purposes${item?.purposeId}`}
                                  className="flex cursor-pointer select-none items-center"
                                >
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      id={`Purposes${item?.purposeId}`}
                                      className="sr-only"
                                      onChange={(e) =>
                                        handleCheckPurposes(
                                          e,
                                          (item?.purposeId as unknown) as string
                                        )
                                      }
                                      checked={checkedPurposes.includes(
                                        (item?.purposeId as unknown) as string
                                      )}
                                    />
                                    <div
                                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                                        checkedPurposes.includes(
                                          (item?.purposeId as unknown) as string
                                        ) &&
                                        "border-primary bg-gray dark:bg-transparent"
                                      }`}
                                    >
                                      <span
                                        className={`h-2 w-2 rounded-sm ${
                                          checkedPurposes.includes(
                                            (item?.purposeId as unknown) as string
                                          ) && "bg-primary"
                                        }`}
                                      ></span>
                                    </div>
                                  </div>
                                  {item?.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="  border-[#eee] px-4 py-6 dark:border-strokedark ">
                          <h5 className="font-medium text-black dark:text-white">
                            행사 상태
                          </h5>
                        </td>
                        <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                          <div className="flex items-center gap-8">
                            <div>
                              <label
                                htmlFor="use"
                                className="flex cursor-pointer select-none items-center"
                              >
                                <div className="relative">
                                  <input
                                    {...register("status")}
                                    type="checkbox"
                                    id="use"
                                    value={"use"}
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
                                사용
                              </label>
                            </div>
                            <div className="flex gap-5">
                              <label
                                htmlFor="notUse"
                                className="flex cursor-pointer select-none items-center"
                              >
                                <div className="relative">
                                  <input
                                    {...register("status")}
                                    type="checkbox"
                                    id="notUse"
                                    value={"disabled"}
                                    className="sr-only"
                                    onChange={(e) => {
                                      changeStatus(e.target.value);
                                    }}
                                  />
                                  <div
                                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                      useStatus === "disabled" &&
                                      "border-primary"
                                    }`}
                                  >
                                    <span
                                      className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                        useStatus === "disabled" &&
                                        "!bg-primary"
                                      }`}
                                    >
                                      {" "}
                                    </span>
                                  </div>
                                </div>
                                비사용
                              </label>
                            </div>
                          </div>
                          {useStatus === "" && (
                            <span className="font-medium text-red ">
                              입력해주세요
                            </span>
                          )}
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
          ))}
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

export default ExhibitionUpdate;
