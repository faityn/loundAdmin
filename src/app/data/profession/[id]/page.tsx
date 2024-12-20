import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProfessionUpdate from "@/components/Profession/ProfessionUpdate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

interface PageProps {
  params: {
    id: number;
  };
}

const ProfessionUpdatePage: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="43">
      <Breadcrumb parentName="Data Manage" pageName="Profession Update" />

      <div className="flex flex-col gap-10">
        <ProfessionUpdate id={params.id} url="/data/profession" />
      </div>
    </DefaultLayout>
  );
};

export default ProfessionUpdatePage;
