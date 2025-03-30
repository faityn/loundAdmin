"use client";

import {
  communityCurrentSituationAtom,
  conferenceCurrentSituationAtom,
  exhibitionCurrentSituationAtom,
  userCurrentSituationAtom,
} from "@/atom";
import getToken from "@/helper/getToken";
import {
  getCommunityCurrentSituation,
  getConferenceCurrentSituation,
  getExhibitionCurrentSituation,
  getUserCurrentSituation,
} from "@/hooks/useData";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useRecoilState } from "recoil";
import getStarRating2 from "../common/getStarRating2";
import {  Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, TooltipProps } from "recharts";


const Dashboard = () => {
  const [userCurrentSituation, setUserCurrentSituation] = useRecoilState(
    userCurrentSituationAtom
  );
  const [
    exhibitionCurrentSituation,
    setExhibitionCurrentSituation,
  ] = useRecoilState(exhibitionCurrentSituationAtom);
  const [
    conferenceCurrentSituation,
    setConferenceCurrentSituation,
  ] = useRecoilState(conferenceCurrentSituationAtom);
  const [
    communityCurrentSituation,
    setCommunityCurrentSituation,
  ] = useRecoilState(communityCurrentSituationAtom);
  const [filterDay, setFilterDay] = useState("30days");
  
  const selectDay = (day: string) => {
    setFilterDay(day);
  };

  const starRate = (avg: string) => {
    const num = Number(avg);
    return getStarRating2(Number(num?.toFixed()));
  };

  const data = [
    { name: "", value1: Number(userCurrentSituation?.maleRate?.toFixed(1)), value2: Number(userCurrentSituation?.femaleRate?.toFixed(1)) },
  ];

  const data2 = [
    { name: "", value1: Number(userCurrentSituation?.age20sRate?.toFixed(1)), value2: Number(userCurrentSituation?.age30sRate?.toFixed(1)), value3: Number(userCurrentSituation?.age40sRate?.toFixed(1)), value4: Number(userCurrentSituation?.age50PlusRate?.toFixed(1)) },
  ];

  const LABELS1: Record<string, string> = {
    value1: "남자",
    value2: "여자",
  
  };

  const LABELS2: Record<string, string> = {
    value1: "20대",
    value2: "20대",
    value3: "30대",
    value4: "40대",
  
  };

  const CustomTooltip1 = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-gray-700 p-2 rounded shadow-md">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {LABELS1[entry.dataKey as string]}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomTooltip2 = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-gray-700 p-2 rounded shadow-md">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {LABELS2[entry.dataKey as string]}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };



  const COLORS = ["#0088FE", "#FF6B6B"];
  const COLORS2 = ["#0088FE", "#4ECDC4", "#45B7D1", "#FF6B6B"];

  const getData1 = async () => {
    const userToken = getToken();

    const response = await getUserCurrentSituation(
      String(userToken),
      filterDay
    );

    if (response) {
      
      setUserCurrentSituation(response);
    }
  };

  const getData2 = async () => {
    const userToken = getToken();

    const response = await getExhibitionCurrentSituation(
      String(userToken),
      filterDay
    );

    if (response) {
      setExhibitionCurrentSituation(response);
    }
  };

  const getData3 = async () => {
    const userToken = getToken();

    const response = await getConferenceCurrentSituation(
      String(userToken),
      filterDay
    );

    if (response) {
      setConferenceCurrentSituation(response);
    }
  };

  const getData4 = async () => {
    const userToken = getToken();

    const response = await getCommunityCurrentSituation(
      String(userToken),
      filterDay
    );

    if (response) {
      setCommunityCurrentSituation(response);
    }
  };
  useEffect(() => {
    getData1();
    getData2();
    getData3();
    getData4();
  }, []);
  useEffect(() => {
    getData1();
    getData2();
    getData3();
    getData4();
  }, [filterDay]);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-title-md font-semibold capitalize text-black dark:text-white">
          종합 통계 대시보드
        </h2>
        <div className="">
          <div className="relative z-20 bg-transparent dark:bg-form-input w-[122px]">
            <select
              value={filterDay}
              onChange={(e) => selectDay(e?.target?.value)}
              className={`relative z-20 w-full appearance-none rounded-lg border bg-white border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-bodydark text-sm`}
            >
              <option value={`30days`} className="text-black dark:text-white">
                최근 30일
              </option>
              <option value={`7days`} className="text-black dark:text-white">
                최근 7일
              </option>
              <option value={`today`} className="text-black dark:text-white">
                오늘
              </option>
            </select>

            <span className="absolute right-3 top-1/2 z-30 -translate-y-1/2 text-black">
              <FaCaretDown />
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 pb-4 ">
        <div className="col-span-6 max-lg:col-span-12">
          <div className="rounded-lg border border-stroke bg-white pt-5 pb-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
            <div className=" font-semibold mb-4 text-black dark:text-white">
              회원현황
            </div>
            <div className="grid grid-cols-12 gap-3 ">
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                <div className="flex gap-5 items-center w-full ">
                  <div className="">
                    <img
                      src={`/images/icon/d1.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full  bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      회원수
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {userCurrentSituation?.allUserCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">명</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d2.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      신규가입
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {userCurrentSituation?.allNewUserCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">명</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d3.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      행사 주최사
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {userCurrentSituation?.allOrganizer}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d4.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      활성 회원 비율
                    </div>

                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {userCurrentSituation?.userUsage?.toFixed(1)}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6  rounded-xl ">
                
                <div className=" w-full h-full">
                  <div className="flex text-sm text-gray-700  w-full">
                    <div className="flex flex-col items-center text-[12px]" style={{ width: `50%` }}><span className="flex items-center gap-1 justify-center ">
                      <span className="flex h-2 w-2 rounded-full bg-[#4A90E2]"></span> 남자</span> <span className="text-black dark:text-white">{Number(userCurrentSituation?.maleRate?.toFixed(1))}%</span></div>
                    <div className="flex  flex-col items-center text-[12px]" style={{ width: `50%` }}><span className="flex items-center gap-1 justify-center ">
                      <span className="flex h-2 w-2 rounded-full bg-[#FF6B6B]"></span> 여자</span> <span className="text-black dark:text-white">{Number(userCurrentSituation?.femaleRate?.toFixed(1))}%</span></div>
                   
                  </div>
                  <ResponsiveContainer width="100%" height={30}>
                    
                    <BarChart data={data} stackOffset="expand" layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" hide />
                      <Tooltip content={<CustomTooltip1 />} />
                      <Bar dataKey="value1" stackId="a" fill={COLORS[0]} radius={[20, 0, 0, 20]} />
                     
                      <Bar dataKey="value2" stackId="a" fill={COLORS[1]} radius={[0, 20, 20, 0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                 
                </div>
              </div>
              <div className="col-span-6  h-[60px] rounded-xl ">
                <div className=" w-full h-full ">
                  <div className="flex text-sm text-gray-700  w-full">
                    <div className="flex flex-col items-center text-[12px]" style={{ width: `25%` }}>
                      <span className="flex items-center gap-1 justify-center ">
                      <span className="flex h-2 w-2 rounded-full bg-[#4A90E2]"></span> 20대</span> <span className="text-black dark:text-white">{Number(userCurrentSituation?.age20sRate)?.toFixed(1)}%</span></div>
                    <div className="flex  flex-col items-center text-[12px]" style={{ width: `25%` }}><span className="flex items-center gap-1 justify-center ">
                      <span className="flex h-2 w-2 rounded-full bg-[#4ECDC4]"></span> 30대</span> <span className="text-black dark:text-white">{Number(userCurrentSituation?.age30sRate)?.toFixed(1)}%</span></div>
                   <div className="flex  flex-col items-center text-[12px]" style={{ width: `25%` }}><span className="flex items-center gap-1 justify-center ">
                      <span className="flex h-2 w-2 rounded-full bg-[#45B7D1]"></span> 40대</span> <span className="text-black dark:text-white">{Number(userCurrentSituation?.age40sRate)?.toFixed(1)}%</span></div>
                   <div className="flex  flex-col items-center text-[12px]" style={{ width: `25%` }}><span className="flex items-center gap-1 justify-center ">
                      <span className="flex h-2 w-2 rounded-full bg-[#FF6B6B]"></span> 50대</span> <span className="text-black dark:text-white">{Number(userCurrentSituation?.age50PlusRate)?.toFixed(1)}%</span></div>
                   
                  </div>
                  <ResponsiveContainer width="100%" height={30} >
                    
                    <BarChart data={data2} stackOffset="expand" layout="vertical" className="w-full"    >
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" hide />
                      <Tooltip content={<CustomTooltip2 />} />
                      <Bar dataKey="value1" stackId="a" fill={COLORS2[0]} radius={[20, 0, 0, 20]} />
                      <Bar dataKey="value2" stackId="a" fill={COLORS2[1]} />
                      <Bar dataKey="value3" stackId="a" fill={COLORS2[2]} />
                      <Bar dataKey="value4" stackId="a" fill={COLORS2[3]} radius={[0, 20, 30, 0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 max-lg:col-span-12">
          <div className="rounded-lg border border-stroke bg-white py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
            <div className=" font-semibold mb-4 text-black dark:text-white">
              행사 현황
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                <div className="flex gap-5 items-center w-full ">
                  <div className="">
                    <img
                      src={`/images/icon/d5.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full  bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      등록된 행사
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {exhibitionCurrentSituation?.allExhibitionCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d6.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      승인 대기
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {exhibitionCurrentSituation?.allDisabledExhibitionCount}{" "}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d7.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      행사 참가자 수
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {exhibitionCurrentSituation?.allUserExhibitionCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">명</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d8.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      참석율
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {exhibitionCurrentSituation?.exhibitionUserConfirmedRate?.toFixed(
                          1
                        )}{" "}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 bg-[#F8F8F8] h-[62px] px-5 rounded-xl">
                <div className="flex w-full h-full items-center ">
                  <div className="w-full flex gap-x-4 items-center h-full ">
                    <div className="text-[#111111] text-[15px] ">
                      피드백 평균{" "}
                    </div>
                    <div className="flex h-full items-center">
                      {starRate(
                        String(exhibitionCurrentSituation?.avgExhibition)
                      )}
                    </div>
                  </div>
                  <div className="w-full font-bold flex justify-end">
                    <div>
                      <span className="text-[#17B0D9]">
                        {Number(
                          exhibitionCurrentSituation?.avgExhibition
                        )?.toFixed(1)}
                      </span>{" "}
                      <span className="text-[#111111]">/ 5.0 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 max-lg:col-span-12">
          <div className="rounded-lg border border-stroke bg-white py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
            <div className=" font-semibold mb-4 text-black dark:text-white">
              회의 현황
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                <div className="flex gap-5 items-center w-full ">
                  <div className="">
                    <img
                      src={`/images/icon/d9.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full  bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      회의 신청
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {conferenceCurrentSituation?.allConferenceCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">건</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d10.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      승인율
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {conferenceCurrentSituation?.approvedConferenceRate?.toFixed(
                          1
                        )}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d11.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      테이블 예약
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {
                          conferenceCurrentSituation?.allExhibitionConferenceTableCount
                        }
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">건</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d12.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      활용률
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {conferenceCurrentSituation?.tableUsageRate?.toFixed(1)}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 max-lg:col-span-12">
          <div className="rounded-lg border border-stroke bg-white py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 ">
            <div className=" font-semibold mb-4 text-black dark:text-white">
              커뮤니티 현황
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl ">
                <div className="flex gap-5 items-center w-full ">
                  <div className="">
                    <img
                      src={`/images/icon/d13.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full  bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      회원수
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {communityCurrentSituation?.allCommunityCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d14.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      최근 개설 커뮤니티
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {communityCurrentSituation?.allApprovedCommunityCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d15.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      평균 멤버 수
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {communityCurrentSituation?.avgCommunityUsers?.toFixed(
                          1
                        )}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 bg-[#F8F8F8] p-5 rounded-xl">
                <div className="flex gap-5 items-center w-full">
                  <div className="">
                    <img
                      src={`/images/icon/d16.svg`}
                      contextMenu="false"
                      alt={""}
                      className=" w-full bg-cover object-cover"
                    />
                  </div>
                  <div className="">
                    <div className="text-[#111111] text-[15px] mb-2">
                      활용량 (게시글/댓글)
                    </div>
                    <div>
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {communityCurrentSituation?.allCommunityPostCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span> /{" "}
                      <span className="text-[#17B0D9] font-semibold text-[24px]">
                        {communityCurrentSituation?.allCommunityCommentCount}
                      </span>{" "}
                      <span className="text-[#666666] text-[18px]">개</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
