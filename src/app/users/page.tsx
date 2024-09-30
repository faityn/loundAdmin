import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UsersList from "@/components/users/UsersList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Users",
  icons: "/images/favicon.ico",
};

const UsersPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Users Manage" pageName="Users List" />

      <div className="flex flex-col gap-10">
        <UsersList />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
