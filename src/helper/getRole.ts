import { getLoginData } from "@/hooks/useUser";
import getToken from "./getToken";

const getRole = async () => {
  const userToken = getToken();

  if (userToken !== undefined && userToken !== "undefined") {
    const loginData = await getLoginData(userToken);

    if (loginData?.status) {
      return loginData?.result?.admin?.isSuper ? "Super Admin" : "Admin";
    } else {
      return "expired";
    }
  } else {
    return false;
  }
};

export default getRole;
