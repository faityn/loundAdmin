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
import { FaChevronDown } from "react-icons/fa";

import UsersConferenceOneItem from "./UsersConferenceOneItem";

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
      <div className=" font-semibold"> 참가한 강연 정보 </div>

      <div className="relative z-20 w-50 mb-5 bg-transparent dark:bg-slate-700 ">
        <select
          value={optionExhibition}
          onChange={(e) => handleExhibition(e.target.value)}
          className={`text-md relative z-10 w-full appearance-none rounded border border-slate-300 bg-transparent px-5 py-1.5 text-xs text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary`}
        >
          <option value="0" className="text-black dark:text-bodydark">
            선택
          </option>
          {userExhibition?.map((e, i) => (
            <option
              key={i}
              value={String(e?.exhibitionId)}
              className="text-black dark:text-bodydark"
            >
              {e?.exhibition?.title}
            </option>
          ))}
        </select>

        <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-slate-400 dark:text-white">
          <FaChevronDown />
        </span>
      </div>
      <div className="flex gap-3">
        <div className="w-full">
          <input
            type="text"
            onChange={(e) => handleSearchWord(e.target.value)}
            className="w-full rounded border-[1.5px] border-slate-300 bg-transparent px-4 py-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
          />
        </div>
        <button
          type="button"
          onClick={() => handleSearch()}
          className="inline-flex w-25 items-center justify-center rounded-md bg-primary px-5 py-1.5 text-center text-[15px] font-medium text-white hover:bg-opacity-90 "
        >
          찾다
        </button>
      </div>
      <div className="mt-5 max-w-full overflow-x-auto">
        <div className="flex w-full justify-center">
          <div className="flex items-center gap-10">
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
                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                      activeType === "1" && "border-primary"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                        activeType === "1" && "!bg-primary"
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
                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                      activeType === "2" && "border-primary"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                        activeType === "2" && "!bg-primary"
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
