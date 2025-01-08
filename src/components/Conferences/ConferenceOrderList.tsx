"use client";
import { FiEdit } from "react-icons/fi";
const ConferencesOrderList = () => {
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
                Name
              </th>
              <th className="min-w-[200px] px-4 py-3 font-medium text-black dark:text-white ">
                Phone
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                Conference
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                Price
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
                <h5 className="font-medium  dark:text-white">Daniel Cook</h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium  dark:text-white">
                  +44 254-761-6843
                </h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <h5 className="font-medium  dark:text-white">Test</h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <h5 className="font-medium  dark:text-white">10$</h5>
              </td>

              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                >
                  <FiEdit className="" />
                </p>
              </td>
            </tr>

            <tr>
              <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">2</h5>
              </td>

              <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium  dark:text-white">Natalie Harris</h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium  dark:text-white">
                  +49 584-501-9302
                </h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <h5 className="font-medium  dark:text-white">Test</h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <h5 className="font-medium  dark:text-white">15$</h5>
              </td>

              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-xl font-medium bg-success text-primary `}
                >
                  <FiEdit className="" />
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

export default ConferencesOrderList;
