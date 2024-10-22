"use client";
import { conferencesListAtom, totalPageAtom } from "@/atom";
import getToken from "@/helper/getToken";
import { getConferencesList } from "@/hooks/useEvents";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useRecoilState } from "recoil";
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
              <th className="min-w-50px] px-4 py-3 font-medium text-black dark:text-white ">
                #
              </th>

              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                Conference name
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                Exhibition
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                User
              </th>
              <th className="min-w-[150px] max-w-[200px] px-4 py-3 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="max-w-[130px] px-4 py-3 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="max-w-[130px] px-4 py-3 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {conferencesList?.map((item, index) => (
              <tr key={index}>
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
                    {item?.request}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                  >
                    <Link href={`${url}/${item?.conferenceId}`}>
                      <RiSearchLine />
                    </Link>
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

export default ConferencesList;
