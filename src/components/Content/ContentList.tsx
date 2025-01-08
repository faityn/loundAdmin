"use client";
import { FiEdit } from "react-icons/fi";
const ContentList = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white  pb-2.5 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:pb-1">
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
                Title
              </th>

              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                Status
              </th>

              <th className="min-w-[150px] max-w-[200px] px-4 py-3 font-medium text-black dark:text-white">
                Created date
              </th>
              <th className="max-w-[130px] px-4 py-3 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">1</h5>
              </td>

              <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium  dark:text-white">Terms of use</h5>
              </td>

              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success `}
                >
                  Active
                </p>
              </td>

              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  2024-09-18 11:23:56{" "}
                </p>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                >
                  <FiEdit className="text-[17px]" />
                </p>
              </td>
            </tr>

            <tr>
              <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">2</h5>
              </td>

              <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium  dark:text-white">Privacy Policy</h5>
              </td>

              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success `}
                >
                  Active
                </p>
              </td>

              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  2024-09-17 13:35:11
                </p>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                >
                  <FiEdit className="text-[17px]" />
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-5 text-right"></div>
    </div>
  );
};

export default ContentList;
