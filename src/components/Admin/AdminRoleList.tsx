"use client";

import Link from "next/link";
import { FiEdit } from "react-icons/fi";

const AdminRoleList = () => {

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
              Name
            </th>
            <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white ">
              Role
            </th>
            <th className="min-w-[120px] px-4 py-3 font-medium text-black dark:text-white">
              Permission
            </th>
           
           
          </tr>
        </thead>
        <tbody>
          
            <tr >
              <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">
                  1
                </h5>
              </td>
              
              <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium  dark:text-white">
                  Admin
                </h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p className="text-black dark:text-white">admin</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                
                <Link
                  href={`/admin/role/edit?id=1`}
                  className="text-primary hover:text-black dark:text-white"
                >
                  <FiEdit className="text-[17px]" />
                </Link>
              </td>
             
            </tr>
            <tr >
              <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">
                  2
                </h5>
              </td>
              
              <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                <h5 className="font-medium  dark:text-white">
                  Moderator
                </h5>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                <p className="text-black dark:text-white">moderator</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
              <Link
                  href={`/admin/role/edit?id=2`}
                  className="text-primary hover:text-black dark:text-white"
                >
                  <FiEdit className="text-[17px]" />
                </Link>
              </td>
             
            </tr>
        </tbody>
      </table>
      </div>
      <div className="my-5 text-right">
        
      </div>
    </div>
  );
};

export default AdminRoleList;
