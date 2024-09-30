import { Metadata } from "next";
import AuthLayout from "@/components/Layouts/AuthLayout";
import Login from "@/components/Login/Login";

export const metadata: Metadata = {
  title: "Lound | Admin page - Login",
  icons: "/images/favicon.ico",
};

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
