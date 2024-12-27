"use client";
import { useRecoilState } from "recoil";
import { userExhibitionListAtom } from "@/atom";
import { useEffect, useState } from "react";
import { userExhibitionList } from "@/hooks/useUser";
import getToken from "@/helper/getToken";
import { RiSearchLine } from "react-icons/ri";

type Props = {
  userId: number;
};
const UsersExhibitionList = ({ userId }: Props) => {
  const [userExhibition, setUserExhibition] = useRecoilState(
    userExhibitionListAtom
  );
  const [word, setWord] = useState("");

  const handleSearchWord = (val: string) => {
    setWord(val);
  };
  const handleSearch = async () => {
    const userToken = getToken();
    const exhibitionList = await userExhibitionList(
      String(userToken),
      Number(userId),
      word
    );
    setUserExhibition(exhibitionList?.rows);
  };
  useEffect(() => {}, []);
  return (
    <div className="pl-5 text-xs">
      <div className=" font-semibold text-[#17B0D9] mb-2">
        {" "}
        참가한 행사 정보
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
            className="w-full rounded-lg border-[1.5px] border-slate-300 bg-transparent pl-13 pr-4 py-1.5 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
          />
        </div>
      </div>
      <div className="mt-5 max-w-full overflow-x-auto border border-[#ddd] rounded-xl">
        <div className="">
          <table className="w-full table-auto text-sm   ">
            <thead className="">
              <tr className="bg-[#F8F8F8] text-center text-[#111111] ">
                <th className="w-full px-4 py-2 h-[52px] font-medium  ">
                  이름
                </th>

                <th className="min-w-[130px] px-4 py-2 font-medium  ">
                  참가 날짜
                </th>
                <th className="min-w-[100px] px-4 py-2 font-medium   ">
                  참가 상태
                </th>
              </tr>
            </thead>
            <tbody>
              {userExhibition?.map((item, i) => (
                <tr key={i}>
                  <td className="border-b border-[#eee] text-center px-4 py-3 h-[52px]">
                    {item?.exhibition?.title}
                  </td>
                  <td className="border-b border-[#eee] text-center px-4 py-3 h-[52px]">
                    {item?.dates}
                  </td>
                  <td className="border-b border-[#eee] text-center px-4 py-3 h-[52px]">
                    {item?.request === "approved" ? (
                      <div>참가 완료</div>
                    ) : (
                      <div className="text-[#FA423A]">불참</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersExhibitionList;
