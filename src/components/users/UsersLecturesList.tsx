"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userExhibitionLectureAtom, userExhibitionListAtom } from "@/atom";
import { useEffect, useState } from "react";
import { userExhibitionLectureList } from "@/hooks/useUser";
import getToken from "@/helper/getToken";
import { FaCaretDown } from "react-icons/fa";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";
import { RiSearchLine } from "react-icons/ri";

type Props = {
  userId: number;
};
const UsersLecturesList = ({ userId }: Props) => {
  const userExhibition = useRecoilValue(userExhibitionListAtom);
  const [optionExhibition, setOptionExhibition] = useState("");
  const [word, setWord] = useState("");
  const [userExhibitionLecture, setUserExhibitionLecture] = useRecoilState(
    userExhibitionLectureAtom
  );

  const handleExhibition = async (val: string) => {
    const userToken = getToken();
    setOptionExhibition(val);
    const exhibition = val;
    const exhibitionLecture = await userExhibitionLectureList(
      String(userToken),
      Number(userId),
      Number(exhibition),
      word
    );

    if (exhibitionLecture) {
      setUserExhibitionLecture(exhibitionLecture);
    }
  };

  const handleSearchWord = (val: string) => {
    setWord(val);
  };

  const handleSearch = async () => {
    const userToken = getToken();
    const exhibitionLecture = await userExhibitionLectureList(
      String(userToken),
      Number(userId),
      Number(10),
      word
    );
    if (exhibitionLecture) {
      setUserExhibitionLecture(exhibitionLecture);
    }
  };
  useEffect(() => {}, [userExhibitionLecture]);
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
      <div className="mt-5 max-w-full overflow-x-auto border border-[#ddd] rounded-xl ">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-[#F8F8F8] text-center text-[#111111]">
              <th className="w-full px-4 py-2 h-[52px] font-medium   ">이름</th>

              <th className="min-w-[130px] px-4 py-2 h-[52px] font-medium  ">
                참가 날짜
              </th>
              <th className="min-w-[100px] px-4 py-2 h-[52px] font-medium  ">
                참가 상태
              </th>
            </tr>
          </thead>
          <tbody>
            {userExhibitionLecture?.length > 0 &&
              userExhibitionLecture?.map((item, i) => (
                <tr key={i}>
                  <td className="border-b border-[#eee] px-4 py-3 h-[52px] text-center">
                    {item?.title}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 h-[52px] text-center">
                    {item?.startDate
                      ? formatInTimeZone(
                          parseISO(item?.startDate),
                          "UTC",
                          "yyyy-MM-dd HH:mm"
                        )
                      : ""}{" "}
                    ~{" "}
                    {item?.endDate
                      ? formatInTimeZone(
                          parseISO(item?.endDate),
                          "UTC",
                          "yyyy-MM-dd HH:mm"
                        )
                      : ""}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 h-[52px] text-center">
                    참가 완료
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersLecturesList;
