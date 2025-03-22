import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};

export default function Home() {
  return (
    <>
      <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="1">
        <Breadcrumb parentName="종합 통계 대시보드" pageName="종합 통계 대시보드" />
        <div className="flex flex-col gap-10">
          <Dashboard />
        </div>
      </DefaultLayout>
    </>
  );
}
