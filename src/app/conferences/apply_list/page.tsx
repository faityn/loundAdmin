import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ConferenceApplyList from "@/components/Conferences/ApplyList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

const ConferenceApplyListPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb
        parentName="Conferences Manage"
        pageName="Conferences Apply List"
      />

      <div className="flex flex-col gap-10">
        <ConferenceApplyList />
      </div>
    </DefaultLayout>
  );
};

export default ConferenceApplyListPage;
