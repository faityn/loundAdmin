import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InterestsCreate from "@/components/Interests/InterestsCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const InterestsCreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="41">
      <Breadcrumb parentName="Data Manage" pageName="Interests Create" />

      <div className="flex flex-col gap-10">
        <InterestsCreate url="/data/interests" />
      </div>
    </DefaultLayout>
  );
};

export default InterestsCreatePage;
