import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionList from "@/components/Exhibition/ExhibitionList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const ExhibitionPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="행사 관리" pageName="등록 행사 승인" />

      <div className="flex flex-col gap-10">
        <ExhibitionList url="exhibition" />
      </div>
    </DefaultLayout>
  );
};

export default ExhibitionPage;
