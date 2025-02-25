import { communityDetailAtom, communityDetailOpenAtom } from "@/atom";
import React from "react";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { parseISO } from "date-fns";

import { formatInTimeZone } from "date-fns-tz";

const UserReportDetailModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(communityDetailOpenAtom);

  const communityDetail = useRecoilValue(communityDetailAtom);

  const dateShowFormat = (startDate: string, endDate: string) => {
    const check =
      formatInTimeZone(parseISO(startDate), "UTC", "yyyy-MM-dd") ===
      formatInTimeZone(parseISO(endDate), "UTC", "yyyy-MM-dd")
        ? true
        : false;
    if (check) {
      return `${formatInTimeZone(
        parseISO(startDate),
        "UTC",
        "yyyy-MM-dd HH:mm"
      )} - ${formatInTimeZone(parseISO(endDate), "UTC", "HH:mm")}`;
    } else {
      return `${formatInTimeZone(
        parseISO(startDate),
        "UTC",
        "yyyy-MM-dd HH:mm"
      )} - ${formatInTimeZone(parseISO(endDate), "UTC", "yyyy-MM-dd HH:mm")}`;
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[550px] flex-col text-[#111111]">
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold"></div>
              <div className="font-bold">회의 내용</div>
              <div className="">
                <RiCloseFill
                  className="cursor-pointer text-2xl"
                  onClick={() => setDetailOpen(false)}
                />
              </div>
            </div>
            <div className="">
              <div className={` mx-auto h-[400px]   pt-5 text-left text-sm`}>
                <div className="px-8">
                  <form>
                    <div className="mb-5 flex gap-1 items-center">
                      <div className="min-w-[80px] text-[#666666]">
                        회의 제목
                      </div>
                      <div className="w-full">
                        <input
                          type="text"
                          defaultValue={communityDetail?.title}
                          readOnly={true}
                          className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                        />
                      </div>
                    </div>
                    <div className="mb-5 flex gap-1 items-center">
                      <div className="min-w-[80px] text-[#666666]">
                        회의 날짜
                      </div>
                      <div className="w-full">
                        <input
                          type="text"
                          defaultValue={dateShowFormat(
                            String(communityDetail?.conference?.startDate),
                            String(communityDetail?.conference?.endDate)
                          )}
                          readOnly={true}
                          className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                        />
                      </div>
                    </div>

                    <div className="mb-5 flex gap-1 items-center">
                      <div className="min-w-[80px] text-[#666666]">내용</div>
                      <div className="w-full">
                        <textarea
                          defaultValue={
                            communityDetail?.conference?.description
                          }
                          readOnly={true}
                          className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[200px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReportDetailModal;
