"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  checkedListAtom,
  interestsListAtom,
  menuPermissionAtom,
  totalPageAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import CustomModal from "../Modal/Confirm";

import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import getToken from "@/helper/getToken";
import { deleteInterest, getInterestsList } from "@/hooks/useData";

interface Props {
  url?: string;
}

const InterestsList = ({ url }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page");
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?id=0`;
  const [isOpen, setIsOpen] = useState(false);
  const [itemsList, setItemsList] = useRecoilState(interestsListAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const menuPermission = useRecoilValue(menuPermissionAtom);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const userDelete = async () => {
    const userToken = getToken();
    checkedElements.forEach(async (element) => {
      await deleteInterest(String(userToken), Number(element));
    });
    getData();
    setChechedElements([]);
    setIsOpen(false);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = itemsList?.map((data) => {
        return data?.interestId;
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
    }
  };

  const getData = async () => {
    const userToken = getToken();
    const response = await getInterestsList(String(userToken));

    if (response?.status) {
      setTotalPage(response?.result?.page);
      setItemsList(response?.result?.rows);
    }
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12 pb-4">
        <div className="col-span-5 flex w-full gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full text-right max-md:col-span-12 ">
          {menuPermission?.status === "write" ? (
            <div className="flex w-full justify-end gap-4">
              <Link
                href={`${url}/create`}
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
              >
                생성
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md disabled:bg-slate-300 bg-rose-400 px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
                onClick={openModal}
                disabled={checkedElements?.length > 0 ? false : true}
              >
                삭제
              </button>
            </div>
          ) : (
            ""
          )}
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
              <th className="w-[30px] px-3 py-3 font-medium text-black dark:text-white ">
                <label
                  htmlFor="checkboxLabelOne"
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="checkboxLabelOne"
                      className="sr-only"
                      onChange={(e) => handleCheck(e, "all")}
                      checked={
                        checkedElements.length === itemsList?.length
                          ? true
                          : false
                      }
                    />
                    <div
                      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                        checkedElements.length === itemsList?.length &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm ${
                          checkedElements.length === itemsList?.length &&
                          "bg-primary"
                        }`}
                      ></span>
                    </div>
                  </div>
                </label>
              </th>
              <th className="w-[60px] px-4 py-3 font-medium text-black dark:text-white ">
                #
              </th>

              <th className=" px-4 py-3 font-medium text-black dark:text-white ">
                제목
              </th>

              <th className=" w-[200px]  px-4 py-3 font-medium text-black dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {itemsList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-4  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.interestId)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.interestId)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(
                            e,
                            (item?.interestId as unknown) as string
                          )
                        }
                        checked={checkedElements.includes(
                          (item?.interestId as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.interestId as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.interestId as unknown) as string
                            ) && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                  </label>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.title}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  {menuPermission?.status === "write" ? (
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                    >
                      <Link href={`${url}/${item?.interestId}`}>
                        <FiEdit className="text-[17px]" />
                      </Link>
                      {/* <RiSearchLine /> */}
                    </p>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-5 flex w-full justify-center">
        {totalPage > 1 ? (
          <Pagination currentPage={Number(page)} pageUrl={pageUrl} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default InterestsList;
