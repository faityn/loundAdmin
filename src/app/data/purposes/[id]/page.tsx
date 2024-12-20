import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PurposesUpdate from "@/components/Purposes/PurposesUpdate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

interface PageProps {
  params: {
    id: number;
  };
}

const PurposesUpdatePage: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="42">
      <Breadcrumb parentName="Data Manage" pageName="Purpose Update" />

      <div className="flex flex-col gap-10">
        <PurposesUpdate id={params.id} url="/data/purposes" />
      </div>
    </DefaultLayout>
  );
};

export default PurposesUpdatePage;
