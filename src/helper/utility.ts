import CryptoJS from "crypto-js";

const encrypt = (text: string) => {
  try {
    const plainText = CryptoJS.AES.encrypt(
      text,
      String(process.env.NEXT_PUBLIC_ENCRYPT_KEY)
    ).toString();

    return plainText;
  } catch (err) {
    console.log("encrypt error: ", err);

    return {
      data: "",
    };
  }
};

const decrypt = (text: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      text,
      String(process.env.NEXT_PUBLIC_ENCRYPT_KEY)
    );
    const plainText = bytes.toString(CryptoJS.enc.Utf8);

    if (plainText) {
      return {
        data: plainText,
      };
    } else {
      return {
        data: "",
      };
    }
  } catch (err) {
    console.log("decrypt error: ", err);

    return {
      data: "",
    };
  }
};

export const convertDateToUTCDate = (date: Date) => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return new Date(utc);
};

export const convertUTCDateToDate = (utcDate: Date) => {
  const date = utcDate.getTime();
  return new Date(date);
};

export { encrypt, decrypt };

export const datePickerOption1 = (startDateParam: string) => {
  const options = {
    autoHide: true,
    clearBtn: false,
    todayBtn: false,
    clearBtnText: "Clear",
    defaultDate: startDateParam ? new Date(String(startDateParam)) : new Date(),
    theme: {
      background: " bg-graydark",
      todayBtn: "",
      clearBtn: "bg-graydark",
      icons: "bg-graydark",
      text: "text-white",
      disabledText: "text-white/50",
      input:
        "w-full rounded border-[1.5px] border-stroke bg-transparent  font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",
      inputIcon: "gg",
      selected: "",
    },
    language: "en",
    inputPlaceholderProp: "선택 start date",
  };
  return options;
};

export const datePickerOption2 = (endDateParam: string) => {
  const options = {
    clearBtn: false,
    todayBtn: false,
    clearBtnText: "Clear",
    defaultDate: endDateParam ? new Date(String(endDateParam)) : new Date(),
    theme: {
      background: " bg-graydark",
      todayBtn: "",
      clearBtn: "bg-graydark",
      icons: "bg-graydark",
      text: "text-white",
      disabledText: "text-white/50",
      input:
        "w-full rounded border-[1.5px] border-stroke bg-transparent  font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",
      inputIcon: "gg",
      selected: "",
    },
    language: "en",

    inputPlaceholderProp: "선택 end date",
  };
  return options;
};

export const Interests = () => {
  const data = [
    {
      id: 1,
      name: "경영",
      value: "경영",
    },
    {
      id: 2,
      name: "제품",
      value: "제품",
    },
    {
      id: 3,
      name: "고객관리",
      value: "고객관리",
    },
    {
      id: 4,
      name: "트렌드",
      value: "트렌드",
    },
    {
      id: 5,
      name: "연구",
      value: "연구",
    },
    {
      id: 6,
      name: "AI",
      value: "AI",
    },
    {
      id: 7,
      name: "기술",
      value: "기술",
    },
    {
      id: 8,
      name: "임상",
      value: "임상",
    },
    {
      id: 9,
      name: "마케팅",
      value: "마케팅",
    },
    {
      id: 10,
      name: "시연",
      value: "시연",
    },
  ];
  return data;
};

export const Purposes = () => {
  const data = [
    {
      id: 1,
      name: "네트워킹",
      value: "네트워킹",
    },
    {
      id: 2,
      name: "투자 미팅",
      value: "투자 미팅",
    },
    {
      id: 3,
      name: "상담",
      value: "상담",
    },
    {
      id: 4,
      name: "제품 전시",
      value: "제품 전시",
    },
    {
      id: 5,
      name: "부스 방문",
      value: "부스 방문",
    },
    {
      id: 6,
      name: "정보 획득",
      value: "정보 획득",
    },
    {
      id: 7,
      name: "강연 참여",
      value: "강연 참여",
    },
  ];
  return data;
};
