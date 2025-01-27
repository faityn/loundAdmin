"use client";
import {
  checkedListAtom,
  communityManageListAtom,
  communityUsersAtom,
  dataSavedAtom,
  detailOpenAtom,
  menuPermissionAtom,
  totalPageAtom,
} from "@/atom";
import getToken from "@/helper/getToken";
import {
  getCommunityUsersList,
  getConferenceCommunityManageList,
} from "@/hooks/useEvents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Pagination from "../Pagination/Pagination";

import CommunityUsersModal from "./CommunityUsersModal";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  url?: string;
}
const CommunityListManage = ({ url }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pageLimit, setPageLimit] = useState("10");
  const [totalCount, setTotalCount] = useState(0);
  const page = searchParams.get("page");
  const size = pageLimit;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?id=0`;
  const [communityManageList, setCommunityManageList] = useRecoilState(
    communityManageListAtom
  );
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const [dataSaved, setDataSaved] = useRecoilState(dataSavedAtom);
  const menuPermission = useRecoilValue(menuPermissionAtom);
  const setCommunityUsers = useSetRecoilState(communityUsersAtom);
  const [detailOpen, setDetailOpen] = useRecoilState(detailOpenAtom);

  const handlePageLimit = (value: string) => {
    setPageLimit(value);
    router.push(`/${url}?pageLimit=${value}&page=1`);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = communityManageList?.map((data) => {
        return data?.communityId;
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

  const communityUsersModal = async (communityId: number) => {
    setDataSaved(false);
    const userToken = getToken();

    const response = await getCommunityUsersList(
      String(userToken),
      Number(communityId)
    );

    if (response) {
      setCommunityUsers(response);
    }
    setDetailOpen(true);
  };

  const getData = async () => {
    const userToken = getToken();
    const response = await getConferenceCommunityManageList(
      String(userToken),
      Number(page),
      Number(size)
    );

    if (response?.rows?.length > 0) {
      setTotalCount(Number(response?.count));
      setTotalPage(Number(response?.page));
      setCommunityManageList(response?.rows);
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
    getData();
  }, []);
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
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
          </div>
          <div className="flex w-full  justify-end gap-4">
            {detailOpen ? <CommunityUsersModal /> : ""}
          </div>
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
                        checkedElements.length === communityManageList?.length
                          ? true
                          : false
                      }
                    />
                    <div
                      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                        checkedElements.length ===
                          communityManageList?.length &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm ${
                          checkedElements.length ===
                            communityManageList?.length && "bg-primary"
                        }`}
                      ></span>
                    </div>
                  </div>
                </label>
              </th>
              <th className="min-w-50px] px-4 py-3 font-medium text-black dark:text-white ">
                #
              </th>

              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                커뮤니티 이름
              </th>

              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                커뮤니티 개최자 이름
              </th>
              <th className="min-w-[150px] max-w-[200px] px-4 py-3 font-medium text-black dark:text-white">
                커뮤니티 회원
              </th>
            </tr>
          </thead>
          <tbody>
            {communityManageList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-4  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.communityId)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.communityId)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(
                            e,
                            (item?.communityId as unknown) as string
                          )
                        }
                        checked={checkedElements.includes(
                          (item?.communityId as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.communityId as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.communityId as unknown) as string
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
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? communityUsersModal(Number(item?.communityId))
                        : ""
                    }
                  >
                    <p className="font-medium cursor-pointer">{item?.title}</p>
                  </div>
                </td>

                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? communityUsersModal(Number(item?.communityId))
                        : ""
                    }
                  >
                    <p className="cursor-pointer">{item?.user?.name}</p>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div
                    onClick={() =>
                      menuPermission?.status === "write"
                        ? communityUsersModal(Number(item?.communityId))
                        : ""
                    }
                  >
                    <p className="cursor-pointer">{item?.memberCount}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end gap-3"></div>
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

export default CommunityListManage;
