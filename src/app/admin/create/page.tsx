import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminCreate from "@/components/Admin/AdminCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};

export default function Page() {
  return (
    <>
      <DefaultLayout allowedRoles={["Super Admin"]} menuId="11">
        <Breadcrumb parentName="Admin manage" pageName="Admin create" />
        <div className="flex flex-col gap-10">
          <AdminCreate url="/admin" />
        </div>
      </DefaultLayout>
    </>
  );
}
