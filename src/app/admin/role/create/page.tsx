import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminRoleCreate from "@/components/Admin/AdminRoleCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};

export default function Role() {
  return (
    <>
      <DefaultLayout allowedRoles={["Super Admin"]}>
        <Breadcrumb parentName="Admin manage" pageName="Admin role create" />
        <div className="flex flex-col gap-10">
          <AdminRoleCreate url="/admin/role" />
        </div>
      </DefaultLayout>
    </>
  );
}
