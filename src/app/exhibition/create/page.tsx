import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionCreate from "@/components/Exhibition/ExhibitionCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const CreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Exhibition Manage" pageName="Exhibition Create" />

      <div className="flex flex-col gap-10">
        <ExhibitionCreate url="/exhibition" />
      </div>
    </DefaultLayout>
  );
};

export default CreatePage;