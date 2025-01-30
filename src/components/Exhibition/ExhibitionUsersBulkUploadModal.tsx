import {
  dataSavedAtom,
  exhibitionUsersBulkUploadModalAtom,
  fileAtom,
  usersAddExhibitionListAtom,
} from "@/atom";
import React, { useState } from "react";
import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import getToken from "@/helper/getToken";
import AlertModal from "../Modal/AlertModal";

import { AddUsersToExhibitionBulkUpload } from "@/hooks/useEvents";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../common/Loader";

interface FormData {
  excel: string;
}
const ExhibitionUsersBulkUploadModal: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const setBulkModalOpen = useSetRecoilState(
    exhibitionUsersBulkUploadModalAtom
  );
  const usersAddExhibitionList = useRecoilValue(usersAddExhibitionListAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [optionExhibition, setOptionExhibition] = useState("");
  const setDataSaved = useSetRecoilState(dataSavedAtom);
  const [file1, setFile1] = useRecoilState(fileAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setBulkModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange1 = (e: any) => {
    const newFile = e.target.files[0];

    setFile1(newFile);
  };

  const handleStatusOption = (val: string) => {
    setOptionExhibition(val);
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    setLoading(true);
    const token = getToken();

    const formdata = new FormData();
    formdata.append("token", String(token));
    formdata.append("exhibitionId", optionExhibition);
    if (file1 !== null) {
      formdata.append("excel", file1);
    }

    const res = await AddUsersToExhibitionBulkUpload(formdata);
    if (res?.status) {
      setIsOpen(true);
      setLoading(false);
    } else {
      setLoading(false);
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
                  onClick={() => setBulkModalOpen(false)}
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              <div
                className={` mx-auto h-[350px] max-w-[350px]  pt-5 text-left text-sm text-black`}
              >
                <div>
                  <div className="mb-2">등록할 행사를 선택하세요.</div>
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                      <div className=" mt-5 ">
                        <input
                          {...register("excel", {
                            required: true,
                          })}
                          type="file"
                          className="w-full cursor-pointer rounded-md border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                          onChange={handleFileChange1}
                        />
                        {errors.excel && (
                          <span className="font-medium text-red">
                            업로드해주세요
                          </span>
                        )}
                      </div>
                      <div className="flex w-full items-center justify-center gap-4 mt-5">
                        <button
                          onClick={closeModal}
                          className="rounded-md bg-slate-400 px-3 py-1 text-white"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-green-400 px-3 py-1 text-white "
                        >
                          등록
                        </button>
                      </div>
                    </form>
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

export default ExhibitionUsersBulkUploadModal;
