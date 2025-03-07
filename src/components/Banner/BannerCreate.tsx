"use client";
import { fileAtom, menuPermissionAtom } from "@/atom";
import getToken from "@/helper/getToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import CustomModal from "../Modal/Confirm";
import { useState } from "react";
import Loader from "../common/Loader";
import { createBanner } from "@/hooks/useEvents";

interface FormData {
  title: string;
  link: string;
  image?: string;
}
const BannerCreate = () => {
  const router = useRouter();
  const [file1, setFile1] = useRecoilState(fileAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const menuPermission = useRecoilValue(menuPermissionAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const closeModal = () => {
    setIsOpen(false);
    router.push(`/banner`);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const token = getToken();
    const formdata = new FormData();
    formdata.append("token", String(token));
    formdata.append("title", data.title ? data.title : "");
    formdata.append("link", data.link ? data.link : "");
    if (file1 !== null) {
      formdata.append("img", file1);
    }
    const res = await createBanner(formdata);
    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setCreateError(true);
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange1 = (e: any) => {
    const newFile = e.target.files[0];

    setFile1(newFile);
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
                    <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        링크
                      </h5>
                    </td>
                    <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                      <input
                        type="text"
                        {...register("link", {
                          required: true,
                        })}
                        placeholder="링크 입력해주세요"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.link && (
                        <span className="font-medium text-red ">
                          입력해주세요
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="  border-[#eee] px-4 py-3 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        이미지
                      </h5>
                    </td>
                    <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
                      <div className="rounded-sm  ">
                        <input
                          {...register("image", {
                            required: true,
                          })}
                          type="file"
                          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                          onChange={handleFileChange1}
                        />
                        {errors.image && (
                          <span className="font-medium text-red">
                            Banner image is required
                          </span>
                        )}
                        <span className="font-medium text-red text-[13px]">
                          배너 이미지를 등록해주세요. (권장 사이즈: 375x375px
                          이상, 최대 20MB까지)
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex w-full justify-end gap-4 px-4 text-center">
                <Link
                  href={"/banner"}
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
          <CustomModal>
            <h2 className="text-xl text-black"> Banner </h2>
            <div className="mb-2 mt-4 text-lg text-green-600">
              저장되었습니다
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={closeModal}
                className="rounded-md bg-slate-500 px-3 py-1 text-white"
              >
                확인
              </button>
            </div>
          </CustomModal>
        ) : (
          ""
        )}
        {createError ? (
          <CustomModal>
            <h2 className="text-xl text-black"> Banner Create </h2>
            <div className="mb-2 mt-4 text-lg text-red">Error!!</div>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={closeError}
                className="rounded-md bg-slate-500 px-3 py-1 text-white"
              >
                확인
              </button>
            </div>
          </CustomModal>
        ) : (
          ""
        )}
        {loading ? <Loader /> : ""}
      </div>
    </div>
  );
};

export default BannerCreate;
