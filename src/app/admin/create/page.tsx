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
        <Breadcrumb parentName="운영자 관리" pageName="운영자 등록" />
        <div className="flex flex-col gap-10">
          <AdminCreate url="/admin" />
        </div>
      </DefaultLayout>
    </>
  );
}
