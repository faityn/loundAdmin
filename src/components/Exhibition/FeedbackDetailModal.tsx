import {
  dataSavedAtom,
  detailOpenAtom,
  feedbackDetailAtom,
  userExhibitionRatingListAtom,
} from "@/atom";
import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AlertModal from "../Modal/AlertModal";

import { format } from "date-fns";
import getStarRating from "../common/getStarRating";

const FeedbackDetailModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(detailOpenAtom);

  const feedbackDetail = useRecoilValue(feedbackDetailAtom);

  const userExhibitionRatingList = useRecoilValue(userExhibitionRatingListAtom);
  const [isOpen, setIsOpen] = useState(false);

  const setDataSaved = useSetRecoilState(dataSavedAtom);

  const closeModal = () => {
    setDataSaved(true);
    setIsOpen(false);
    setDetailOpen(false);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[600px] flex-col text-[#111111]">
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold">행사 평가 상세 보기</div>
              <div></div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setDetailOpen(false)}
                />
              </div>
            </div>
            <div className="">
              <div className={` mx-auto h-[600px]   pt-5 text-left text-sm`}>
                <div>
                  <div className="w-full text-center text-xl font-semibold text-black">
                    행사 이름: {feedbackDetail[0]?.title}
                  </div>

                  <div className="mt-5  grid h-full grid-cols-11 gap-5 text-slate-800 ">
                    <div className="col-span-5">
                      <div className="mb-10 flex flex-col gap-2">
                        <div className="font-semibold text-[16px]">
                          행사 방문자
                        </div>
                        <div>
                          - 사전 등록자: {feedbackDetail[0]?.userCnt} 명
                        </div>
                        <div>
                          - 방문자: {feedbackDetail[0]?.userConfirmCnt} 명
                        </div>
                      </div>

                      <div className="mb-10 flex flex-col gap-2">
                        <div className="font-semibold text-[16px]">
                          방문 평가 관리
                        </div>
                        <div>
                          - 총 평가 수: {feedbackDetail[0]?.ratingCnt}개{" "}
                        </div>
                        <div>
                          - 평균 평가 점수:{" "}
                          {Number(Number(feedbackDetail[0]?.rating).toFixed(1))}
                          점 / 5점
                        </div>
                        <div>
                          - 최고 / 최저 평가 점수:{" "}
                          {feedbackDetail[0]?.ratingMax}점 /{" "}
                          {feedbackDetail[0]?.ratingMin}점
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6  border-l border-dashed border-slate-400 pl-5 ">
                      <div className="mb-4 font-semibold text-[16px]">
                        행사 평가 ({userExhibitionRatingList?.length}건)
                      </div>
                      <div className="h-[450px] overflow-y-auto ">
                        <div className="flex flex-col gap-5 pr-1">
                          {userExhibitionRatingList?.map((item, index) => (
                            <div key={index}>
                              <div className="mb-1">
                                {feedbackDetail[0]?.title}
                              </div>

                              <div className="text-[12px]">
                                {item?.createdAt
                                  ? format(
                                      item?.createdAt as string,
                                      "yyyy-MM-dd"
                                    )
                                  : ""}
                              </div>

                              <div className="my-1 flex w-full text-2xl">
                                {getStarRating(Number(item?.rating))}
                              </div>

                              <div className="h-25 overflow-y-auto rounded-lg border border-slate-500 p-3">
                                {item?.comment}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex w-full justify-end">
                        <button
                          type="button"
                          className=" items-center mt-4 justify-center rounded bg-black px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 "
                        >
                          평가 데이터 다운받기
                        </button>
                      </div>
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

export default FeedbackDetailModal;
