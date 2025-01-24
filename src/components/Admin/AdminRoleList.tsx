"use client";

import { adminRoleListAtom } from "@/atom";
import getToken from "@/helper/getToken";
import { getAdminRoleList } from "@/hooks/useAdmin";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MdDeleteOutline } from "react-icons/md";

import { FiEye } from "react-icons/fi";
import CustomModal from "../Modal/Confirm";
interface Props {
  url?: string;
}
const AdminRoleList = ({ url }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminRoleList, setAdminRoleList] = useRecoilState(adminRoleListAtom);
  const getData = async () => {
    const userToken = getToken();
    const response = await getAdminRoleList(String(userToken));

    setAdminRoleList(response);
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteHandle = () => {
    setIsOpen(true);
  };

  // const itemDelete = async (id: number) => {
  //   const userToken = getToken();
  //   const check = await checkRole(String(userToken), Number(id));
  //   console.log(check);

  //    const deleted = await deleteRole(String(userToken), Number(id));
  //    console.log(deleted);

  //   getData();

  //   setIsOpen(false);
  // };
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12 pb-4">
        <div className="col-span-5 flex w-full gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full text-right max-md:col-span-12 ">
          <div className="flex w-full justify-end gap-4">
            <Link
              href={`${url}/create`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
            >
              생성
            </Link>
          </div>
          {isOpen ? (
            <CustomModal>
              <div className="mb-2 mt-2 text-lg text-black">
                Are you sure you want to <br />
                delete?
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="rounded-md bg-slate-500 px-3 py-1 text-white"
                >
                  취소{" "}
                </button>
                <button className="rounded-md bg-red px-3 py-1 text-white ">
                  삭제{" "}
                </button>
              </div>
            </CustomModal>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="w-[70px] px-4 py-3 font-medium text-black dark:text-white ">
                #
              </th>
              <th className=" px-4 py-3 font-medium text-black dark:text-white ">
                Role name
              </th>

              <th className="w-[200px] px-4 py-3 font-medium text-black dark:text-white">
                Created date
              </th>
              <th className="w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adminRoleList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {Number(page) > 1
                      ? Number(page) * Number(pageLimit) -
                        Number(pageLimit) +
                        index +
                        1
                      : index + 1}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.role_name}{" "}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.createdAt
                      ? format(item?.createdAt as string, "yyyy-MM-dd HH:mm:ss")
                      : ""}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div className="flex gap-3 items-center">
                    <Link href={`${url}/${item?.roleId}`} className="">
                      <FiEye className="text-xl text-body dark:text-white  hover:text-primary dark:hover:text-primary" />
                    </Link>
                    <MdDeleteOutline
                      onClick={() => deleteHandle()}
                      className="text-2xl cursor-pointer text-body dark:text-white hover:text-rose-400 dark:hover:text-rose-400"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-5 text-right"></div>
    </div>
  );
};

export default AdminRoleList;
