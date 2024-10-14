"use client";
import { useRecoilState } from "recoil";
import { adminAllListAtom, totalPageAtom } from "@/atom";
import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import { getAdminList } from "@/hooks/useAdmin";
import getToken from "@/helper/getToken";
const AdminList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?id=0`;

  const [userAllList, setUserAllList] = useRecoilState(adminAllListAtom);

  useEffect(() => {
    const userToken = getToken();
    const getData = async () => {
      const response = await getAdminList(userToken as string);
      setTotalPage(response?.pages);
      setUserAllList(response?.users);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-50px] px-4 py-3 font-medium text-black dark:text-white ">
                #
              </th>
              <th className="min-w-[100px] px-4 py-3 font-medium text-black dark:text-white ">
                Image
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white ">
                Username
              </th>
              <th className="min-w-[120px] px-4 py-3 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
                Phone
              </th>
              <th className="min-w-[130px] px-4 py-3 font-medium text-black dark:text-white">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {userAllList?.map((item, index) => (
              <tr key={index}>
                <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  {item?.image && (
                    <img
                      src={`${item?.image}`}
                      contextMenu="false"
                      alt={item?.username}
                      className="max-w-[140px] max-h-[40px]  "
                    />
                  )}
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.username}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.phone}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.role}</p>
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

export default AdminList;
