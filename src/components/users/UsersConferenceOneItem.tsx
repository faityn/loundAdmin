"use client";

import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

type Props = {
  title?: string;
  startDate?: string;
  endDate?: string;
  participationText?: string;
  companyName?: string;
  name?: string;
  position?: string;
};
const UsersConferenceOneItem = ({
  title,
  startDate,
  endDate,
  participationText,
  companyName,
  name,
  position,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-1 border border-slate-300 rounded-lg py-5 px-5 pretendardFont">
      <div className="text-[18px] text-[#111111] font-semibold mb-4">
        {title}
      </div>
      <div className="text-[13px] text-[#666666] flex">
        <div className="w-[70px]">일시: </div>
        <div className="">
          {startDate
            ? formatInTimeZone(parseISO(startDate), "UTC", "yyyy-MM-dd HH:mm")
            : ""}{" "}
          ~{" "}
          {endDate
            ? formatInTimeZone(parseISO(endDate), "UTC", "yyyy-MM-dd HH:mm")
            : ""}
        </div>
      </div>
      <div className="text-[13px] text-[#666666] flex">
        <div className="w-[70px]">참가 방식:</div>{" "}
        <div className="">{participationText}</div>
      </div>

      <div className="text-[13px] text-[#666666] flex">
        <div className="w-[70px]">주최:</div>
        <div className="">
          {" "}
          {companyName} {name} {position}
        </div>
      </div>
    </div>
  );
};

export default UsersConferenceOneItem;
