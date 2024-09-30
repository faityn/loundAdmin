import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Settings from "@/components/Data/Settings";

export const metadata: Metadata = {
  title: "MICE | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const SettingsPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Settings" pageName="Settings" />

      <div className="flex flex-col gap-10">
        <Settings />
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;
