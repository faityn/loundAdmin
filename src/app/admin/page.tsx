import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminList from "@/components/Admin/AdminList";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};

export default function Home() {
  return (
    <>
      <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
        <Breadcrumb parentName="Admin manage" pageName="Admin list" />
        <div className="flex flex-col gap-10">
          <AdminList />
        </div>
      </DefaultLayout>
    </>
  );
}
