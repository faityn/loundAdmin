import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminRoleList from "@/components/Admin/AdminRoleList";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};

export default function Role() {
  return (
    <>
      <DefaultLayout allowedRoles={["Super Admin"]}>
        <Breadcrumb parentName="Admin manage" pageName="Admin role" />
        <div className="flex flex-col gap-10">
          <AdminRoleList />
        </div>
      </DefaultLayout>
    </>
  );
}
