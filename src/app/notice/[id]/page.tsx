import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Update from "@/components/Data/NoticeUpdate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Content Manage",
  icons: "/images/favicon.ico",
};

interface PageProps {
  params: {
    id: number;
  };
}

const UpdatePage: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="51">
      <Breadcrumb parentName="Content Manage" pageName="Notice Update" />

      <div className="flex flex-col gap-10">
        <Update id={params.id} url="/notice" />
      </div>
    </DefaultLayout>
  );
};

export default UpdatePage;
