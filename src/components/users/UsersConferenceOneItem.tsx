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
    <div className="w-full flex flex-col gap-1 border border-slate-400 rounded-lg py-5 px-5">
      <div className=" ">{title}</div>
      <div className=" ">
        일시:{" "}
        {startDate
          ? formatInTimeZone(parseISO(startDate), "UTC", "yyyy-MM-dd HH:mm")
          : ""}{" "}
        ~{" "}
        {endDate
          ? formatInTimeZone(parseISO(endDate), "UTC", "yyyy-MM-dd HH:mm")
          : ""}
      </div>
      <div className=" ">참가 방식: {participationText}</div>

      <div className=" ">
        주최: {companyName} {name} {position}
      </div>
    </div>
  );
};

export default UsersConferenceOneItem;
