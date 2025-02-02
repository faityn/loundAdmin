// components/DateTimePicker.tsx
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse } from "date-fns";

interface DateTimePickerProps {
  label?: string;
  onDateChange: (date: Date) => void;
  defaultDate?: string;
}

const StartDateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  onDateChange,
  defaultDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onDateChange(date);
  };

  useEffect(() => {
    const parsedDate = parse(
      defaultDate as string,
      "yyyy-MM-dd HH:mm:ss",
      new Date()
    );
    setSelectedDate(parsedDate);
  }, [defaultDate]);
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="yyyy-MM-dd HH:mm:ss"
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        placeholderText=""
        popperClassName="custom-datepicker-popper"
      />
    </div>
  );
};

export default StartDateTimePicker;
