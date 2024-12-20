import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InterestsUpdate from "@/components/Interests/InterestsUpdate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

interface PageProps {
  params: {
    id: number;
  };
}

const InterestsUpdatePage: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="41">
      <Breadcrumb parentName="Data Manage" pageName="Interests Update" />

      <div className="flex flex-col gap-10">
        <InterestsUpdate id={params.id} url="/data/interests" />
      </div>
    </DefaultLayout>
  );
};

export default InterestsUpdatePage;
