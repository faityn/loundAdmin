import { createExOrganizerOpenAtom, dataSavedAtom } from "@/atom";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

import { SubmitHandler, useForm } from "react-hook-form";
import getToken from "@/helper/getToken";
import { createExhibitionOrganizer } from "@/hooks/useUser";
import AlertModal from "../Modal/AlertModal";
import { LuAlertCircle } from "react-icons/lu";

import Loader from "../common/Loader";
interface FormData {
  companyName: string;
}

const ExhibitionOrganizerCreateModal: React.FC = () => {
  const setCreateOpen = useSetRecoilState(createExOrganizerOpenAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setCreateOpen(false);
  };

  const closeError = () => {
    setCreateError(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const userToken = getToken();
    const name = data.companyName;

    const res = await createExhibitionOrganizer(
      String(userToken),
      String(name)
    );

    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setErrorMessage(String(res?.result));
      setCreateError(true);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[700px] flex-col text-[#111111]">
        {/* <button className="place-self-end text-xl text-white" onClick={onClose}>X</button> */}
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold">행사 주최사 등록</div>
              <div></div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setCreateOpen(false)}
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <div
                className={` mx-auto h-[400px] max-w-[524px] pt-10 text-left text-[16px]`}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5 flex gap-1 items-center">
                    <div className="min-w-[124px] text-[#666666]">
                      회사 이름
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        {...register("companyName", {
                          required: true,
                        })}
                        className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                      />
                      {errors.companyName && (
                        <span className="text-xs font-medium text-red">
                          입력해주세요
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-5">
                    {" "}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-[114px] h-[44px] rounded-3xl bg-[#C6C6C6] px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                      onClick={() => setCreateOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-[116px] rounded-3xl bg-[#002453] px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
                    >
                      수정 확인
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {createError ? (
        <AlertModal>
          <div className="mb-3 mt-2 flex items-center justify-center gap-2 text-xl text-red">
            <LuAlertCircle className="text-xl" />{" "}
            <div className="">Not saved!!</div>
          </div>
          <div className="mb-4">{errorMessage}</div>
          <div className="flex w-full items-center justify-center gap-4">
            <button
              onClick={closeError}
              className="rounded-md bg-black px-4 py-1 text-white"
            >
              확인
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
      {loading ? <Loader /> : ""}
    </div>
  );
};

export default ExhibitionOrganizerCreateModal;
