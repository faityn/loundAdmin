import { getLoginData } from "@/hooks/useUser";
import getToken from "./getToken";

const getRole = async () => {
  const userToken = getToken();
  const loginData = await getLoginData(userToken as string);

  if (loginData?.status) {
    const data = {
      role: loginData?.result?.admin?.isSuper ? "Super Admin" : "Admin",
      menu: loginData?.result?.menu,
    };
    return data;
  } else {
    return "expired";
  }
};

export default getRole;
