import { communityUsersAtom, dataSavedAtom, detailOpenAtom } from "@/atom";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AlertModal from "../Modal/AlertModal";
import { FaUserLarge } from "react-icons/fa6";

const CommunityManageUserListModal: React.FC = () => {
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
              <div className="font-bold">회의 참가자 리스트</div>
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
                className={` mx-auto h-[500px]  overflow-y-auto pt-5 text-left text-sm`}
              >
                <table className="w-full table-auto text-sm">
                  <tbody>
                    {communityUsers?.map((item, index) => (
                      <tr key={index}>
                        <td className=" px-4 py-4 w-[80px]  ">
                          <div className="h-16 w-16 rounded-full  bg-slate-400">
                            <label htmlFor="doc">
                              <div className="flex h-full items-center justify-center rounded-full">
                                {item?.member?.imgUrl ? (
                                  <img
                                    src={`${item?.member?.imgUrl}`}
                                    contextMenu="false"
                                    className="h-full max-w-16 rounded-full object-cover"
                                  />
                                ) : (
                                  <FaUserLarge className="text-[30px] text-white" />
                                )}
                              </div>
                            </label>
                          </div>
                        </td>

                        <td className=" px-4 py-4   ">
                          <p className="text-[18px]">
                            {item?.member?.company_name} {item?.member?.name}{" "}
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

export default CommunityManageUserListModal;
