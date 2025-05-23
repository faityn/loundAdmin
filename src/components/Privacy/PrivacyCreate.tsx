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
import { menuPermissionAtom } from "@/atom";
import { useRecoilValue } from "recoil";

interface Props {
  url?: string;
}
interface FormData {
  title: string;
  content: string;
  type: string;
  image?: string;
}
const Create = ({ url }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [typeStatus, setTypeStatus] = useState("privacy");
  const [contentValue, setContentValue] = useState("");
  const [contentRequired, setContentRequired] = useState(false);
  const menuPermission = useRecoilValue(menuPermissionAtom);

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
    setTypeStatus(val);
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
      const res = await createPrivacy(
        String(token),
        title,
        content,
        typeStatus
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
        <div className="max-w-203">
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
                        {...register("title", {
                          required: true,
                        })}
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
                        내용
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
                    <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        유형
                      </h5>
                    </td>
                    <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                      <div className="flex items-center gap-8">
                        <div>
                          <label
                            htmlFor="privacy"
                            className="flex cursor-pointer select-none items-center"
                          >
                            <div className="relative">
                              <input
                                {...register("type")}
                                type="checkbox"
                                id="privacy"
                                value={"privacy"}
                                className="sr-only"
                                onChange={(e) => {
                                  changeStatus(e.target.value);
                                }}
                              />
                              <div
                                className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                  typeStatus === "privacy" && "border-primary"
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                    typeStatus === "privacy" && "!bg-primary"
                                  }`}
                                >
                                  {" "}
                                </span>
                              </div>
                            </div>
                            개인 정보 처리 방침
                          </label>
                        </div>
                        <div className="flex gap-5">
                          <label
                            htmlFor="terms"
                            className="flex cursor-pointer select-none items-center"
                          >
                            <div className="relative">
                              <input
                                {...register("type")}
                                type="checkbox"
                                id="terms"
                                value={"terms"}
                                className="sr-only"
                                onChange={(e) => {
                                  changeStatus(e.target.value);
                                }}
                              />
                              <div
                                className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                                  typeStatus === "terms" && "border-primary"
                                }`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                                    typeStatus === "terms" && "!bg-primary"
                                  }`}
                                >
                                  {" "}
                                </span>
                              </div>
                            </div>
                            이용약관
                          </label>
                        </div>
                      </div>
                      {typeStatus === "" && (
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
      </div>
      <div className="my-5 text-right">
        {isOpen ? (
          <AlertModal>
            <div className="flex items-center justify-center gap-2 mb-3 mt-2 text-xl text-green-600">
              <FaRegCheckCircle className="text-xl" />{" "}
              <div className="">등록되었습니다</div>
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
              <div className="">등록 실패했습니다. 다시 시도해주세요</div>
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

export default Create;
