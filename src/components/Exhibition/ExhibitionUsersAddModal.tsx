import {
  checkedListAtom,
  dataSavedAtom,
  exhibitionUsersAddModalAtom,
  usersAddExhibitionListAtom,
} from "@/atom";
import React, { useState } from "react";
import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import getToken from "@/helper/getToken";
import AlertModal from "../Modal/AlertModal";

import { AddUsersToExhibition } from "@/hooks/useEvents";

const ExhibitionUsersAddModal: React.FC = () => {
  const setExhibitionUsersAddModal = useSetRecoilState(
    exhibitionUsersAddModalAtom
  );
  const usersAddExhibitionList = useRecoilValue(usersAddExhibitionListAtom);
  const checkedElements = useRecoilValue(checkedListAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [optionExhibition, setOptionExhibition] = useState("");
  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setExhibitionUsersAddModal(false);
  };

  const handleStatusOption = (val: string) => {
   
    
    setOptionExhibition(val);
  };

  const usersAdd = async () => {
    const userToken = getToken();
    const result = checkedElements.join(",");

    
    const res = await AddUsersToExhibition(
      String(userToken),
      Number(optionExhibition),
      result
    );

    if (res?.status) {
      setIsOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[500px] flex-col ">
        <div className=" rounded-lg border border-slate-600 bg-white  p-5 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between border-b pb-3">
              <div className="">참가자 등록</div>
              <div></div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setExhibitionUsersAddModal(false)}
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <div
                className={` mx-auto h-[350px] max-w-[350px]  pt-5 text-left text-sm text-black`}
              >
                <div className="mb-5 ">
                  선택한 등록 인원: {checkedElements?.length}명
                </div>
                <div>
                  <div className="mb-2">등록할 행사를 선택하세요.</div>
                  <div>
                    <div className="w-full relative z-20 bg-transparent dark:bg-form-input ">
                      <select
                        defaultValue={optionExhibition}
                        onChange={(e) => handleStatusOption(e.target.value)}
                        className={`relative z-10 text-md w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                      >
                        <option value="" className="text-black ">
                          선택
                        </option>
                        {usersAddExhibitionList?.map((e, i) => (
                          <option
                            key={i}
                            value={String(e?.exhibitionId)}
                            className="text-black dark:text-white"
                          >
                            {e?.title}
                          </option>
                        ))}
                      </select>

                      <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-black dark:text-white">
                        <FaChevronDown />
                      </span>
                    </div>

                    <div className="flex w-full items-center justify-center gap-4 mt-5">
                      <button
                        onClick={closeModal}
                        className="rounded-md bg-slate-400 px-3 py-1 text-white"
                      >
                        취소
                      </button>
                      <button
                        onClick={usersAdd}
                        className="rounded-md bg-green-400 px-3 py-1 text-white "
                      >
                        등록
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
          <div className="mb-3 mt-2 flex z-50 items-center justify-center gap-2 text-xl text-green-600">
            <FaRegCheckCircle className="text-xl" />{" "}
            <div className="">Saved successfully</div>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <button
              onClick={closeModal}
              className="rounded-md bg-black px-4 py-1 text-white"
            >
              Ok
            </button>
          </div>
        </AlertModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExhibitionUsersAddModal;
