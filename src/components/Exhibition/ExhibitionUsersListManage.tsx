"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkedListAtom,
  dataSavedAtom,
  detailOpenAtom,
  endDateAtom,
  exhibitionUserListAtom,
  menuPermissionAtom,
  optionCompanyAtom,
  optionExhibitionAtom,
  optionStatusAtom,
  optionTypeAtom,
  searchOptionsAtom,
  searchWordAtom,
  startDateAtom,
  totalPageAtom,
  userDetailAtom,
  userDetailOptionsAtom,
  userExhibitionListAtom,
  userExhibitionRatingAtom,
  usersAddExhibitionListAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import {
  exhibitionUsersDeleteMulti,
  getSearchOptionList,
  getUsersDetail,
  userDetailOptionList,
  userExhibitionList,
  userExhibitionRating,
} from "@/hooks/useUser";
import CustomModal from "../Modal/Confirm";
import getToken from "@/helper/getToken";

import Loader from "../common/Loader";
import { FaChevronDown } from "react-icons/fa";
import {
  ConfirmUsersToExhibition,
  getUsersAddExhibitionList,
  getUsersListByExhibitions,
} from "@/hooks/useEvents";
import SearchFieldsExhibitionUsers from "../common/SearchFieldsExhibitionUsers";
import DetailModal from "../users/UserDetailModal";

