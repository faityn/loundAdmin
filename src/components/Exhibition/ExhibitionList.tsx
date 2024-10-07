"use client";
import { useRecoilState } from "recoil";
import { checkedListAtom, exhibitionListAtom, totalPageAtom } from "@/atom";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import { deleteExhibition, getExhibitionList } from "@/hooks/useEvents";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import getToken from "@/helper/getToken";
import DeleteConfirm from "../Modal/DeleteConfirm";

interface Props {
  url?: string;
}
const ExhibitionList = ({ url }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page");
  const size = 20;
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const pageUrl = `${pathname}?id=0`;
  const [isOpen, setIsOpen] = useState(false);
  const [exhibitionList, setExhibitionList] = useRecoilState(
    exhibitionListAtom
  );
  const [checkedElements, setChechedElements] = useRecoilState(checkedListAtom);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const userDelete = async () => {
    const userToken = getToken();

    checkedElements.forEach(async (element) => {
      await deleteExhibition(String(userToken), Number(element));
    });
    getData();
    setChechedElements([]);
    setIsOpen(false);
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

  const getData = async () => {
    const userToken = getToken();
    const response = await getExhibitionList(
      String(userToken),
      Number(page),
      Number(size)
    );

    const totalPage =
      response !== undefined
        ? Math.ceil(Number(response?.count) / Number(size))
        : 1;
    setTotalPage(totalPage);
    setExhibitionList(response?.rows);
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
          <div className="flex w-full  justify-end gap-4">
            <Link
              href={"/exhibition/create"}
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
            >
              Create
            </Link>
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
            <DeleteConfirm>
              <div className="w-full border-l-6 pb-5 border-warning shadow-md bg-warning bg-opacity-[15%] dark:bg-[#1B1B24] dark:bg-opacity-30">
                <div className="flex px-7 pt-6 pb-4">
                  <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                    <svg
                      width="19"
                      height="16"
                      viewBox="0 0 19 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                        fill="#FBBF24"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-full">
                    <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                      Are you sure you want to <br />
                      delete?
                    </h5>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center gap-4">
                  <button
                    onClick={closeModal}
                    className="rounded-md bg-slate-400 px-3 py-1 text-white"
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
              </div>
            </DeleteConfirm>
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
                #
              </th>

              <th className="w-full px-4 py-3 font-medium text-black dark:text-white ">
                Title
              </th>
              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                Image
              </th>
              <th className="min-w-[250px] px-4 py-4 font-medium text-black dark:text-white ">
                Duration
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                Status
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white ">
                Created date
              </th>
              <th className="min-w-[100px] px-4 py-3 font-medium text-black dark:text-white">
                Action
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
                    {index + 1}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  {item?.img && (
                    <img
                      src={`${item?.imgUrl}`}
                      contextMenu="false"
                      alt={item?.title}
                      className="max-w-[140px] max-h-[40px]  "
                    />
                  )}
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <h5 className="font-medium  dark:text-white">
                    {item?.startDate
                      ? format(item?.startDate as string, "yyyy-MM-dd")
                      : ""}{" "}
                    ~{" "}
                    {item?.endDate
                      ? format(item?.endDate as string, "yyyy-MM-dd")
                      : ""}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                  <p
                    className={`inline-flex rounded-full capitalize bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      item?.status === "use"
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }  `}
                  >
                    {item?.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.createdAt
                      ? format(item?.createdAt as string, "yyyy-MM-dd HH:mm:ss")
                      : ""}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                  >
                    <Link href={`${url}/${item?.exhibitionId}`}>
                      <FiEdit className="text-[17px]" />
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

export default ExhibitionList;
