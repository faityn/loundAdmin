import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerCreate from "@/components/Banner/BannerCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Banner Manage",
  icons: "/images/favicon.ico",
};

const BannerCreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="61">
      <Breadcrumb parentName="Banner Manage" pageName="Banner Create" />

      <div className="flex flex-col gap-10">
        <BannerCreate />
      </div>
    </DefaultLayout>
  );
};

export default BannerCreatePage;
