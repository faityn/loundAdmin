import { dataSavedAtom, detailOpenAtom, tableOrderDetailAtom } from "@/atom";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { formatInTimeZone } from "date-fns-tz";
import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AlertModal from "../Modal/AlertModal";

import { parseISO } from "date-fns";
import getToken from "@/helper/getToken";
import { tableOrderCancel } from "@/hooks/useData";

const TableOrderDetailModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(detailOpenAtom);

  const tableOrderDetail = useRecoilValue(tableOrderDetailAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [tableOrderId, setTableOrderId] = useState(0);
  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setDetailOpen(false);
  };

  const tableOrderDeleteConfirm = async (val: number) => {
    setTableOrderId(val);
    setConfirmModal(true);
  };

  const tableOrderDelete = async () => {
    const userToken = getToken();

    const response = await tableOrderCancel(
      String(userToken),
      Number(tableOrderId)
    );

    if (response?.status) {
      setIsOpen(true);
      setConfirmModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[600px] flex-col text-[#111111]">
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold">1번 테이블 예약 현황</div>
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
                <div className="mb-5"> 현재 예약팀</div>
                {tableOrderDetail?.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full items-center border border-[#EEEEEE] rounded-xl px-5 h-[60px] text-[16px] mb-3"
                  >
                    <div className="min-w-[150px] px-2">
                      {item?.exhibitionConference?.user?.username}
                    </div>
                    <div className="w-full px-2 text-[#666666]">
                      {item?.exhibitionConference?.startDate
                        ? formatInTimeZone(
                            parseISO(item?.exhibitionConference?.startDate),
                            "UTC",
                            "yyyy-MM-dd"
                          )
                        : ""}{" "}
                      ~{" "}
                      {item?.exhibitionConference?.endDate
                        ? formatInTimeZone(
                            parseISO(item?.exhibitionConference?.endDate),
                            "UTC",
                            "yyyy-MM-dd "
                          )
                        : ""}
                    </div>
                    <div className="min-w-[80px] px-2 text-center">
                      <button
                        onClick={() =>
                          tableOrderDeleteConfirm(Number(item?.tableId))
                        }
                        className={`inline-flex rounded-3xl bg-opacity-10 px-3 py-1 text-sm font-medium capitalize border border-red text-red `}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ))}

                <div className="text-center w-full mt-10">
                  <button
                    type="button"
                    onClick={() => setDetailOpen(false)}
                    className="w-[116px] h-[44px] rounded-3xl bg-[#002453] text-white"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmModal ? (
        <AlertModal>
          <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-[16px] text-red">
            <div className="">예약을 정말 취소하시겠습니까?</div>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <button
              onClick={() => setConfirmModal(false)}
              className="rounded-md bg-slate-400 px-4 py-1 text-white"
            >
              취소
            </button>

            <button
              onClick={() => tableOrderDelete()}
              className="rounded-md bg-black px-4 py-1 text-white"
            >
              삭제
            </button>
          </div>
        </AlertModal>
      ) : (
        ""
      )}

      {isOpen ? (
        <AlertModal>
          <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-xl text-green-600">
            <FaRegCheckCircle className="text-xl" />{" "}
            <div className="">Deleted</div>
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

export default TableOrderDetailModal;
