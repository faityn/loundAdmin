import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionLecturesList from "@/components/Exhibition/ExhibitionLecturesList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const ExhibitionLecturesPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="26">
      <Breadcrumb parentName="강연 관리" pageName="강연 관리" />

      <div className="flex flex-col gap-10">
        <ExhibitionLecturesList url="exhibition/lectures" />
      </div>
    </DefaultLayout>
  );
};

export default ExhibitionLecturesPage;
