import { dataSavedAtom, detailOpenAtom, exhibitionDetailAtom } from "@/atom";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import getToken from "@/helper/getToken";
import AlertModal from "../Modal/AlertModal";

import TextEditor2 from "../Editor/TextEditor2";
import { changeExhibitionStatus } from "@/hooks/useEvents";

const ExhibitionDetailModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(detailOpenAtom);

  const exhibitionDetail = useRecoilValue(exhibitionDetailAtom);
  const [isOpen, setIsOpen] = useState(false);

  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setDetailOpen(false);
  };

  const statusChange = async (status: string) => {
    const userToken = getToken();

    await changeExhibitionStatus(
      String(userToken),
      Number(exhibitionDetail[0]?.exhibitionId),
      String(status)
    );
    setIsOpen(true);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[600px] flex-col text-[#111111]">
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold">행사 승인</div>
              <div></div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setDetailOpen(false)}
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <div
                className={` mx-auto h-[650px] max-w-[400px]  pt-10 text-left text-[16px]`}
              >
                <div>
                  <div className="text-xl font-semibold text-black">
                    {exhibitionDetail[0]?.title}
                  </div>

                  <div className="rounded-lg ">
                    {exhibitionDetail[0]?.img && (
                      <img
                        src={`${exhibitionDetail[0]?.imgUrl}`}
                        contextMenu="false"
                        alt={exhibitionDetail[0]?.title}
                        className="max-h-[200px] w-full max-w-[500px] rounded-lg bg-cover object-cover"
                      />
                    )}
                  </div>
                  <div className="mt-5">
                    <TextEditor2
                      initialValue=""
                      contentValue={exhibitionDetail[0]?.description}
                    />
                  </div>
                  <div className="mt-5">
                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-[114px] h-[44px] rounded-3xl bg-[#C6C6C6] px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90"
                        onClick={() => statusChange("disabled")}
                      >
                        대기
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-[116px] rounded-3xl bg-[#002453] px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                        onClick={() => statusChange("use")}
                      >
                        승인
                      </button>
                    </div>
                  </div>
                </div>
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

export default ExhibitionDetailModal;
