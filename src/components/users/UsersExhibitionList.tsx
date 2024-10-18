"use client";
import { useRecoilState } from "recoil";
import { userExhibitionListAtom } from "@/atom";
import { useEffect, useState } from "react";
import { userExhibitionList } from "@/hooks/useUser";
import getToken from "@/helper/getToken";

type Props = {
  userId: number;
};
const UsersExhibitionList = ({ userId }: Props) => {
  const [userExhibition, setUserExhibition] = useRecoilState(
    userExhibitionListAtom,
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
      word,
    );
    setUserExhibition(exhibitionList?.rows);
  };
  useEffect(() => {}, []);
  return (
    <div className="pl-5 text-xs">
      <div className=" font-semibold"> 참가한 전시 정보</div>

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
          Search
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
              <th className="min-w-[130px] px-4 py-2 font-medium text-white  ">
                참가 상태
              </th>
            </tr>
          </thead>
          <tbody>
            {userExhibition?.map((item, i) => (
              <tr key={i}>
                <td className="border-b border-[#eee] px-4 py-3 ">
                  {item?.exhibition?.title}
                </td>
                <td className="border-b border-[#eee] px-4 py-3 ">
                  {item?.dates}
                </td>
                <td className="border-b border-[#eee] px-4 py-3 ">
                  {item?.request}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersExhibitionList;
