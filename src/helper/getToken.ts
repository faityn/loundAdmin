import Cookies from "js-cookie";
const getToken = () => {
  const token = Cookies.get("w-access");

  return token;
};

export default getToken;
