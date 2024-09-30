"use client";

import getToken from "@/helper/getToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "../common/Loader";
import { createPrivacy } from "@/hooks/useData";
import AlertModal from "../Modal/AlertModal";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuAlertCircle } from "react-icons/lu";
import TextEditor from "../Editor/TextEditor";

interface Props {
  url?: string;
}
interface FormData {
  title: string;
  content: string;
  status: string;
  image?: string;
}
const Create = ({ url }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [useStatus, setUseStatus] = useState("use");
  const [contentValue, setContentValue] = useState("");
  const [contentRequired, setContentRequired] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleEditorChange = (newContent: string) => {
    setContentValue(newContent);
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push(`${url}`);
  };

  const closeError = () => {
    setCreateError(false);
  };
  const changeStatus = (val: string) => {
    setUseStatus(val);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (contentValue === "") {
      setContentRequired(true);
    } else {
      setContentRequired(false);
      setLoading(true);
      const token = getToken();
      const title = data.title;
      const content = contentValue;
      const res = await createPrivacy(String(token), title, content, useStatus);
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
        <div className="max-w-203">
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
                  <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Content
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
                <tr>
                  <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      Status
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
                          Use
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
                          Not use
                        </label>
                      </div>
                    </div>
                    {useStatus === "" && (
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

export default Create;
