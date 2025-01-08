// components/DateTimePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  label?: string;
  placeholder?: string;
  onDateChange: (date: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  placeholder,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onDateChange(date);
  };

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
        placeholderText={placeholder ? placeholder : ""}
        popperClassName="custom-datepicker-popper"
      />
    </div>
  );
};

export default DateTimePicker;
