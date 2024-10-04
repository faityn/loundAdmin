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
    inputPlaceholderProp: "Select start date",
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

    inputPlaceholderProp: "Select end date",
  };
  return options;
};
