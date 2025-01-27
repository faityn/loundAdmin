"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ActiveRoleAtom,
  checkedListAtom,
  dataSavedAtom,
  detailOpenAtom,
  endDateAtom,
  exhibitionListAtom,
  menuPermissionAtom,
  optionStatusAtom,
  optionTypeAtom,
  searchOptionsAtom,
  searchWordAtom,
  startDateAtom,
  totalPageAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import {
  changeExhibitionStatus,
  deleteExhibition,
  getExhibitionList,
  getExhibitionSearchOptionList,
} from "@/hooks/useEvents";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import getToken from "@/helper/getToken";
import DeleteConfirm from "../Modal/DeleteConfirm";
import SearchFields from "../common/SearchFields";
import Loader from "../common/Loader";
import { FaChevronDown } from "react-icons/fa";
import ExhibitionDetailModal from "./ExhibitionDetailModal";
import { formatInTimeZone } from "date-fns-tz";
import CustomModal from "../Modal/Confirm";

interface Props {
  url?: string;
}
const ExhibitionList = ({ url }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const userActiveRole = useRecoilValue(ActiveRoleAtom);
  const [newUrl, setNewUrl] = useState("");
  const [pageLimit, setPageLimit] = useState("10");
  const [totalCount, setTotalCount] = useState(0);
  const page = searchParams.get("page");
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?${newUrl}&pageLimit=${pageLimit}`;
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [exhibitionList, setExhibitionList] = useRecoilState(
    exhibitionListAtom
  );
  const setSearchOptions = useSetRecoilState(searchOptionsAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const optionStatus = useRecoilValue(optionStatusAtom);
  const searchWord = useRecoilValue(searchWordAtom);
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const optionType = useRecoilValue(optionTypeAtom);
  const dataSaved = useRecoilValue(dataSavedAtom);
  const detailOpen = useRecoilValue(detailOpenAtom);
  const menuPermission = useRecoilValue(menuPermissionAtom);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteAlert(false);
  };

  const userDelete = async () => {
    const userToken = getToken();

    checkedElements.forEach(async (element) => {
      const res = await deleteExhibition(String(userToken), Number(element));
      if (res?.status) {
        getData();
        setChechedElements([]);
        setIsOpen(false);
      } else {
        setDeleteAlertMessage(String(res?.result));
        setDeleteAlert(true);
      }
    });
  };

  const statusChange = async (status: string) => {
    const userToken = getToken();

    checkedElements.forEach(async (element) => {
      await changeExhibitionStatus(
        String(userToken),
        Number(element),
        String(status)
      );
    });
    getData();
    setChechedElements([]);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const option = optionType ? optionType : "all";
    const search = searchWord ? `&search=${searchWord}` : "";
    const start = startDate ? `&startDate=${startDate}` : "";
    const end = endDate ? `&endDate=${endDate}` : "";
    const status = optionStatus ? `&status=${optionStatus}` : "";
    const searchUrl = `searchType=${option}${search}${start}${end}${status}`;
    const newUrl2 = decodeURIComponent(searchUrl);
    const userToken = getToken();
    router.push(`/${url}?${newUrl2}`);

    const response = await getExhibitionList(
      String(userToken),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newUrl as string,
      Number(page),
      Number(size)
    );

    const totalPage = Math.ceil(Number(response?.count) / Number(size));
    setTotalPage(totalPage);
    setExhibitionList(response?.rows);
    setLoading(false);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = exhibitionList?.map((data) => {
        return data?.exhibitionId;
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

  const handlePageLimit = (value: string) => {
    setPageLimit(value);
    router.push(`/${url}?pageLimit=${value}&page=1`);
  };

  const getSearchOption = async () => {
    const userToken = getToken();
    const response = await getExhibitionSearchOptionList(String(userToken));

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
    const response = await getExhibitionList(
      String(userToken),
      newUrl as string,
      Number(page),
      Number(size)
    );

    if (response) {
      setTotalCount(Number(response?.count));
      const totalPage = Math.ceil(Number(response?.count) / Number(size));
      setTotalPage(totalPage);
      setExhibitionList(response?.rows);
    }
  };

  useEffect(() => {
    if (dataSaved === true) {
      //eslint-disable-next-line react-hooks/exhaustive-deps
      getData();
    }
  }, [dataSaved]);

  useEffect(() => {
    getSearchOption();
    getData();
  }, [searchParams, pageLimit]);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div>
        <SearchFields
          handleSubmit={handleSubmit}
          searchType={searchParams.get("searchType") as string}
          search={searchParams.get("search") as string}
          start={searchParams.get("startDate") as string}
          end={searchParams.get("endDate") as string}
          status={searchParams.get("status") as string}
          dateStatus={true}
          dateLabel={"행사 일정"}
        />
        {loading ? <Loader /> : ""}
      </div>
      <div className="grid grid-cols-12 mt-5 pb-4">
        <div className="col-span-5 flex items-center w-full gap-4 max-md:col-span-12 text-slate-700 font-medium">
          전체 {totalCount} 개
        </div>
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
              <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-sm text-black dark:text-white">
                <FaChevronDown />
              </span>
            </div>

            {menuPermission?.status === "write" ? (
              <>
                <Link
                  href={"/exhibition/create"}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
                >
                  등록
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-rose-400 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
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

          {detailOpen ? <ExhibitionDetailModal /> : ""}

          {isOpen ? (
            <DeleteConfirm>
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
                    onClick={userDelete}
                    className="rounded-md bg-red px-3 py-1 text-white "
                  >
                    삭제{" "}
                  </button>
                </div>
              </CustomModal>
            </DeleteConfirm>
          ) : (
            ""
          )}

          {deleteAlert ? (
            <CustomModal>
              <h2 className="text-xl text-black"></h2>
              <div className="mb-2 mt-4 text-sm text-rose-400">
                {deleteAlertMessage}
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="rounded-md bg-slate-500 px-3 py-1 text-white"
                >
                  취소{" "}
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
                        checkedElements.length === exhibitionList?.length
                          ? true
                          : false
                      }
                    />
                    <div
                      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                        checkedElements.length === exhibitionList?.length &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm ${
                          checkedElements.length === exhibitionList?.length &&
                          "bg-primary"
                        }`}
                      ></span>
                    </div>
                  </div>
                </label>
              </th>
              <th className="min-w-50px] px-4 py-3 font-medium text-black dark:text-white ">
                번호
              </th>
              <th className="min-w-[100px] px-4 py-3 font-medium text-black dark:text-white ">
                체크인 번호
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white ">
                회사 이름
              </th>
              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                행사 이름
              </th>
              <th className="min-w-[250px] px-4 py-4 font-medium text-black dark:text-white ">
                행사 일정
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white ">
                행사 등록일
              </th>
              <th className="min-w-[90px] px-4 py-4 font-medium text-black dark:text-white ">
                상태
              </th>

              <th className="w-[60px]  px-4 py-3 font-medium text-black dark:text-white">
                수정
              </th>
              <th className="min-w-[90px]  px-4 py-3 text-center font-medium text-black dark:text-white">
                회의 장소 등록
              </th>
            </tr>
          </thead>
          <tbody>
            {exhibitionList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-4  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.exhibitionId)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.exhibitionId)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(
                            e,
                            (item?.exhibitionId as unknown) as string
                          )
                        }
                        checked={checkedElements.includes(
                          (item?.exhibitionId as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.exhibitionId as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.exhibitionId as unknown) as string
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
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item?.verifyCode}
                  </h5>
                </td>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item?.company?.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <div>
                    <h5 className="cursor-pointer  font-medium  dark:text-white">
                      {item?.title}
                    </h5>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.startDate
                      ? formatInTimeZone(
                          parseISO(item?.startDate),
                          "UTC",
                          "yyyy-MM-dd"
                        )
                      : ""}{" "}
                    ~{" "}
                    {item?.endDate
                      ? formatInTimeZone(
                          parseISO(item?.endDate),
                          "UTC",
                          "yyyy-MM-dd "
                        )
                      : ""}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.createdAt
                      ? format(item?.createdAt as string, "yyyy-MM-dd HH:mm:ss")
                      : ""}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium capitalize ${
                      item?.status === "use"
                        ? "bg-green-500 text-green-500"
                        : "bg-orange-400 text-orange-400"
                    }  `}
                  >
                    {item?.statusText}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  {menuPermission?.status === "write" ? (
                    <>
                      <p
                        className={`inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-xl mr-2 font-medium text-primary `}
                      >
                        <Link href={`${url}/${item?.exhibitionId}`}>
                          <FiEdit className="text-[17px]" />
                        </Link>
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark text-center">
                  {menuPermission?.status === "write" ? (
                    <>
                      <p
                        className={`inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-xl font-medium text-primary `}
                      >
                        <Link href={`${url}/table/${item?.exhibitionId}`}>
                          <img
                            src={`/images/icon/conference_table.svg`}
                            contextMenu="false"
                            alt={item?.title}
                            className="w-[17px] h-[17px] text-primary "
                          />
                        </Link>
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className={`mt-4 flex justify-end gap-3 ${
            userActiveRole === "Super Admin" ? "" : "hidden"
          }`}
        >
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-slate-400 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
            onClick={() => statusChange("disabled")}
            disabled={checkedElements?.length > 0 ? false : true}
          >
            대기
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-green-400 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
            onClick={() => statusChange("use")}
            disabled={checkedElements?.length > 0 ? false : true}
          >
            승인
          </button>
        </div>
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

export default ExhibitionList;
