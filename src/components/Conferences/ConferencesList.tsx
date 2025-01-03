"use client";
import {
  checkedListAtom,
  conferencesListAtom,
  dataSavedAtom,
  menuPermissionAtom,
  totalPageAtom,
} from "@/atom";
import getToken from "@/helper/getToken";
import { changeConferenceStatus, getConferencesList } from "@/hooks/useEvents";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
import Pagination from "../Pagination/Pagination";

interface Props {
  url?: string;
}
const ConferencesList = ({ url }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const size = 20;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?id=0`;
  const [conferencesList, setConferencesList] = useRecoilState(
    conferencesListAtom
  );
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const [dataSaved, setDataSaved] = useRecoilState(dataSavedAtom);
  const menuPermission = useRecoilValue(menuPermissionAtom);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "all") {
      const allIds = conferencesList?.map((data) => {
        return data?.conferenceId;
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

  const statusChange = async (status: string) => {
    const userToken = getToken();

    checkedElements?.forEach(async (element) => {
      await changeConferenceStatus(
        String(userToken),
        Number(element),
        String(status)
      );
    });
    getData();
    setChechedElements([]);
    setDataSaved(true);
    //setIsOpen(false);
  };

  const getData = async () => {
    const userToken = getToken();
    const response = await getConferencesList(
      String(userToken),
      Number(page),
      Number(size)
    );

    const totalPage =
      response !== undefined
        ? Math.ceil(Number(response?.count) / Number(size))
        : 1;
    setTotalPage(totalPage);
    setConferencesList(response?.rows);
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
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="grid grid-cols-12  pb-4">
        <div className="col-span-5 flex  w-full  gap-4 max-md:col-span-12 max-xsm:flex-col "></div>
        <div className="col-span-7 w-full  text-right max-md:col-span-12 ">
          <div className="flex w-full  justify-end gap-4"></div>
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
                        checkedElements.length === conferencesList?.length
                          ? true
                          : false
                      }
                    />
                    <div
                      className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                        checkedElements.length === conferencesList?.length &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm ${
                          checkedElements.length === conferencesList?.length &&
                          "bg-primary"
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
                회의 제목
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                행사명
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                회의 개최자
              </th>
              <th className="min-w-[150px] max-w-[200px] px-4 py-3 font-medium text-black dark:text-white">
                날짜
              </th>
              <th className="max-w-[130px] px-4 py-3 font-medium text-black dark:text-white">
                상태
              </th>
              <th className="max-w-[130px] px-4 py-3 font-medium text-black dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {conferencesList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-3 py-4  dark:border-strokedark ">
                  <label
                    htmlFor={String(item?.conferenceId)}
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={String(item?.conferenceId)}
                        className="sr-only"
                        onChange={(e) =>
                          handleCheck(
                            e,
                            (item?.conferenceId as unknown) as string
                          )
                        }
                        checked={checkedElements.includes(
                          (item?.conferenceId as unknown) as string
                        )}
                      />
                      <div
                        className={`mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          checkedElements.includes(
                            (item?.conferenceId as unknown) as string
                          ) && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm ${
                            checkedElements.includes(
                              (item?.conferenceId as unknown) as string
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
                  <p className="text-black dark:text-white">
                    {item?.exhibition?.title}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.user?.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.startDate
                      ? format(item?.startDate as string, "yyyy-MM-dd HH:mm")
                      : ""}{" "}
                    ~{" "}
                    {item?.endDate
                      ? format(item?.endDate as string, "yyyy-MM-dd HH:mm")
                      : ""}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full capitalize bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      item?.request === "approved"
                        ? "bg-success text-success"
                        : item?.request === "register"
                        ? "bg-warning text-warning"
                        : "bg-danger text-danger"
                    }  `}
                  >
                    {item?.request === "approved"
                      ? "승인"
                      : item?.request === "register"
                      ? "대기"
                      : "생성 불가"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  {menuPermission?.status === "write" ? (
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                    >
                      <Link href={`${url}/${item?.conferenceId}`}>
                        <RiSearchLine />
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
        <div className="mt-4 flex justify-end gap-3">
          {menuPermission?.status === "write" ? (
            <>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-slate-400 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
                onClick={() => statusChange("register")}
                disabled={checkedElements?.length > 0 ? false : true}
              >
                대기
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-green-400 px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 disabled:bg-slate-300"
                onClick={() => statusChange("approved")}
                disabled={checkedElements?.length > 0 ? false : true}
              >
                승인
              </button>
            </>
          ) : (
            ""
          )}
        </div>
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

export default ConferencesList;
