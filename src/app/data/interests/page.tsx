import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InterestsList from "@/components/Interests/InterestsList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const InterestsPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="41">
      <Breadcrumb parentName="Data Manage" pageName="관심 분야" />

      <div className="flex flex-col gap-10">
        <InterestsList url="/data/interests" />
      </div>
    </DefaultLayout>
  );
};

export default InterestsPage;
