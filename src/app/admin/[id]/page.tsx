import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminUpdate from "@/components/Admin/AdminUpdate";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};
interface PageProps {
  params: {
    id: number;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Admin Manage" pageName="Admin Update" />

      <div className="flex flex-col gap-10">
        <AdminUpdate id={params.id} url="/admin" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
