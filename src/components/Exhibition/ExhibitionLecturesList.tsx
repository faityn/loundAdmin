"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkedListAtom,
  endDateAtom,
  exhibitionLecturesAtom,
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
import CustomModal from "../Modal/Confirm";
import {
  deleteExhibitionLectures,
  getExhibitionLecturesList,
} from "@/hooks/useEvents";
import { FiEdit } from "react-icons/fi";
import getToken from "@/helper/getToken";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { formatInTimeZone } from "date-fns-tz";
import SearchFields from "../common/SearchFields";
import { getSearchOptionList } from "@/hooks/useUser";
import Loader from "../common/Loader";

interface Props {
  url?: string;
}
const ExhibitionLecturesList = ({ url }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const [pageLimit, setPageLimit] = useState("10");
  const [newUrl, setNewUrl] = useState("");
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?${newUrl}&pageLimit=${pageLimit}`;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemsList, setItemsList] = useRecoilState(exhibitionLecturesAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);

  const menuPermission = useRecoilValue(menuPermissionAtom);
  const searchWord = useRecoilValue(searchWordAtom);
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const optionStatus = useRecoilValue(optionStatusAtom);
  const optionType = useRecoilValue(optionTypeAtom);
  const setSearchOptions = useSetRecoilState(searchOptionsAtom);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const userDelete = async () => {
    const userToken = getToken();

    checkedElements.forEach(async (element) => {
      await deleteExhibitionLectures(String(userToken), Number(element));
    });
    getData();
    setChechedElements([]);
    setIsOpen(false);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = itemsList?.map((data) => {
        return data?.lectureId;
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

  const handleSubmit = async () => {
    setLoading(true);

    const search = searchWord ? `&search=${searchWord}` : "";
    const start = startDate ? `&startDate=${startDate}` : "";
    const end = endDate ? `&endDate=${endDate}` : "";
    const status = optionStatus ? `&status=${optionStatus}` : "";
    const searchUrl = `searchType=${optionType}${search}${start}${end}${status}`;
    const newUrl = decodeURIComponent(searchUrl);

    router.push(`/${url}?${newUrl}`);

    setLoading(false);
  };

  const getSearchOption = async () => {
    const userToken = getToken();

    const response = await getSearchOptionList(String(userToken));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const search: any = [
      { value: "all", text: "전체" },
      { value: "exhibitionName", text: "행사 이름" },
      { value: "lectureName", text: "강연 제목" },
      { value: "companyName", text: "소속" },
    ];
    const searchOption = {
      search: search,
      status: response?.status,
    };
    setSearchOptions(searchOption);
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
    const response = await getExhibitionLecturesList(
      String(userToken),
      newUrl as string,
      Number(page),
      Number(size)
    );

    setTotalPage(response?.pages);
    setItemsList(response?.rows);
  };
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
          startLabel="강연 시작일"
          endLabel="강연 종료일"
          status={searchParams.get("status") as string}
          noStatus={true}
          dateStatus={true}
          dateLabel={"강연 날짜"}
        />
        {loading ? <Loader /> : ""}
      </div>
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
          {menuPermission?.status === "write" ? (
            <div className="flex w-full  justify-end gap-4">
              <Link
                href={"/exhibition/lectures/create"}
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
              <div className="mb-2  text-lg text-black">
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
              <th className="min-w-[60px] px-4 py-3 font-medium text-black dark:text-white ">
                번호
              </th>

              <th className="min-w-[300px] w-[400px] px-4 py-3 font-medium text-black dark:text-white ">
                강연 제목
              </th>
              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                행사 이름
              </th>
              <th className="min-w-[300px] w-[320px] px-4 py-3 font-medium text-black dark:text-white ">
                강연 일정
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white ">
                등록 날짜
              </th>
              <th className="min-w-[100px] px-4 py-3 font-medium text-black dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {itemsList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-4  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.lectureId)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.lectureId)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(e, (item?.lectureId as unknown) as string)
                        }
                        checked={checkedElements.includes(
                          (item?.lectureId as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.lectureId as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.lectureId as unknown) as string
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
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.exhibition?.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  {item?.startDate
                    ? formatInTimeZone(
                        parseISO(item?.startDate),
                        "UTC",
                        "yyyy-MM-dd HH:mm"
                      )
                    : ""}{" "}
                  ~{" "}
                  {item?.endDate
                    ? formatInTimeZone(
                        parseISO(item?.endDate),
                        "UTC",
                        "yyyy-MM-dd HH:mm"
                      )
                    : ""}
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.createdAt
                      ? format(item?.createdAt as string, "yyyy-MM-dd HH:mm")
                      : ""}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  {menuPermission?.status === "write" ? (
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                    >
                      <Link href={`${url}/${item?.lectureId}`}>
                        <FiEdit className="text-[17px]" />
                      </Link>
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

export default ExhibitionLecturesList;
