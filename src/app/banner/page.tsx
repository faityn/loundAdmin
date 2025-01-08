import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerList from "@/components/Banner/BannerList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Banner Manage",
  icons: "/images/favicon.ico",
};

const ContentPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="61">
      <Breadcrumb parentName="배너 관리" pageName="배너 관리" />

      <div className="flex flex-col gap-10">
        <BannerList />
      </div>
    </DefaultLayout>
  );
};

export default ContentPage;
