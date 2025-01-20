import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CommunityListManage from "@/components/Community/CommunityListManage";

export const metadata: Metadata = {
  title: "Lound | Admin page - 커뮤니티 관리",
  icons: "/images/favicon.ico",
};

const CommunityPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="71">
      <Breadcrumb parentName="" pageName="커뮤니티 관리" />

      <div className="flex flex-col gap-10">
        <CommunityListManage url="/community_manage" />
      </div>
    </DefaultLayout>
  );
};

export default CommunityPage;
