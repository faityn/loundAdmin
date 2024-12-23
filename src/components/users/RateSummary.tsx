"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userExhibitionListAtom, userExhibitionRatingAtom } from "@/atom";
import { useEffect, useState } from "react";
import { userExhibitionRating } from "@/hooks/useUser";
import getToken from "@/helper/getToken";
import { FaChevronDown } from "react-icons/fa";
import getStarRating from "../common/getStarRating";
type Props = {
  userId: number;
};
const RateSummary = ({ userId }: Props) => {
  const userExhibition = useRecoilValue(userExhibitionListAtom);
  const [optionExhibition, setOptionExhibition] = useState("");
  const [
    userExhibitionRatingState,
    setUserExhibitionRatingState,
  ] = useRecoilState(userExhibitionRatingAtom);

  const starRating = getStarRating(Number(userExhibitionRatingState?.rating));
  const handleExhibition = async (val: string) => {
    const userToken = getToken();
    setOptionExhibition(val);
    const exhibition = val;
    const exhibitionRating = await userExhibitionRating(
      String(userToken),
      Number(userId),
      exhibition
    );

    setUserExhibitionRatingState(exhibitionRating);
  };

  useEffect(() => {}, [userExhibition]);
  return (
    <div className="pl-5 text-xs">
      <div className=" font-semibold">평가 활동 요약</div>
      <div className="relative z-20 w-50 bg-transparent dark:bg-form-input ">
        <select
          value={optionExhibition}
          onChange={(e) => handleExhibition(e.target.value)}
          className={`text-md relative z-10 w-full appearance-none rounded border border-slate-300 bg-transparent px-5 py-1.5 text-xs text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
        >
          <option value="all" className="text-black dark:text-bodydark">
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
      <div className="flex flex-col gap-4 pt-10 text-xl">
        <div>
          <div className="mb-5 text-[36px]">{starRating}</div>
          <div className="w-full border border-slate-300 rounded-lg p-4 min-h-[200px] max-h-[470px]">
            {userExhibitionRatingState?.comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateSummary;
