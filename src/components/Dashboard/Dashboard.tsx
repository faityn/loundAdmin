"use client";

import { TiStarFullOutline } from "react-icons/ti";

const Dashboard = () => {
  

  return (
    <div className="grid grid-cols-12 gap-6 pb-4">
        <div className="col-span-6 max-lg:col-span-12">
            <div className="rounded-lg border border-stroke bg-white py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
     
                <div className=" font-semibold mb-4 text-black dark:text-white">회원현황</div>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                        <div className="flex gap-5 items-center w-full ">
                            <div className="">
                                <img
                                    src={`/images/icon/d1.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full  bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">회원수</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">12,458</span> <span className="text-[#666666] text-[18px]" >명</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d2.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">신규가입</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">245</span> <span className="text-[#666666] text-[18px]" >명</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d3.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">행사 주최사</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">12</span> <span className="text-[#666666] text-[18px]" >개</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d4.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">활성 회원 비율</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">68.5</span> <span className="text-[#666666] text-[18px]" >%</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8]  rounded-xl">
                        <div className="flex w-full h-full">
                            <div className={`w-[40%] bg-[#4A90E2] rounded-l-xl flex flex-col items-center justify-center text-[12px] text-white`}>
                                <div>남자</div>
                                <div>40%</div>
                            </div>
                            <div className={`w-[60%] bg-[#FF6B6B] rounded-r-xl flex flex-col items-center justify-center text-[12px] text-white`}>
                                <div>여자</div>
                                <div>60%</div></div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] h-[60px] rounded-xl">
                        <div className="flex w-full h-full">
                            <div className={`w-[30%] bg-[#4A90E2] rounded-l-xl flex flex-col items-center justify-center text-[12px] text-white`}>
                                <div>20대</div>
                                <div>30%</div>
                            </div>
                            <div className={`w-[30%] bg-[#4ECDC4] flex flex-col items-center justify-center text-[12px] text-white`}>
                                <div>30대</div>
                                <div>30%</div>
                            </div>
                            <div className={`w-[20%] bg-[#45B7D1] flex flex-col items-center justify-center text-[12px] text-white`}>
                                <div>40대</div>
                                <div>20%</div>
                            </div>
                            <div className={`w-[20%] bg-[#FF6B6B] rounded-r-xl flex flex-col items-center justify-center text-[12px] text-white`}>
                                <div>50대+</div>
                                <div>20%</div></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div className="col-span-6 max-lg:col-span-12">
            <div className="rounded-lg border border-stroke bg-white py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
     
                <div className=" font-semibold mb-4 text-black dark:text-white">행사 현황</div>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                        <div className="flex gap-5 items-center w-full ">
                            <div className="">
                                <img
                                    src={`/images/icon/d5.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full  bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">등록된 행사</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">324</span> <span className="text-[#666666] text-[18px]" >개</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d6.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">승인 대기</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">28</span> <span className="text-[#666666] text-[18px]" >개</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d7.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">행사 참가자 수</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">4,521</span> <span className="text-[#666666] text-[18px]" >명</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d8.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">참석율</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">89.2</span> <span className="text-[#666666] text-[18px]" >%</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 bg-[#F8F8F8] h-[60px] px-5 rounded-xl">
                        <div className="flex w-full h-full items-center ">
                            <div className="w-full flex gap-x-4 items-center h-full ">
                                <div className="text-[#111111] text-[15px] ">피드백 평균  </div> 
                                <div className="flex h-full items-center"> <TiStarFullOutline className="text-[#FA423A] text-xl" />  <TiStarFullOutline className="text-[#FA423A] text-xl" /> <TiStarFullOutline className="text-[#FA423A] text-xl" /> <TiStarFullOutline className="text-[#DBDBDB] text-xl" /> <TiStarFullOutline className="text-[#DBDBDB] text-xl" /></div>
                            </div>
                            <div className="w-full font-bold flex justify-end"><div><span className="text-[#17B0D9]">4.2</span>  <span className="text-[#111111]">/ 5.0 </span></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-span-6 max-lg:col-span-12">
            <div className="rounded-lg border border-stroke bg-white py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
     
                <div className=" font-semibold mb-4 text-black dark:text-white">회의 현황</div>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                        <div className="flex gap-5 items-center w-full ">
                            <div className="">
                                <img
                                    src={`/images/icon/d9.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full  bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">회의 신청</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">156</span> <span className="text-[#666666] text-[18px]" >건</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d10.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">승인율</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">92.3</span> <span className="text-[#666666] text-[18px]" >%</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d11.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">테이블 예약</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">89</span> <span className="text-[#666666] text-[18px]" >건</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d12.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">활용률</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">78.5</span> <span className="text-[#666666] text-[18px]" >%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-span-6 max-lg:col-span-12">
            <div className="rounded-lg border border-stroke bg-white py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
     
                <div className=" font-semibold mb-4 text-black dark:text-white">커뮤니티 현황</div>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                        <div className="flex gap-5 items-center w-full ">
                            <div className="">
                                <img
                                    src={`/images/icon/d13.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full  bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">회원수</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">45</span> <span className="text-[#666666] text-[18px]" >개</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d14.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">최근 개설 커뮤니티</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">12</span> <span className="text-[#666666] text-[18px]" >개</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d15.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">평균 멤버 수</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">128</span> <span className="text-[#666666] text-[18px]" >개</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                        <div className="flex gap-5 items-center w-full">
                            <div className="">
                                <img
                                    src={`/images/icon/d16.svg`}
                                    contextMenu="false"
                                    alt={''}
                                    className=" w-full bg-cover object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-[#111111] text-[15px] mb-2">활용량 (게시글/댓글)</div>
                                <div ><span className="text-[#17B0D9] font-semibold text-[24px]">12</span> <span className="text-[#666666] text-[18px]" >개</span> / <span className="text-[#17B0D9] font-semibold text-[24px]">30</span> <span className="text-[#666666] text-[18px]" >개</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    
  );
};

export default Dashboard;
