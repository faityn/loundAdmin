import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ConferencesList from "@/components/Conferences/ConferencesList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

const ConferencesPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="31">
      <Breadcrumb parentName="회의 관리" pageName="회의 신청 목록 승인" />

      <div className="flex flex-col gap-10">
        <ConferencesList url="conferences" />
      </div>
    </DefaultLayout>
  );
};

export default ConferencesPage;
