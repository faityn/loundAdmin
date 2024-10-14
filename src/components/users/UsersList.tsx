"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkedListAtom,
  endDateAtom,
  optionStatusAtom,
  optionTypeAtom,
  searchOptionsAtom,
  searchWordAtom,
  startDateAtom,
  totalPageAtom,
  userAllListAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import { deleteUser, getSearchOptionList, getUsersList } from "@/hooks/useUser";
import CustomModal from "../Modal/Confirm";
import getToken from "@/helper/getToken";

import SearchFields from "../common/SearchFields";
import Loader from "../common/Loader";

interface Props {
  url?: string;
}
const UsersList = ({ url }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const size = 20;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?id=0`;
  const [isOpen, setIsOpen] = useState(false);
  const [userAllList, setUserAllList] = useRecoilState(userAllListAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const setSearchOptions = useSetRecoilState(searchOptionsAtom);
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const optionType = useRecoilValue(optionTypeAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const optionStatus = useRecoilValue(optionStatusAtom);
  const searchWord = useRecoilValue(searchWordAtom);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const search = searchWord ? `&search="${searchWord}"` : "";
    const start = startDate ? `&startDate="${startDate}"` : "";
    const end = endDate ? `&endDate="${endDate}"` : "";
    const status = optionStatus ? `&status="${optionStatus}"` : "";
    const searchUrl = `searchType=${optionType}${search}${start}${end}${status}`;
    const newUrl = decodeURIComponent(searchUrl);
    const userToken = getToken();
    router.push(`/${url}?${newUrl}`);
    const searchValue = [
      {
        searchType: optionType,
        searchWord: searchWord,
        startDate: startDate,
        endDate: endDate,
        status: status,
      },
    ];
    const response = await getUsersList(
      String(userToken),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      searchValue as any,
      Number(page),
      Number(size)
    );
    const totalPage = Math.ceil(Number(response?.count) / Number(size));
    setTotalPage(totalPage);
    setUserAllList(response?.rows);
    //window.location.href = `/${url}?${newUrl}`;
    setLoading(false);
  };

  useEffect(() => {
    getSearchData();
  }, [router]);

  const getSearchData = async () => {
    //const userToken = getToken();
    // const response = await getUsersList(
    //   String(userToken),
    //   Number(page),
    //   Number(size)
    // );
    // const totalPage = Math.ceil(Number(response?.count) / Number(size));
    // setTotalPage(totalPage);
    // setUserAllList(response?.rows);
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

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = userAllList?.map((data) => {
        return data?.userId;
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
    const response = await getSearchOptionList(String(userToken));

    setSearchOptions(response);
  };
  const getData = async () => {
    const searchType = searchParams.get("searchType");
    const searchWord = searchParams.get("search");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status");

    const userToken = getToken();
    const searchValue = [
      {
        searchType: searchType,
        searchWord: searchWord,
        startDate: startDate,
        endDate: endDate,
        status: status,
      },
    ];
    const formdata = new FormData();
    formdata.append("searchType", searchType as string);
    formdata.append("searchWord", searchWord as string);
    formdata.append("startDate", String(startDate));
    formdata.append("endDate", String(endDate));
    formdata.append("status", String(status));

    const response = await getUsersList(
      String(userToken),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      searchValue as any,
      Number(page),
      Number(size)
    );
    const totalPage = Math.ceil(Number(response?.count) / Number(size));
    setTotalPage(totalPage);
    setUserAllList(response?.rows);
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getSearchOption();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div>
        <SearchFields handleSubmit={handleSubmit} />
        {loading ? <Loader /> : ""}
      </div>
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
          <div className="flex w-full  justify-end gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md disabled:bg-slate-300 bg-rose-400 px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
              onClick={openModal}
              disabled={checkedElements?.length > 0 ? false : true}
            >
              Delete
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
                  Delete{" "}
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
                        checkedElements.length === userAllList?.length
                          ? true
                          : false
                      }
                    />
                    <div
                      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                        checkedElements.length === userAllList?.length &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm ${
                          checkedElements.length === userAllList?.length &&
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
                이름
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                아이디
              </th>
              <th className="min-w-[120px] px-4 py-2 font-medium text-black dark:text-white">
                이메일
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                성별
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                가입일
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                최근 로그인
              </th>
              <th className="min-w-[130px] px-4 py-2 font-medium text-black dark:text-white">
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {userAllList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-3  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.userId)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.userId)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(e, (item?.userId as unknown) as string)
                        }
                        checked={checkedElements.includes(
                          (item?.userId as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.userId as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.userId as unknown) as string
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
                  <h5 className="font-medium  dark:text-white">{item?.name}</h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-3  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.userId}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.gender}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.createdAt}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.createdAt}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success `}
                  >
                    Active
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-5 text-right">
        {totalPage > 1 ? (
          <Pagination currentPage={Number(page)} pageUrl={pageUrl} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UsersList;
