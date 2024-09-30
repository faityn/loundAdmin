import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionList from "@/components/Exhibition/ExhibitionList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const ExhibitionPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Exhibition Manage" pageName="Exhibition List" />

      <div className="flex flex-col gap-10">
        <ExhibitionList />
      </div>
    </DefaultLayout>
  );
};

export default ExhibitionPage;
