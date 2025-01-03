import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CommunityList from "@/components/Community/CommunityList";

export const metadata: Metadata = {
  title: "Lound | Admin page - 커뮤니티 Manage",
  icons: "/images/favicon.ico",
};

const CommunityPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="71">
      <Breadcrumb parentName="커뮤니티 관리" pageName="커뮤니티 리스트" />

      <div className="flex flex-col gap-10">
        <CommunityList url="/community" />
      </div>
    </DefaultLayout>
  );
};

export default CommunityPage;
