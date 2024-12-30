"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userExhibitionListAtom, userMessageActivityAtom } from "@/atom";
import { useEffect, useState } from "react";
import { userMessageActivity } from "@/hooks/useUser";
import getToken from "@/helper/getToken";
import { FaCaretDown } from "react-icons/fa";
type Props = {
  userId: number;
};
const MessageActivity = ({ userId }: Props) => {
  const userExhibition = useRecoilValue(userExhibitionListAtom);
  const [optionExhibition, setOptionExhibition] = useState("");
  const [totalMsgCount, setTotalMsgCount] = useState(0);
  const [show, setShow] = useState(false);
  const [userUserMessageActivity, setUserMessageActivity] = useRecoilState(
    userMessageActivityAtom
  );

  const handleExhibition = async (val: string) => {
    const userToken = getToken();
    setShow(val !== "0" ? true : false);
    setOptionExhibition(val);
    const exhibition = val;
    const messageActivity = await userMessageActivity(
      String(userToken),
      Number(userId),
      exhibition
    );

    setUserMessageActivity(messageActivity);
  };
  const getData = async () => {
    const userToken = getToken();

    const exhibition = "all";
    const messageActivity = await userMessageActivity(
      String(userToken),
      Number(userId),
      exhibition
    );

    setUserMessageActivity(messageActivity);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const inviteCnt =
      userUserMessageActivity?.userInviteCnt !== undefined
        ? userUserMessageActivity?.userInviteCnt
        : 0;

    const recieveCnt =
      userUserMessageActivity?.userRecieveCnt !== undefined
        ? userUserMessageActivity?.userRecieveCnt
        : 0;
    const total = inviteCnt + recieveCnt;
    setTotalMsgCount(total);
  }, [userUserMessageActivity]);
  return (
    <div className="pl-5 text-xs">
      <div className=" font-semibold text-[#17B0D9] mb-2">메시지 활동 요약</div>
      <div className="relative z-20 w-full mb-5 bg-transparent  ">
        <select
          value={optionExhibition}
          onChange={(e) => handleExhibition(e.target.value)}
          className={`text-md relative z-10 w-full appearance-none rounded-xl border border-slate-300 bg-transparent px-5 py-1.5 h-[52px] text-[16px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 `}
        >
          <option value="0" className="text-black ">
            선택
          </option>
          {userExhibition?.map((e, i) => (
            <option
              key={i}
              value={String(e?.exhibitionId)}
              className="text-black "
            >
              {e?.exhibition?.title}
            </option>
          ))}
        </select>

        <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-black text-lg">
          <FaCaretDown />
        </span>
      </div>
      <div className="flex flex-col gap-4 pt-2 text-xl">
        <div className={`${show ? "" : "hidden"}`}>
          <div className="w-full border border-slate-300 rounded-xl  min-h-[200px] max-h-[470px] text-[16px]">
            <div className="flex justify-between items-center px-6 border-b border-[#EEEEEE] h-[62px]">
              <div className=" w-full text-[16px] font-bold">총 메시지 수</div>
              <div className=" min-w-20 text-right text-[16px]">
                <span className="font-bold">{totalMsgCount}</span>{" "}
                <span className="text-[#666666]">건</span>
              </div>
            </div>

            <div className="border-b border-[#EEEEEE] px-6 pb-5">
              <div className="flex justify-between items-center  h-[62px] mt-2">
                <div className=" w-full text-[16px] font-bold">
                  송신 메시지 수
                </div>
                <div className=" min-w-20 text-right text-[16px]">
                  <span className="font-bold">
                    {userUserMessageActivity?.userInviteCnt
                      ? userUserMessageActivity?.userInviteCnt
                      : 0}
                  </span>{" "}
                  <span className="text-[#666666]">건</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[#666666] mb-2">
                <div className="">&#x2022; 회의 초청 메시지</div>
                <div className="">
                  <span className="font-bold text-[#111111]">
                    {userUserMessageActivity?.userConfInviteCnt
                      ? userUserMessageActivity?.userConfInviteCnt
                      : 0}
                  </span>{" "}
                  <span className="">건</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[#666666] mb-2">
                <div className="">&#x2022; 1:1 미팅 신청하기</div>
                <div className="">
                  <span className="font-bold text-[#111111]">
                    {userUserMessageActivity?.userMeetInviteCnt
                      ? userUserMessageActivity?.userMeetInviteCnt
                      : 0}
                  </span>{" "}
                  <span className="">건</span>
                </div>
              </div>
            </div>

            <div className="border-b border-[#EEEEEE] px-6 pb-5">
              <div className="flex justify-between items-center  h-[62px] mt-2">
                <div className=" w-full text-[16px] font-bold">
                  수신 메시지 수
                </div>
                <div className=" min-w-20 text-right text-[16px]">
                  <span className="font-bold">
                    {userUserMessageActivity?.userRecieveCnt
                      ? userUserMessageActivity?.userRecieveCnt
                      : 0}
                  </span>{" "}
                  <span className="text-[#666666]">건</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[#666666] mb-2">
                <div className="">&#x2022; 회의 초청 메시지</div>
                <div className="">
                  <span className="font-bold text-[#111111]">
                    {userUserMessageActivity?.userConfRecieveCnt
                      ? userUserMessageActivity?.userConfRecieveCnt
                      : 0}
                  </span>{" "}
                  <span className="">건</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[#666666] mb-2">
                <div className="">&#x2022; 1:1 미팅 신청하기</div>
                <div className="">
                  <span className="font-bold text-[#111111]">
                    {userUserMessageActivity?.userMeetRecieveCnt
                      ? userUserMessageActivity?.userMeetRecieveCnt
                      : 0}
                  </span>{" "}
                  <span className="">건</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageActivity;
