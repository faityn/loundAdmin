"use client";

import getToken from "@/helper/getToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import AlertModal from "../Modal/AlertModal";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuAlertCircle } from "react-icons/lu";
import { createAdmin, getAdminMenuList } from "@/hooks/useAdmin";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  adminPermittionAtom,
  checkedListAtom,
  menuAllListAtom,
  menuPermissionAtom,
} from "@/atom";
import { encrypt } from "@/helper/utility";

interface Props {
  url?: string;
}
interface FormData {
  username: string;
  pass: string;
  passConfirm: string;
  email: string;
  phone: string;
  img: string;
  status: string;
}
const AdminCreate = ({ url }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [useStatus, setUseStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const [menuAllList, setMenuAllList] = useRecoilState(menuAllListAtom);
  const [adminPermittionArray, setAdminPermittionArray] = useRecoilState(
    adminPermittionAtom
  );
  const menuPermission = useRecoilValue(menuPermissionAtom);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const password = watch("pass");
  const passwordConfirm = watch("passConfirm");
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

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = menuAllList?.map((data) => {
        return data?.menuId;
      });
      setChechedElements(() =>
        e.target.checked ? (([...allIds] as unknown) as string[]) : []
      );
    } else {
      setChechedElements((prevChecked) =>
        e.target.checked
          ? [...prevChecked, id]
          : prevChecked.filter((item: string) => item !== id)
      );

      const newObject = { menuId: Number(id), status: "read" };
      setAdminPermittionArray((adminPermittionArray) =>
        e.target.checked
          ? [...adminPermittionArray, newObject]
          : adminPermittionArray.filter(
              (item) => Number(item?.menuId) !== Number(id)
            )
      );
    }
  };

  const handleSubPermittion = (val: string, id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedArray = adminPermittionArray.map((item: any) =>
      item?.menuId === id
        ? {
            ...item,
            status: val,
          }
        : item
    );
    setAdminPermittionArray(updatedArray);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const userToken = getToken();

    const encryptedPass = encrypt(data.pass);

    const username = data.username;
    const password = String(encryptedPass);
    const status = data.status;
    const res = await createAdmin(
      String(userToken),
      username,
      password,
      status,
      adminPermittionArray
    );

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setErrorMessage(String(res?.result));
      setCreateError(true);
      setLoading(false);
    }
  };

  const getData = async () => {
    const userToken = getToken();
    const response = await getAdminMenuList(String(userToken));

    setMenuAllList(response);
    setLoading(false);
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);

  useEffect(() => {}, [checkedElements, adminPermittionArray]);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="max-w-[1300px]">
          {menuPermission?.status === "write" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-10 px-5">
                <div className="w-[600px]">
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
                  <div className="mb-4">
                    <div>비밀번호 확인</div>
                    <div>
                      <input
                        type="password"
                        {...register("passConfirm", {
                          required: true,
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        placeholder="**********"
                        className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {password !== passwordConfirm && (
                        <span className="text-xs font-medium text-red ">
                          Passwords do not match
                        </span>
                      )}
                      {/* {errors.passConfirm && (
                      <span className="text-xs font-medium text-red ">
                        입력해주세요
                      </span>
                    )} */}
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
                </div>
                <div className="w-full">
                  <div className="mb-4">
                    <table className="w-full table-auto text-sm">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="px-4 py-3 font-medium text-black dark:text-white ">
                            대메뉴
                          </th>
                          <th className="px-4 py-3 font-medium text-black dark:text-white ">
                            서브 메뉴
                          </th>
                          <th className="px-4 py-3 font-medium text-black dark:text-white ">
                            권한 설정
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuAllList?.length > 0 &&
                          menuAllList?.map((menu, m) => (
                            <tr key={m}>
                              <td className="px-4 border-b  border-[#eee]">
                                <div className="font-semibold text-black dark:text-white">
                                  {menu?.menu_name}
                                </div>
                              </td>
                              <td className="px-4 pt-5 border-b  border-[#eee]">
                                {menu?.children?.map((sub, s) => (
                                  <label
                                    key={s}
                                    htmlFor={String(sub?.menuId)}
                                    className="h-10 flex cursor-pointer select-none items-center text-black/70 mb-2 dark:text-white"
                                  >
                                    <div className="relative">
                                      <input
                                        type="checkbox"
                                        id={String(sub?.menuId)}
                                        className="sr-only"
                                        onChange={(e) =>
                                          handleCheck(
                                            e,
                                            (sub?.menuId as unknown) as string
                                          )
                                        }
                                        checked={checkedElements.includes(
                                          (sub?.menuId as unknown) as string
                                        )}
                                      />
                                      <div
                                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                                          checkedElements.includes(
                                            (sub?.menuId as unknown) as string
                                          ) &&
                                          "border-primary bg-gray dark:bg-transparent"
                                        }`}
                                      >
                                        <span
                                          className={`h-2 w-2 rounded-sm ${
                                            checkedElements.includes(
                                              (sub?.menuId as unknown) as string
                                            ) && "bg-primary"
                                          }`}
                                        ></span>
                                      </div>
                                    </div>
                                    {sub?.menu_name}
                                  </label>
                                ))}
                              </td>
                              <td className="w-30 pl-4 pt-5 border-b  border-[#eee]">
                                {menu?.children?.map((sub, s) => (
                                  <select
                                    key={s}
                                    className="px-3 w-full h-10 mb-2 text-md bg-[#F2F6FF] dark:bg-meta-4 rounded-xl focus:border focus:border-primary outline-none disabled:opacity-50"
                                    onChange={(e) =>
                                      handleSubPermittion(
                                        e.target.value,
                                        Number(sub?.menuId)
                                      )
                                    }
                                    disabled={
                                      checkedElements.includes(
                                        (sub?.menuId as unknown) as string
                                      )
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value={"read"}>열람</option>
                                    <option value={"write"}>수정</option>
                                  </select>
                                ))}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-5">
                {" "}
                <Link href={`${url}`}>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-slate-300 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                  >
                    취소
                  </button>
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                >
                  수정 확인
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
            <div className="flex items-center justify-center gap-2 mb-3 mt-2 text-xl text-red">
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
        {loading ? <Loader /> : ""}
      </div>
    </div>
  );
};

export default AdminCreate;
