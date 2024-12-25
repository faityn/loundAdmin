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

const StartDatePickerByModal: React.FC<DateTimePickerProps> = ({
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
    if (defaultDate) {
      const parsedDate = parse(defaultDate as string, "yyyy-MM-dd", new Date());
      setSelectedDate(parsedDate);
    }
  }, [defaultDate]);
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd "
        className="w-full rounded-lg border-[1.5px] border-slate-300 bg-transparent px-5 py-2 h-[52px] text-black outline-none transition focus:border-slate-400 active:border-slate-400 disabled:cursor-default disabled:bg-whiter "
        placeholderText="시작"
        popperClassName="custom-datepicker-popper"
      />
    </div>
  );
};

export default StartDatePickerByModal;
