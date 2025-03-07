import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UsersList from "@/components/users/UsersList";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};

export default function Home() {
  return (
    <>
      <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="1">
        <Breadcrumb parentName="회원 관리" pageName="회원 관리" />
        <div className="flex flex-col gap-10">
          <UsersList url="users" />
        </div>
      </DefaultLayout>
    </>
  );
}
