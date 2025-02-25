import { communityDetailOpenAtom, communityManageDetailAtom } from "@/atom";
import React from "react";

import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";

const CommunityManageDetailModal: React.FC = () => {
  const setDetailOpen = useSetRecoilState(communityDetailOpenAtom);

  const communityManageDetail = useRecoilValue(communityManageDetailAtom);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[550px] flex-col text-[#111111]">
        <div className=" rounded-2xl  bg-white  p-5 px-8 text-center">
          <div className="  w-full  ">
            <div className="flex justify-between items-center border-b border-[#EEEEEE] pb-3 h-[55px]">
              <div className="font-bold"></div>
              <div className="font-bold">커뮤니티</div>
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
                      <div className="min-w-[100px] text-[#666666]">
                        커뮤니티 이름
                      </div>
                      <div className="w-full">
                        <input
                          type="text"
                          defaultValue={communityManageDetail?.title}
                          readOnly={true}
                          className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
                        />
                      </div>
                    </div>

                    <div className="mb-5 flex gap-1 items-center">
                      <div className="min-w-[100px] text-[#666666]">
                        커뮤니티 소개
                      </div>
                      <div className="w-full">
                        <textarea
                          defaultValue={communityManageDetail?.description}
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

export default CommunityManageDetailModal;
