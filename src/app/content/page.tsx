import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ContentList from "@/components/Content/ContentList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Content Manage",
  icons: "/images/favicon.ico",
};

const ContentPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Content Manage" pageName="Content List" />

      <div className="flex flex-col gap-10">
        <ContentList />
      </div>
    </DefaultLayout>
  );
};

export default ContentPage;
