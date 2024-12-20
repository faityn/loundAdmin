import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionUsersList from "@/components/Exhibition/ExhibitionUsersList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const ExhibitionUsersPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="23">
      <Breadcrumb parentName="행사 관리" pageName="행사 참가자 관리" />

      <div className="flex flex-col gap-10">
        <ExhibitionUsersList url="exhibition/exhibition_users" />
      </div>
    </DefaultLayout>
  );
};

export default ExhibitionUsersPage;