interface Props {
  url?: string;
}
const ExhibitionUsersListManage = ({ url }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [newUrl, setNewUrl] = useState("");
  const [pageLimit, setPageLimit] = useState("20");
  const [totalCount, setTotalCount] = useState(0);
  const page = searchParams.get("page");
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?${newUrl}&pageLimit=${pageLimit}`;
  const [isOpen, setIsOpen] = useState(false);
  const [userAllList, setUserAllList] = useRecoilState(exhibitionUserListAtom);
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const setSearchOptions = useSetRecoilState(searchOptionsAtom);
  const setUserDetailOptions = useSetRecoilState(userDetailOptionsAtom);
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const optionType = useRecoilValue(optionTypeAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const optionStatus = useRecoilValue(optionStatusAtom);
  const searchWord = useRecoilValue(searchWordAtom);
  const optionExhibition = useRecoilValue(optionExhibitionAtom);
  const optionCompany = useRecoilValue(optionCompanyAtom);
  const setUserDetail = useSetRecoilState(userDetailAtom);
  const [detailOpen, setDetailOpen] = useRecoilState(detailOpenAtom);
  const setUserExhibition = useSetRecoilState(userExhibitionListAtom);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState("");
  const setUsersAddExhibitionList = useSetRecoilState(
    usersAddExhibitionListAtom
  );

  const [dataSaved, setDataSaved] = useRecoilState(dataSavedAtom);

  const setUserExhibitionRatingState = useSetRecoilState(
    userExhibitionRatingAtom
  );
  const menuPermission = useRecoilValue(menuPermissionAtom);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteAlert(false);
  };

  const handlePageLimit = (value: string) => {
    setPageLimit(value);
    router.push(`/${url}?pageLimit=${value}&page=1`);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const option = optionType ? optionType : "all";
    const exhibition = optionExhibition
      ? `&exhibitionId=${optionExhibition}`
      : "";
    const company = optionCompany ? `&companyId=${optionCompany}` : "";

    const search = searchWord ? `&search=${searchWord}` : "";
    const start = startDate ? `&startDate=${startDate}` : "";
    const end = endDate ? `&endDate=${endDate}` : "";
    const status = optionStatus ? `&isConfirmed=${optionStatus}` : "";
    const searchUrl = `searchType=${option}${exhibition}${company}${search}${start}${end}${status}`;

    const newUrl = decodeURIComponent(searchUrl);

    router.push(`/${url}?${newUrl}`);

    setLoading(false);
  };

  const userDelete = async () => {
    const userToken = getToken();
    const result = checkedElements.join(",");
    const exhibitionId = searchParams.get("exhibitionId");

    const res = await exhibitionUsersDeleteMulti(
      String(userToken),
      Number(exhibitionId),
      result
    );

    if (res?.status) {
      getData();
      setChechedElements([]);
      setIsOpen(false);
    } else {
      setDeleteAlertMessage("이미 행사에 참가한 회원은 삭제할 수 없습니다.");
      setDeleteAlert(true);
    }
  };

  const UserDetail = async (userId: number) => {
    setDataSaved(false);
    const userToken = getToken();
    const optionList = await userDetailOptionList(String(userToken));

    setUserDetailOptions(optionList);
    const response = await getUsersDetail(String(userToken), Number(userId));
    if (response) {
      setUserDetail([response]);
    }

    const word = "";
    const exhibitionList = await userExhibitionList(
      String(userToken),
      Number(userId),
      word
    );

    if (exhibitionList) {
      setUserExhibition(exhibitionList?.rows);
    }
    const exhibition = "all";
    const exhibitionRating = await userExhibitionRating(
      String(userToken),
      Number(userId),
      exhibition
    );
    setUserExhibitionRatingState(exhibitionRating);
    setDetailOpen(true);
  };
  const ExhibitionUsers = async () => {
    const userToken = getToken();
    const exhibitionList = await getUsersAddExhibitionList(String(userToken));

    setUsersAddExhibitionList(exhibitionList?.exhibitions);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = userAllList?.map((data) => {
        return data?.exhibition?.[0]?.id;
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

  const ExhibitionUsersConfirm = async (status: boolean) => {
    const userToken = getToken();
    const result = checkedElements.join(",");

    const res = await ConfirmUsersToExhibition(
      String(userToken),
      result,
      status
    );

    if (res?.status) {
      getData();
      setChechedElements([]);
    }
  };

  const getSearchOption = async () => {
    const userToken = getToken();
    const response = await getSearchOptionList(String(userToken));

    setSearchOptions(response);
  };

  const getData = async () => {
    const exhibitionId = searchParams.get("exhibitionId")
      ? `&exhibitionId=${searchParams.get("exhibitionId")}`
      : "";

    const companyName = searchParams.get("companyId")
      ? `&companyId=${searchParams.get("companyId")}`
      : "";
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
    const isConfirmed = searchParams.get("isConfirmed")
      ? `&isConfirmed=${searchParams.get("isConfirmed")}`
      : "";
    const pageLimitNew = searchParams.get("pageLimit")
      ? searchParams.get("pageLimit")
      : size;

    setPageLimit(pageLimitNew as string);
    const searchUrl = `searchType=${searchType}${exhibitionId}${companyName}${search}${start}${end}${isConfirmed}`;

    const newUrl = decodeURIComponent(searchUrl);

    setNewUrl(newUrl);
    const userToken = getToken();
    const response = await getUsersListByExhibitions(
      String(userToken),
      newUrl as string,
      Number(page),
      Number(size)
    );
    console.log(response);

    if (response?.rows?.length) {
      setTotalCount(Number(response?.count));
      const totalPage = Math.ceil(Number(response?.count) / Number(size));
      setTotalPage(totalPage);
      setUserAllList(response?.rows);
    } else {
      setTotalPage(0);
      setUserAllList([]);
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
    ExhibitionUsers();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, [searchParams, pageLimit]);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div>
        <SearchFieldsExhibitionUsers
          handleSubmit={handleSubmit}
          exhibitionId={searchParams.get("exhibitionId") as string}
          searchType={searchParams.get("searchType") as string}
          search={searchParams.get("search") as string}
          start={searchParams.get("startDate") as string}
          end={searchParams.get("endDate") as string}
          status={searchParams.get("isConfirmed") as string}
        />
        {loading ? <Loader /> : ""}
      </div>
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex items-center w-full gap-4 max-md:col-span-12 text-slate-700 font-medium">
          전체 {totalCount} 개
        </div>
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
            {menuPermission?.status === "write" ? (
              <>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-rose-400 px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
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
                  확인{" "}
                </button>
              </div>
            </CustomModal>
          ) : (
            ""
          )}
        </div>
      </div>
      {detailOpen ? <DetailModal /> : ""}
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
                소속
              </th>
              <th className="min-w-[120px] px-4 py-2 font-medium text-black dark:text-white">
                직함
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                핸드폰 번호
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                이메일 주소
              </th>
              <th className="min-w-[150px] px-4 py-2 font-medium text-black dark:text-white ">
                참석
              </th>
            </tr>
          </thead>
          <tbody>
            {userAllList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-3  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.exhibition?.[0]?.id)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.exhibition?.[0]?.id)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(
                            e,
                            (item?.exhibition?.[0]?.id as unknown) as string
                          )
                        }
                        checked={checkedElements.includes(
                          (item?.exhibition?.[0]?.id as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.exhibition?.[0]?.id as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.exhibition?.[0]?.id as unknown) as string
                            ) && "bg-primary"
                          }`}
                        ></span>
                      </div>
                    </div>
                  </label>
                </td>
                <td className="border-b  border-[#eee] px-4 py-3  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {Number(page) > 1
                      ? Number(page) * Number(pageLimit) -
                        Number(pageLimit) +
                        index +
                        1
                      : index + 1}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-3  dark:border-strokedark ">
                  <div onClick={() => UserDetail(Number(item?.userId))}>
                    <h5 className="cursor-pointer  font-medium hover:text-primary dark:text-white">
                      {item?.name}
                    </h5>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-3  dark:border-strokedark ">
                  <div onClick={() => UserDetail(Number(item?.userId))}>
                    <h5 className="cursor-pointer  font-medium hover:text-primary dark:text-white">
                      {item?.companyName}
                    </h5>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.position}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.phone}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full ${
                      item?.exhibition?.[0]?.isConfirmed
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }  bg-opacity-10 px-3 py-1 text-sm font-medium `}
                  >
                    {item?.exhibition?.[0]?.isConfirmedText}
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
        {menuPermission?.status === "write" ? (
          <div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-green-400 mr-4 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
              onClick={() => ExhibitionUsersConfirm(true)}
              disabled={checkedElements?.length > 0 ? false : true}
            >
              확인
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-rose-400 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
              onClick={() => ExhibitionUsersConfirm(false)}
              disabled={checkedElements?.length > 0 ? false : true}
            >
              미확인
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ExhibitionUsersListManage;
