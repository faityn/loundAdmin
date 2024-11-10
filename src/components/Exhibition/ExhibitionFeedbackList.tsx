"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkedListAtom,
  dataSavedAtom,
  detailOpenAtom,
  endDateAtom,
  feedBackAllListAtom,
  feedbackDetailAtom,
  optionStatusAtom,
  optionTypeAtom,
  searchOptionsAtom,
  searchWordAtom,
  startDateAtom,
  totalPageAtom,

  userExhibitionRatingListAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import {
  deleteUser,
  
} from "@/hooks/useUser";
import CustomModal from "../Modal/Confirm";
import getToken from "@/helper/getToken";

import SearchFields from "../common/SearchFields";
import Loader from "../common/Loader";
import { format } from "date-fns";
import { FaChevronDown } from "react-icons/fa";
import {
  getExhibitionFeedbackList,
  getExhibitionSearchOptionList,
  getFeedbackDetail,
  getFeedbackExhibitionRatingList,
} from "@/hooks/useEvents";
import FeedbackDetailModal from "./FeedbackDetailModal";

interface Props {
  url?: string;
}
const ExhibitionFeedbackList = ({ url }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [newUrl, setNewUrl] = useState("");
  const [pageLimit, setPageLimit] = useState("10");
  const page = searchParams.get("page");
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?${newUrl}&pageLimit=${pageLimit}`;
  const [isOpen, setIsOpen] = useState(false);

  const [feedBackAllList, setFeedBackAllList] =
    useRecoilState(feedBackAllListAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const setSearchOptions = useSetRecoilState(searchOptionsAtom);
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const optionType = useRecoilValue(optionTypeAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const optionStatus = useRecoilValue(optionStatusAtom);
  const searchWord = useRecoilValue(searchWordAtom);
  const setFeedbackDetail = useSetRecoilState(feedbackDetailAtom);
  const setUserExhibitionRatingList = useSetRecoilState(
    userExhibitionRatingListAtom,
  );
  const [detailOpen, setDetailOpen] = useRecoilState(detailOpenAtom);
  

  const [dataSaved, setDataSaved] = useRecoilState(dataSavedAtom);


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePageLimit = (value: string) => {
    setPageLimit(value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const search = searchWord ? `&search=${searchWord}` : "";
    const start = startDate ? `&startDate=${startDate}` : "";
    const end = endDate ? `&endDate=${endDate}` : "";
    const status = optionStatus ? `&status=${optionStatus}` : "";
    const searchUrl = `searchType=${optionType}${search}${start}${end}${status}`;
    const newUrl = decodeURIComponent(searchUrl);
    const userToken = getToken();
    router.push(`/${url}?${newUrl}`);

    const response = await getExhibitionFeedbackList(
      String(userToken),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newUrl as string,
      Number(page),
      Number(size),
    );

    const totalPage = Math.ceil(Number(response?.count) / Number(size));
    setTotalPage(totalPage);
    setFeedBackAllList(response?.rows);
    //window.location.href = `/${url}?${newUrl}`;
    setLoading(false);
  };

  const userDelete = async () => {
    const userToken = getToken();

    checkedElements.forEach(async (element) => {
      await deleteUser(String(userToken), Number(element));
    });
    getData();
    setChechedElements([]);
    setIsOpen(false);
  };

  const FeedbackDetail = async (exhibitionId: number) => {
    setDataSaved(false);
    const userToken = getToken();
    // const optionList = await userDetailOptionList(String(userToken));

    // setUserDetailOptions(optionList);
    const response = await getFeedbackDetail(
      String(userToken),
      Number(exhibitionId),
    );


    if (response?.status) {
      setFeedbackDetail([response?.result]);
    }

    const exhibitionRatingList = await getFeedbackExhibitionRatingList(
      String(userToken),
      Number(exhibitionId),
    );


    setUserExhibitionRatingList(exhibitionRatingList?.rows);
    setDetailOpen(true);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = feedBackAllList?.map((data) => {
        return data?.exhibitionId;
      });
      setChechedElements(() =>
        e.target.checked ? ([...allIds] as unknown as string[]) : [],
      );
    } else {
      setChechedElements((prevChecked) =>
        e.target.checked
          ? [...prevChecked, id]
          : prevChecked.filter((item: string) => item !== id),
      );
    }
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
    const response = await getExhibitionFeedbackList(
      String(userToken),
      newUrl as string,
      Number(page),
      Number(size),
    );

    const totalPage = Math.ceil(Number(response?.count) / Number(size));
    setTotalPage(totalPage);
    setFeedBackAllList(response?.rows);
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
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div>
        <SearchFields
          handleSubmit={handleSubmit}
          searchType={searchParams.get("searchType") as string}
          search={searchParams.get("search") as string}
          start={searchParams.get("startDate") as string}
          end={searchParams.get("endDate") as string}
          status={searchParams.get("status") as string}
          noStatus={true}
        />
        {loading ? <Loader /> : ""}
      </div>
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
          <div className="flex w-full  justify-end gap-4">
            <div className="relative z-20 w-39 bg-transparent dark:bg-form-input ">
              <select
                value={pageLimit}
                onChange={(e) => handlePageLimit(e.target.value)}
                className={`text-md relative z-10 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-rose-400 px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
              onClick={openModal}
              disabled={checkedElements?.length > 0 ? false : true}
            >
              삭제
            </button>
          </div>
          {isOpen ? (
            <CustomModal>
              <h2 className="text-xl text-black">
                ({checkedElements?.length}){" "}
                {checkedElements?.length > 1 ? "Users" : "User"} will <br /> be
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
                  Cancel{" "}
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

          {detailOpen ? <FeedbackDetailModal /> : ""}
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
                        checkedElements.length === feedBackAllList?.length
                          ? true
                          : false
                      }
                    />
                    <div
                      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                        checkedElements.length === feedBackAllList?.length &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm ${
                          checkedElements.length === feedBackAllList?.length &&
                          "bg-primary"
                        }`}
                      ></span>
                    </div>
                  </div>
                </label>
              </th>
              <th className="min-w-50px] px-4 py-2 font-medium text-black dark:text-white ">
                번호
              </th>

              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                회사 이름
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                행사 제목
              </th>

              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                행사 일정
              </th>

              <th className="min-w-[130px] px-4 py-2 font-medium text-black dark:text-white">
                평점 ( 평가 수 )
              </th>
            </tr>
          </thead>
          <tbody>
            {feedBackAllList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-3  dark:border-strokedark ">
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
                            item?.exhibitionId as unknown as string,
                          )
                        }
                        checked={checkedElements.includes(
                          item?.exhibitionId as unknown as string,
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            item?.exhibitionId as unknown as string,
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              item?.exhibitionId as unknown as string,
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
                    onClick={() => FeedbackDetail(Number(item?.exhibitionId))}
                  >
                    <h5 className="cursor-pointer  font-medium hover:text-primary dark:text-white">
                      {item?.admin?.companyName}
                    </h5>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-3  dark:border-strokedark ">
                  <div
                    onClick={() => FeedbackDetail(Number(item?.exhibitionId))}
                  >
                    <h5 className="cursor-pointer  font-medium hover:text-primary dark:text-white">
                      {item?.title}
                    </h5>
                  </div>
                </td>

                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.startDate
                      ? format(item?.startDate as string, "yyyy-MM-dd")
                      : ""}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {Number(Number(item?.rating).toFixed(1))} / 5 (
                    {item?.ratingCount})
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-5 flex justify-between">
        <div>
          {totalPage > 1 ? (
            <Pagination currentPage={Number(page)} pageUrl={pageUrl} />
          ) : (
            ""
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ExhibitionFeedbackList;
