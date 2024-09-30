import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Update from "@/components/Privacy/PrivacyUpdate";

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
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb
        parentName="Content Manage"
        pageName="Privacy Policy Update"
      />

      <div className="flex flex-col gap-10">
        <Update id={params.id} url="/privacy" />
      </div>
    </DefaultLayout>
  );
};

export default UpdatePage;
