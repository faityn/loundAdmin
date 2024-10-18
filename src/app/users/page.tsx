import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UsersList from "@/components/users/UsersList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Users",
  icons: "/images/favicon.ico",
};

const UsersPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="행사 관리" pageName="참가자 관리" />

      <div className="flex flex-col gap-10">
        <UsersList url="users" />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
