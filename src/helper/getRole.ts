import { getLoginData } from "@/hooks/useUser";
import getToken from "./getToken";

const getRole = async () => {
  const userToken = getToken();

  const loginData = await getLoginData(userToken as string);

  if (loginData?.status) {
    return loginData?.result?.admin?.isSuper ? "Super Admin" : "Admin";
  } else {
    return "expired";
  }
};

export default getRole;
