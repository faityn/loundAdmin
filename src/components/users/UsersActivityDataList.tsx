"use client";
import { useRecoilState } from "recoil";
import { checkedListAtom } from "@/atom";
import { useEffect, useState } from "react";

//import { getUsersList } from "@/hooks/useUser";
import CustomModal from "../Modal/Confirm";
//import getToken from "@/helper/getToken";
const UsersActivityDataList = () => {
  //const size = 20;
  //const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const [isOpen, setIsOpen] = useState(false);
  //const [userAllList, setUserAllList] = useRecoilState(adminAllListAtom);
  const [checkedUsers, setChechedUsers] = useRecoilState(checkedListAtom);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const userDelete = async () => {
    //getData();
    setChechedUsers([]);
    setIsOpen(false);
  };

  const getData = async () => {
    // const userToken = getToken();
    // const response = await getUsersList(
    //   String(userToken),
    //   Number(page),
    //   Number(size)
    // );
    // const totalPage = Math.ceil(Number(response?.count) / Number(size));
    // setTotalPage(totalPage);
    // setUserAllList(response?.rows);
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
          <div className="flex w-full  justify-end gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md disabled:bg-slate-300 bg-rose-400 px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
              onClick={openModal}
              disabled={checkedUsers?.length > 0 ? false : true}
            >
              삭제
            </button>
          </div>
          {isOpen ? (
            <CustomModal>
              <h2 className="text-xl text-black">
                ({checkedUsers?.length}){" "}
                {checkedUsers?.length > 1 ? "Users" : "User"} will <br /> be
                deleted
              </h2>
              <div className="mb-2 mt-4 text-lg text-black">
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
                <button
                  onClick={userDelete}
                  className="rounded-md bg-red px-3 py-1 text-white "
                >
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
              <th className="w-[30px] px-3 py-3 font-medium text-black dark:text-white "></th>
              <th className="min-w-50px] px-4 py-3 font-medium text-black dark:text-white ">
                #
              </th>
              <th className="min-w-[100px] px-4 py-3 font-medium text-black dark:text-white ">
                Image
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white ">
                Name
              </th>
              <th className="min-w-[120px] px-4 py-3 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
                Phone
              </th>
              <th className="min-w-[130px] px-4 py-3 font-medium text-black dark:text-white">
                Activity Data
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div className="my-5 text-right"></div>
    </div>
  );
};

export default UsersActivityDataList;
