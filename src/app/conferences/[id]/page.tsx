import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ConferenceUpdate from "@/components/Conferences/ConferenceUpdate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

interface PageProps {
  params: {
    id: number;
  };
}
const UpdatePage: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb
        parentName="Conferences Manage"
        pageName="Conferences Update"
      />

      <div className="flex flex-col gap-10">
        <ConferenceUpdate id={params.id} url="/conferences" />
      </div>
    </DefaultLayout>
  );
};

export default UpdatePage;
