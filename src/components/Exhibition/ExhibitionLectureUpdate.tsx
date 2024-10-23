"use client";
import {
  endDateAtom,
  exhibitionAllAtom,
  exhibitionDetailAtom,
  fileAtom,
  startDateAtom,
} from "@/atom";
import getToken from "@/helper/getToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";
import NotFound from "../common/NotFound";
import Datepicker from "tailwind-datepicker-react";
import { datePickerOption1, datePickerOption2 } from "@/helper/utility";
import {
  getExhibitionAll,
  getExhibitionLectureDetail,
  updateExhibitionLectures,
} from "@/hooks/useEvents";
import { format } from "date-fns";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import TextEditor from "../Editor/TextEditor";
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
  exhibitionId: string;
}
const ExhibitionLectureUpdate = ({ id, url }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [itemsDetail, setItemsDetail] = useRecoilState(exhibitionDetailAtom);
  const [show, setShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [contentValue, setContentValue] = useState("");
  const [file1, setFile1] = useRecoilState(fileAtom);
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const [contentRequired, setContentRequired] = useState(false);

  const [exhibitionAllList, setExhibitionAllList] = useRecoilState(
    exhibitionAllAtom
  );
  const [optionValue, setOptionValue] = useState("");

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

  const getOptions = async () => {
    const userToken = getToken();
    const response = await getExhibitionAll(String(userToken));

    setExhibitionAllList(response?.rows);
  };
  const getData = async () => {
    const userToken = getToken();
    const response = await getExhibitionLectureDetail(String(userToken), id);

    if (response?.status) {
      setStartDate(format(response?.result?.startDate, "yyyy-MM-dd"));
      setEndDate(format(response?.result?.endDate, "yyyy-MM-dd"));
      setContentValue(response?.result?.description);
      setOptionValue(response?.result?.exhibitionId);
      setItemsDetail([response?.result]);
    } else {
      setNotFound(true);
    }
  };

  const options = datePickerOption1(startDate);

  const options2 = datePickerOption2(endDate);

  const handleEditorChange = (newContent: string) => {
    setContentValue(newContent);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDateChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setStartDate(formattedDate);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setEndDate(formattedDate);
  };
  const handleStartClose = (state: boolean) => {
    setShow(state);
  };
  const handleClose = (state: boolean) => {
    setEndShow(state);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange1 = (e: any) => {
    const newFile = e.target.files[0];

    setFile1(newFile);
  };
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (contentValue === "") {
      setContentRequired(true);
    } else {
      setLoading(true);
      const token = getToken();

      const formdata = new FormData();
      formdata.append("token", String(token));

      formdata.append("lectureId", String(id));
      formdata.append("exhibitionId", optionValue);
      formdata.append("title", data.title ? data.title : "");
      formdata.append("short_desc", data.subtitle ? data.subtitle : "");
      formdata.append("startDate", startDate);
      formdata.append("endDate", endDate);
      formdata.append("description", contentValue);
      if (file1 !== null) {
        formdata.append("img", file1);
      }
      const res = await updateExhibitionLectures(formdata);

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
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {notFound && <NotFound />}
        {itemsDetail?.length > 0 &&
          itemsDetail?.map((item, index) => (
            <div key={index} className="max-w-203">
              <form onSubmit={handleSubmit(onSubmit)}>
                <table className=" w-full table-auto text-sm">
                  <tbody>
                    <tr>
                      <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <h5 className="font-medium text-black dark:text-white">
                          Title
                        </h5>
                      </td>
                      <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <input
                          type="text"
                          {...register("title", {
                            required: true,
                          })}
                          defaultValue={item?.title}
                          placeholder="Enter title"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.title && (
                          <span className="font-medium text-red ">
                            This field is required
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <h5 className="font-medium text-black dark:text-white">
                          Subtitle
                        </h5>
                      </td>
                      <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <input
                          type="text"
                          {...register("subtitle", {
                            required: true,
                          })}
                          defaultValue={item?.short_desc}
                          placeholder="Enter subtitle"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.subtitle && (
                          <span className="font-medium text-red ">
                            This field is required
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <h5 className="font-medium text-black dark:text-white">
                          Exhibition select
                        </h5>
                      </td>
                      <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <div className="relative z-20 bg-transparent dark:bg-form-input w-full">
                          <select
                            {...register(`exhibitionId`, {
                              required: true,
                            })}
                            value={optionValue}
                            onChange={(e) => handleOption(e.target.value)}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                          >
                            <option
                              value={"0"}
                              className="text-black dark:text-bodydark"
                            >
                              Select
                            </option>
                            {exhibitionAllList?.map((e, i) => (
                              <option
                                key={i}
                                value={String(e?.exhibitionId)}
                                className="text-black dark:text-bodydark"
                              >
                                {e?.title}
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
                          Duration
                        </h5>
                      </td>
                      <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <div className="flex max-sm:flex-col w-full gap-4 ">
                          <div className="relative w-full">
                            <Datepicker
                              options={options}
                              onChange={startDateChange}
                              show={show}
                              setShow={handleStartClose}
                            >
                              <div className="relative flex w-full h-[40px] z-20  appearance-none rounded border border-stroke bg-transparent px-1 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white">
                                <div className="pointer-events-none absolute inset-0 left-auto right-3 flex items-center">
                                  <HiOutlineCalendarDays className="text-xl" />
                                </div>
                                <input
                                  {...register("startDate")}
                                  type="text"
                                  className="w-full h-full rounded  outline-none bg-transparent focus:border-primary active:border-primary font-normal transition pl-4 pr-9"
                                  placeholder="Select Date"
                                  value={startDate}
                                  onFocus={() => setShow(true)}
                                  readOnly
                                />
                              </div>
                            </Datepicker>
                          </div>
                          <div className="relative w-full">
                            <Datepicker
                              options={options2}
                              onChange={handleChange}
                              show={endShow}
                              setShow={handleClose}
                            >
                              <div className="relative flex w-full h-[40px] z-20  appearance-none rounded border border-stroke bg-transparent px-1 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white">
                                <div className="pointer-events-none absolute inset-0 left-auto right-3 flex items-center">
                                  <HiOutlineCalendarDays className="text-xl" />
                                </div>
                                <input
                                  {...register("endDate")}
                                  type="text"
                                  className="w-full h-full rounded  outline-none bg-transparent focus:border-primary active:border-primary font-normal transition pl-4 pr-9"
                                  placeholder="Select Date"
                                  value={endDate}
                                  onFocus={() => setEndShow(true)}
                                  readOnly
                                />
                              </div>
                            </Datepicker>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <h5 className="font-medium text-black dark:text-white">
                          Image
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
                              Image is required
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="min-w-[200px] border-[#eee] px-4 py-3 dark:border-strokedark ">
                        <h5 className="font-medium text-black dark:text-white">
                          Desc
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
                            This field is required
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
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex w-26 justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          ))}
      </div>
      <div className="my-5 text-right">
        {isOpen ? (
          <AlertModal>
            <div className="flex items-center justify-center gap-2 mb-3 mt-2 text-xl text-green-600">
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
                Ok
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

export default ExhibitionLectureUpdate;
