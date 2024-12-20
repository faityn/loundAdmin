import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionUsersListManage from "@/components/Exhibition/ExhibitionUsersListManage";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const ExhibitionUsersManagePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="24">
      <Breadcrumb parentName="참가자 관리" pageName="통합 관리자" />

      <div className="flex flex-col gap-10">
        <ExhibitionUsersListManage url="exhibition/exhibition_users/manage" />
      </div>
    </DefaultLayout>
  );
};

export default ExhibitionUsersManagePage;
