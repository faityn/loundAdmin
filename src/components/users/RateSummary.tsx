"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userExhibitionListAtom, userExhibitionRatingAtom } from "@/atom";
import { useEffect, useState } from "react";
import { userExhibitionRating } from "@/hooks/useUser";
import getToken from "@/helper/getToken";
import { FaCaretDown } from "react-icons/fa";
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
      <div className=" font-semibold text-[#17B0D9] mb-2">평가 활동 요약</div>
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
      <div className="flex flex-col gap-4 pt-2  text-xl">
        <div>
          <div className="mb-7 text-[32px]">{starRating}</div>
          <div className="w-full border border-slate-300 rounded-lg p-4 min-h-[200px] max-h-[470px] text-[16px]">
            {userExhibitionRatingState?.comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateSummary;
