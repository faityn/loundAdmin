import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerList from "@/components/Banner/BannerList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Banner Manage",
  icons: "/images/favicon.ico",
};

const ContentPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Banner Manage" pageName="Banner List" />

      <div className="flex flex-col gap-10">
        <BannerList />
      </div>
    </DefaultLayout>
  );
};

export default ContentPage;
