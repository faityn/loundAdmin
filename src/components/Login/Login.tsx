"use client";
import React, { useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { adminLogin } from "@/hooks/useUser";
import { encrypt } from "@/helper/utility";
import Loader from "../common/Loader";
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoader(true);
    const encryptedPass = encrypt(password);

    const response = await adminLogin(username, String(encryptedPass));

    if (!response?.status) {
      setLoader(false);
      setError("Wrong username or password");
    } else {
      setError("");
      const token = response?.result;

      const expires = new Date();
      expires.setMonth(expires.getMonth() + 1);

      Cookies.set("w-access", token, {
        expires: expires,
        path: "/",
      });

      push("/");
      setLoader(false);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark max-w-150 mx-auto">
      <div className="flex flex-wrap items-center ">
        <div className=" border-stroke dark:border-strokedark w-full ">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5 xl:py-12">
            <div className=" w-full flex justify-center"></div>
            <h2 className="mb-9 text-xl font-bold text-black dark:text-white sm:text-title-md mt-5 text-center">
              Sign In to <span className="text-3xl text-primary">Lound</span>{" "}
              dashboard
            </h2>
            <div className="w-full text-center text-red">{error}</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <HiOutlineEnvelope className="text-xl text-[#999999]" />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="userPassword"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    id="userPassword"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <CiLock className="text-2xl text-[#999999]" />
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  disabled={loader ? true : false}
                  value="Login"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:bg-opacity-70"
                />
              </div>

              <div className="mt-6 text-center"></div>
            </form>
          </div>
        </div>
      </div>
      {loader ? <Loader /> : ""}
    </div>
  );
};

export default Login;
