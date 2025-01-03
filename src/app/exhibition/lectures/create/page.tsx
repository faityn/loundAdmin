import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionLectureCreate from "@/components/Exhibition/ExhibitionLectureCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const CreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="26">
      <Breadcrumb parentName="강연 관리" pageName="강연 등록" />

      <div className="flex flex-col gap-10">
        <ExhibitionLectureCreate url="/exhibition/lectures" />
      </div>
    </DefaultLayout>
  );
};

export default CreatePage;
