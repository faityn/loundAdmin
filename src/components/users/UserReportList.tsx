"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkedListAtom,
  dataSavedAtom,
  detailOpenAtom,
  menuPermissionAtom,
  totalPageAtom,
  userReportDetailAtom,
  userReportListAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import CustomModal from "../Modal/Confirm";

import getToken from "@/helper/getToken";
import { format } from "date-fns";
import {
  deleteReport,
  getUserReportDetail,
  getUserReportList,
} from "@/hooks/useData";
import { FaChevronDown } from "react-icons/fa";
import UserReportDetailModal from "./UserReportDetailModal";

interface Props {
  url?: string;
}
const UserReportList = ({ url }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pageLimit, setPageLimit] = useState("20");
  const [totalCount, setTotalCount] = useState(0);
  const page = searchParams.get("page");
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?id=0`;
  const [isOpen, setIsOpen] = useState(false);
  const [itemsList, setItemsList] = useRecoilState(userReportListAtom);
  const setFeedbackDetail = useSetRecoilState(userReportDetailAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const menuPermission = useRecoilValue(menuPermissionAtom);
  const [dataSaved, setDataSaved] = useRecoilState(dataSavedAtom);
  const [detailOpen, setDetailOpen] = useRecoilState(detailOpenAtom);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePageLimit = (value: string) => {
    setPageLimit(value);
    router.push(`/${url}?pageLimit=${value}&page=1`);
  };

  const ReportDetail = async (exhibitionId: number) => {
    setDataSaved(false);
    const userToken = getToken();

    const response = await getUserReportDetail(
      String(userToken),
      Number(exhibitionId)
    );

    if (response?.status) {
      setFeedbackDetail(response?.result);
    }
    setDetailOpen(true);
  };

  const reportDelete = async () => {
    const userToken = getToken();

    const result = checkedElements.join(",");
    const res = await deleteReport(String(userToken), result);
    if (res?.status) {
      getData();
      setChechedElements([]);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = itemsList?.map((data) => {
        return data?.id;
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
    const response = await getUserReportList(
      String(userToken),
      Number(page),
      Number(size)
    );

    if (response) {
      setTotalCount(Number(response?.count));
      const totalPage = Math.ceil(Number(response?.count) / Number(size));
      setTotalPage(totalPage);
      setItemsList(response?.rows);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [dataSaved]);

  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex items-center w-full gap-4 max-md:col-span-12 text-slate-700 font-medium">
          전체 {totalCount} 개
        </div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
          <div className="flex w-full items-center justify-end gap-4 ">
            <div className="relative z-20 w-39 bg-transparent dark:bg-form-input ">
              <select
                value={pageLimit}
                onChange={(e) => handlePageLimit(e.target.value)}
                className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-1.5 text-sm text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="10" className="text-black dark:text-bodydark">
                  10개씩 보기
                </option>
                <option value="20" className="text-black dark:text-bodydark">
                  20개씩 보기
                </option>
                <option value="50" className="text-black dark:text-bodydark">
                  50개씩 보기
                </option>
                <option value="100" className="text-black dark:text-bodydark">
                  100개씩 보기
                </option>
              </select>
              <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-black dark:text-white">
                <FaChevronDown />
              </span>
            </div>
            {menuPermission?.status === "write" ? (
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md disabled:bg-slate-300 bg-rose-400 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
                  onClick={openModal}
                  disabled={checkedElements?.length > 0 ? false : true}
                >
                  삭제
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          {isOpen ? (
            <CustomModal>
              <div className=" my-4 text-lg text-black">
                정말 삭제 진행하시겠습니까? 삭제한 내용은 다시 복구
                불가능합니다.
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="rounded-md bg-slate-500 px-3 py-1 text-white"
                >
                  취소{" "}
                </button>
                <button
                  onClick={reportDelete}
                  className="rounded-md bg-red px-3 py-1 text-white "
                >
                  삭제{" "}
                </button>
              </div>
            </CustomModal>
          ) : (
            ""
          )}

          {detailOpen ? <UserReportDetailModal /> : ""}
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
              <th className="w-[50px] px-4 py-3 font-medium text-black dark:text-white ">
                #
              </th>

              <th className=" w-[200px]  px-4 py-3 font-medium text-black dark:text-white ">
                신고자
              </th>
              <th className=" w-[200px]  px-4 py-3 font-medium text-black dark:text-white ">
                신고 당한 자
              </th>
              <th className=" w-[200px]  px-4 py-3 font-medium text-black dark:text-white ">
                신고 일자
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white ">
                신고 내용
              </th>
              <th className="w-[200px] px-4 py-3 font-medium text-black dark:text-white">
                처리 상태
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-4  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.id)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.id)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(e, (item?.id as unknown) as string)
                        }
                        checked={checkedElements.includes(
                          (item?.id as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.id as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.id as unknown) as string
                            ) && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                  </label>
                </td>
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
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? ReportDetail(Number(item?.id))
                        : ""
                    }
                  >
                    <h5 className="font-medium  dark:text-white">
                      {item?.blocker?.name}
                    </h5>
                  </div>
                  
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? ReportDetail(Number(item?.id))
                        : ""
                    }
                  >
                    <h5 className="font-medium  dark:text-white">
                      {item?.blocked?.name}
                    </h5>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? ReportDetail(Number(item?.id))
                        : ""
                    }
                  >
                    <p className="text-black dark:text-white">
                      {item?.createdAt
                        ? format(item?.createdAt as string, "yyyy-MM-dd HH:mm")
                        : ""}
                    </p>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? ReportDetail(Number(item?.id))
                        : ""
                    }
                  >
                    <h5 className="font-medium  dark:text-white">
                      {item?.description}
                    </h5>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <h5 className="font-medium  dark:text-white">
                    {item?.request}
                  </h5>
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

export default UserReportList;
