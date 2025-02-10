import { communityUsersAtom, dataSavedAtom, detailOpenAtom } from "@/atom";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AlertModal from "../Modal/AlertModal";

const CommunityUsersModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(detailOpenAtom);

  const communityUsers = useRecoilValue(communityUsersAtom);
  const [isOpen, setIsOpen] = useState(false);
  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setDetailOpen(false);
  };

  

  

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[480px] flex-col text-[#111111]">
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold">커뮤니티 회원 리스트</div>
              <div></div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setDetailOpen(false)}
                />
              </div>
            </div>
            <div className="">
              <div
                className={` mx-auto h-[600px]  overflow-y-auto pt-5 text-left text-sm`}
              >
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="w-[50px] px-4 py-3 font-medium text-black dark:text-white ">
                        #
                      </th>

                      <th className="w-full px-4 py-3 font-medium text-black dark:text-white ">
                        회원 이름
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {communityUsers?.map((item, index) => (
                      <tr key={index}>
                        <td className="border-b  border-[#eee] px-4 py-4  dark:border-strokedark ">
                          <h5 className="font-medium  dark:text-white">
                            {index + 1}
                          </h5>
                        </td>

                        <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark ">
                          <p className="">
                            {item?.member?.name} {item?.member?.company_name}{" "}
                            {item?.member?.position}
                          </p>
                        </td>
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <AlertModal>
          <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-xl text-green-600">
            <FaRegCheckCircle className="text-xl" />{" "}
            <div className="">저장되었습니다</div>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <button
              onClick={closeModal}
              className="rounded-md bg-black px-4 py-1 text-white"
            >
              확인
            </button>
          </div>
        </AlertModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommunityUsersModal;
