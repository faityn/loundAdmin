"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userExhibitionLectureAtom, userExhibitionListAtom } from "@/atom";
import { useEffect, useState } from "react";
import { userExhibitionLectureList } from "@/hooks/useUser";
import getToken from "@/helper/getToken";
import { FaChevronDown } from "react-icons/fa";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";

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

    setUserExhibitionLecture(exhibitionLecture);
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

    setUserExhibitionLecture(exhibitionLecture);
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
        <table className="w-full table-auto text-xs">
          <thead>
            <tr className="bg-slate-700 text-left ">
              <th className="min-w-[150px] px-4 py-2 font-medium text-white  ">
                이름
              </th>

              <th className="min-w-[130px] px-4 py-2 font-medium text-white  ">
                참가 날짜
              </th>
              <th className="min-w-[100px] px-4 py-2 font-medium text-white  ">
                참가 상태
              </th>
            </tr>
          </thead>
          <tbody>
            {userExhibitionLecture?.map((item, i) => (
              <tr key={i}>
                <td className="border-b border-[#eee] px-4 py-3 ">
                  {item?.title}
                </td>
                <td className="border-b border-[#eee] px-4 py-3 ">
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
                <td className="border-b border-[#eee] px-4 py-3 ">참가 완료</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersLecturesList;
