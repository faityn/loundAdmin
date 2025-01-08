import {
  endDateAtom,
  optionExhibitionAtom,
  optionStatusAtom,
  optionTypeAtom,
  searchOptionsAtom,
  searchWordAtom,
  startDateAtom,
  usersAddExhibitionListAtom,
} from "@/atom";
import { format } from "date-fns";
import { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import StartDatePicker from "./StartDatePicker";
import EndDatePicker from "./EndDatePicker";
interface Props {
  handleSubmit?: () => void;
  exhibitionId?: string;
  searchType?: string;
  search?: string;
  start?: string;
  end?: string;
  status?: string;
  noStatus?: boolean;
}
const SearchFieldsExhibitionUsers = ({
  handleSubmit,
  exhibitionId,
  searchType,
  search,
  start,
  end,
  status,
}: Props) => {
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const searchOptions = useRecoilValue(searchOptionsAtom);

  const [optionType, setOptionType] = useRecoilState(optionTypeAtom);
  const [optionExhibition, setOptionExhibition] = useRecoilState(
    optionExhibitionAtom
  );
  const [optionStatus, setOptionStatus] = useRecoilState(optionStatusAtom);
  const [searchWord, setSearchWord] = useRecoilState(searchWordAtom);
  const usersAddExhibitionList = useRecoilValue(usersAddExhibitionListAtom);

  useEffect(() => {
    setOptionExhibition(exhibitionId as string);
    setOptionType(searchType as string);
    setSearchWord(search as string);
    setStartDate(start as string);
    setEndDate(end as string);
    setOptionStatus(status as string);
  }, []);
  const handleTypeOption = (val: string) => {
    setOptionType(val);
  };

  const handleExhibitionOption = (val: string) => {
    setOptionExhibition(val);
  };

  const handleStatusOption = (val: string) => {
    setOptionStatus(val);
  };
  const handleSearchWord = (val: string) => {
    setSearchWord(val);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDateChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setStartDate(formattedDate);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const endDateChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setEndDate(formattedDate);
  };
  return (
    <div>
      <table className=" w-[800px] table-auto text-sm ">
        <tbody>
          <tr>
            <td className=" w-20 border-[#eee]  py-3 dark:border-strokedark ">
              <h5 className=" text-black dark:text-white">행사 이름</h5>
            </td>
            <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
              <div className=" w-full  ">
                <div className="w-full relative z-20 bg-transparent dark:bg-form-input ">
                  <select
                    value={optionExhibition}
                    onChange={(e) => handleExhibitionOption(e.target.value)}
                    className={`relative z-20 text-md w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                  >
                    <option value="" className="text-black dark:text-bodydark">
                      선택
                    </option>
                    {usersAddExhibitionList?.map((e, i) => (
                      <option
                        key={i}
                        value={String(e?.exhibitionId)}
                        className="text-black dark:text-bodydark"
                      >
                        {e?.title}
                      </option>
                    ))}
                  </select>

                  <span className="absolute right-2 top-1/2 z-30 -translate-y-1/2 text-black dark:text-white">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            </td>
            <td className=" w-70 border-[#eee]  py-3 dark:border-strokedark "></td>
          </tr>
          <tr>
            <td className=" w-20 border-[#eee]  py-3 dark:border-strokedark ">
              <h5 className=" text-black dark:text-white">행사 일정</h5>
            </td>
            <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
              <div className="flex w-full gap-4 ">
                <div className="relative w-full">
                  <StartDatePicker
                    label="시작일"
                    onDateChange={startDateChange}
                    defaultDate={startDate}
                  />
                </div>
                <div className="relative w-full">
                  <EndDatePicker
                    label="종료일"
                    onDateChange={endDateChange}
                    defaultDate={endDate}
                  />
                </div>
              </div>
            </td>
            <td className=" w-70 border-[#eee]  py-3 dark:border-strokedark "></td>
          </tr>
          <tr>
            <td className=" w-20 border-[#eee]  py-3 dark:border-strokedark ">
              <h5 className=" text-black dark:text-white">검색</h5>
            </td>
            <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
              <div className="flex gap-2 w-full ">
                <div className="w-35 relative z-20 bg-transparent dark:bg-form-input ">
                  <select
                    defaultValue={optionType}
                    onChange={(e) => handleTypeOption(e.target.value)}
                    className={`relative z-20 text-md w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                  >
                    {searchOptions?.search?.map((e, i) => (
                      <option
                        key={i}
                        value={String(e?.value)}
                        className="text-black dark:text-bodydark"
                      >
                        {e?.text}
                      </option>
                    ))}
                  </select>

                  <span className="absolute right-2 top-1/2 z-30 -translate-y-1/2 text-black dark:text-white">
                    <FaChevronDown />
                  </span>
                </div>
                <div className="w-full ">
                  <input
                    type="text"
                    defaultValue={searchWord}
                    onChange={(e) => handleSearchWord(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </td>
            <td className=" w-20 border-[#eee]  py-3 dark:border-strokedark ">
              <div className="flex gap-2 w-full ">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-25 items-center justify-center rounded bg-primary px-2 py-2 text-center font-medium text-white hover:bg-opacity-90 "
                >
                  검색
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className=" w-20 border-[#eee]  py-3 dark:border-strokedark ">
              <h5 className=" text-black dark:text-white">참석</h5>
            </td>
            <td className=" border-[#eee] px-4 py-3 dark:border-strokedark ">
              <div className="flex gap-2 w-full ">
                <div className="w-25 relative z-20 bg-transparent dark:bg-form-input ">
                  <select
                    defaultValue={optionStatus}
                    onChange={(e) => handleStatusOption(e.target.value)}
                    className={`relative z-10 text-md w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                  >
                    <option value="" className="text-black dark:text-bodydark">
                      전체
                    </option>
                    <option
                      value="true"
                      className="text-black dark:text-bodydark"
                    >
                      확인
                    </option>
                    <option
                      value="false"
                      className="text-black dark:text-bodydark"
                    >
                      미확인
                    </option>
                  </select>

                  <span className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-black dark:text-white">
                    <FaChevronDown />
                  </span>
                </div>
              </div>
            </td>
            <td className=" w-20 border-[#eee]  py-3 dark:border-strokedark "></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchFieldsExhibitionUsers;
