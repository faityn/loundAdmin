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
