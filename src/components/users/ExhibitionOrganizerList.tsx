"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkedListAtom,
  companyListAtom,
  createExOrganizerOpenAtom,
  dataSavedAtom,
  detailOpenAtom,
  menuPermissionAtom,
  organizerDetailAtom,
  searchOptionsAtom,
  totalPageAtom,
  userDetailOptionsAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import {
  deleteOrganizer,
  getCompanyList,
  getExhibitionOrganizerDetail,
  getOrganizerSearchOptionList,
  userDetailOptionList,
} from "@/hooks/useUser";
import CustomModal from "../Modal/Confirm";
import getToken from "@/helper/getToken";

import Loader from "../common/Loader";
import { FaChevronDown } from "react-icons/fa";

import ExhibitionOrganizerCreateModal from "./ExhibitionOrganizerCreateModal";
import ExhibitionOrganizerDetailModal from "./ExhibitionOrganizerDetailModal";

const ExhibitionOrganizerList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [newUrl, setNewUrl] = useState("");
  const [pageLimit, setPageLimit] = useState("10");
  const page = searchParams.get("page");
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?${newUrl}&pageLimit=${pageLimit}`;
  const [isOpen, setIsOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useRecoilState(
    createExOrganizerOpenAtom
  );
  const [companyList, setCompanyList] = useRecoilState(companyListAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const setSearchOptions = useSetRecoilState(searchOptionsAtom);
  const setUserDetailOptions = useSetRecoilState(userDetailOptionsAtom);

  const [loading, setLoading] = useState<boolean>(false);

  const setOrganizerDetail = useSetRecoilState(organizerDetailAtom);
  const [detailOpen, setDetailOpen] = useRecoilState(detailOpenAtom);

  const [dataSaved, setDataSaved] = useRecoilState(dataSavedAtom);
  const menuPermission = useRecoilValue(menuPermissionAtom);
  const createModal = () => {
    setCreateModalOpen(true);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePageLimit = (value: string) => {
    setPageLimit(value);
  };

  const OrganizerDelete = async () => {
    const userToken = getToken();
    const result = checkedElements.join(",");
    await deleteOrganizer(String(userToken), result);

    getData();
    setChechedElements([]);
    setIsOpen(false);
  };

  const OrganizerDetail = async (organizerId: number) => {
    setLoading(true);
    setDataSaved(false);
    const userToken = getToken();
    const optionList = await userDetailOptionList(String(userToken));

    setUserDetailOptions(optionList);
    const response = await getExhibitionOrganizerDetail(
      String(userToken),
      Number(organizerId)
    );

    if (response) {
      setOrganizerDetail([response]);
    }

    setDetailOpen(true);
    setLoading(false);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = companyList?.map((data) => {
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

  const getSearchOption = async () => {
    const userToken = getToken();
    const response = await getOrganizerSearchOptionList(String(userToken));

    setSearchOptions(response);
  };
  const getData = async () => {
    const searchType = searchParams.get("searchType");

    const search = searchParams.get("search")
      ? `&search=${searchParams.get("search")}`
      : "";
    const start = searchParams.get("startDate")
      ? `&startDate=${searchParams.get("startDate")}`
      : "";
    const end = searchParams.get("endDate")
      ? `&endDate=${searchParams.get("endDate")}`
      : "";
    const status = searchParams.get("status")
      ? `&status=${searchParams.get("status")}`
      : "";
    const pageLimitNew = searchParams.get("pageLimit")
      ? searchParams.get("pageLimit")
      : size;

    setPageLimit(pageLimitNew as string);
    const searchUrl = `searchType=${searchType}${search}${start}${end}${status}`;
    const newUrl = decodeURIComponent(searchUrl);
    setNewUrl(newUrl);
    const userToken = getToken();
    const response = await getCompanyList(
      String(userToken),
      newUrl as string,
      Number(page),
      Number(size)
    );

    if (response) {
      const totalPage = Math.ceil(Number(response?.count) / Number(size));
      setTotalPage(totalPage);
      setCompanyList(response?.rows);
    }
  };

  useEffect(() => {
    if (dataSaved === true) {
      //eslint-disable-next-line react-hooks/exhaustive-deps
      getData();
    }
  }, [dataSaved]);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getSearchOption();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, [searchParams, pageLimit]);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div>{loading ? <Loader /> : ""}</div>
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
          <div className="flex w-full  justify-end gap-4">
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
              <>
                <button
                  type="button"
                  className="  rounded-md bg-primary px-5 py-1.5 text-center text-sm font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
                  onClick={createModal}
                >
                  등록
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-rose-400 px-5 py-1.5 text-center text-sm font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
                  onClick={openModal}
                  disabled={checkedElements?.length > 0 ? false : true}
                >
                  삭제
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          {createModalOpen ? <ExhibitionOrganizerCreateModal /> : ""}
          {detailOpen ? <ExhibitionOrganizerDetailModal /> : ""}

          {isOpen ? (
            <CustomModal>
              <h2 className="text-xl text-black">
                ({checkedElements?.length}){" "}
                {checkedElements?.length > 1 ? "Items" : "Item"} will <br /> be
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
                  onClick={OrganizerDelete}
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
              <th className="w-[30px] px-3 py-2 font-medium text-black dark:text-white ">
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
                        checkedElements.length === companyList?.length
                          ? true
                          : false
                      }
                    />
                    <div
                      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                        checkedElements.length === companyList?.length &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm ${
                          checkedElements.length === companyList?.length &&
                          "bg-primary"
                        }`}
                      ></span>
                    </div>
                  </div>
                </label>
              </th>
              <th className="w-[100px] px-4 py-2 font-medium text-black dark:text-white ">
                번호
              </th>

              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                회사 이름
              </th>
            </tr>
          </thead>
          <tbody>
            {companyList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-3  dark:border-strokedark ">
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
                <td className="border-b  border-[#eee] px-4 py-3  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-3  dark:border-strokedark ">
                  <div
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? OrganizerDetail(Number(item?.id))
                        : ""
                    }
                  >
                    <h5 className="cursor-pointer  font-medium hover:text-primary dark:text-white">
                      {item?.name}
                    </h5>
                  </div>
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

export default ExhibitionOrganizerList;
