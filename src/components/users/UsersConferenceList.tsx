"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userExhibitionConferenceAtom,
  userExhibitionConferenceAtomOwn,
  userExhibitionListAtom,
} from "@/atom";
import { useEffect, useState } from "react";
import {
  userExhibitionConferenceList,
  userExhibitionConferenceListOwn,
} from "@/hooks/useUser";
import getToken from "@/helper/getToken";
import { FaCaretDown } from "react-icons/fa";

import UsersConferenceOneItem from "./UsersConferenceOneItem";
import { RiSearchLine } from "react-icons/ri";

type Props = {
  userId: number;
};
const UsersConferenceList = ({ userId }: Props) => {
  const userExhibition = useRecoilValue(userExhibitionListAtom);
  const [optionExhibition, setOptionExhibition] = useState("");
  const [word, setWord] = useState("");
  const [activeType, setActiveType] = useState("1");
  const [userConference, setUserConference] = useRecoilState(
    userExhibitionConferenceAtom
  );
  const [userConferenceOwn, setUserConferenceOwn] = useRecoilState(
    userExhibitionConferenceAtomOwn
  );

  const changeType = (val: string) => {
    setActiveType(val);
  };

  const handleExhibition = async (val: string) => {
    const userToken = getToken();
    setOptionExhibition(val);
    const exhibition = val;
    const exhibitionConferenceOwn = await userExhibitionConferenceListOwn(
      String(userToken),
      Number(userId),
      Number(exhibition),
      word
    );
    setUserConferenceOwn(exhibitionConferenceOwn);

    const exhibitionConference = await userExhibitionConferenceList(
      String(userToken),
      Number(userId),
      Number(exhibition),
      word
    );
    setUserConference(exhibitionConference);
  };

  const handleSearchWord = (val: string) => {
    setWord(val);
  };

  const handleSearch = async () => {
    const userToken = getToken();

    const exhibitionConferenceOwn = await userExhibitionConferenceListOwn(
      String(userToken),
      Number(userId),
      Number(optionExhibition),
      word
    );
    setUserConferenceOwn(exhibitionConferenceOwn);

    const exhibitionConference = await userExhibitionConferenceList(
      String(userToken),
      Number(userId),
      Number(optionExhibition),
      word
    );

    setUserConference(exhibitionConference);
  };
  useEffect(() => {}, []);
  return (
    <div className="pl-5 text-xs">
      <div className=" font-semibold text-[#17B0D9] mb-2">
        {" "}
        참가한 강연 정보{" "}
      </div>

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
      <div className="flex gap-3">
        <div className="w-full relative flex items-center">
          <div
            className="text-black absolute pl-4 cursor-pointer"
            onClick={() => handleSearch()}
          >
            <RiSearchLine className="text-2xl" />
          </div>
          <input
            type="text"
            onChange={(e) => handleSearchWord(e.target.value)}
            placeholder="검색어를 입력해 주세요."
            className="w-full rounded-xl border-[1.5px] border-slate-300 bg-transparent pl-13 px-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
          />
        </div>
      </div>
      <div className="mt-5 max-w-full overflow-x-auto">
        <div className="flex w-full ">
          <div className="flex items-left gap-10 ">
            <div>
              <label
                htmlFor="type1"
                className="flex cursor-pointer select-none items-center"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="type1"
                    value={"1"}
                    className="sr-only"
                    onChange={(e) => {
                      changeType(e.target.value);
                    }}
                  />
                  <div
                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      activeType === "1"
                        ? "border-[#002453]"
                        : "border-[#DBDBDB]"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full bg-[#DBDBDB] ${
                        activeType === "1" && "!bg-[#002453]"
                      }`}
                    >
                      {" "}
                    </span>
                  </div>
                </div>
                개설한 회의
              </label>
            </div>
            <div>
              <label
                htmlFor="type2"
                className="flex cursor-pointer select-none items-center"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="type2"
                    value={"2"}
                    className="sr-only"
                    onChange={(e) => {
                      changeType(e.target.value);
                    }}
                  />
                  <div
                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      activeType === "2"
                        ? "border-[#002453]"
                        : "border-[#DBDBDB]"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full bg-[#DBDBDB] ${
                        activeType === "2" && "!bg-[#002453]"
                      }`}
                    >
                      {" "}
                    </span>
                  </div>
                </div>
                참가한 회의
              </label>
            </div>
          </div>
        </div>

        <div className="mt-5 ">
          <div
            className={`${
              activeType !== "1" ? "hidden" : ""
            } overflow-y-auto max-h-[470px]`}
          >
            <div className="w-full flex flex-col gap-4 ">
              {/* {userConferenceLectureOwn?.length > 0 && } */}
              {userConferenceOwn?.length > 0 &&
                userConferenceOwn?.map((item, i) => (
                  <UsersConferenceOneItem
                    key={i}
                    title={item?.title}
                    startDate={item?.startDate}
                    endDate={item?.endDate}
                    participationText={item?.participationText}
                    companyName={item?.user?.companyName}
                    name={item?.user?.name}
                  />
                ))}
            </div>
          </div>

          <div
            className={`${
              activeType !== "2" ? "hidden" : ""
            } overflow-y-auto max-h-[470px]`}
          >
            <div className="w-full flex flex-col gap-4 ">
              {/* {userConferenceLectureOwn?.length > 0 && } */}
              {userConference?.map((item, i) => (
                <UsersConferenceOneItem
                  key={i}
                  title={item?.title}
                  startDate={item?.startDate}
                  endDate={item?.endDate}
                  participationText={item?.participationText}
                  companyName={item?.user?.companyName}
                  name={item?.user?.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersConferenceList;
