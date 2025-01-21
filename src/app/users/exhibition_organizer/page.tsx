import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionOrganizerList from "@/components/users/ExhibitionOrganizerList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition organizer",
  icons: "/images/favicon.ico",
};

const UsersPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="13">
      <Breadcrumb parentName="회원 관리" pageName="행사 주최사 관리" />

      <div className="flex flex-col gap-10">
        <ExhibitionOrganizerList />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
