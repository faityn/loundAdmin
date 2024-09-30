import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UsersActivityDataList from "@/components/users/UsersActivityDataList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Users",
  icons: "/images/favicon.ico",
};

const ActivityDataPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Users Manage" pageName="Users Activity Data" />

      <div className="flex flex-col gap-10">
        <UsersActivityDataList />
      </div>
    </DefaultLayout>
  );
};

export default ActivityDataPage;
