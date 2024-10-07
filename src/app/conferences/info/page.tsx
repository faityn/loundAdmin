import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ConferenceInfoList from "@/components/Conferences/ConferenceInfoList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

const ConferenceInfoPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Conferences Manage" pageName="Conferences Info" />

      <div className="flex flex-col gap-10">
        <ConferenceInfoList />
      </div>
    </DefaultLayout>
  );
};

export default ConferenceInfoPage;
