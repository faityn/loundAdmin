import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Lound | Admin page",
  description: "Lound Admin page",
  icons: "/images/favicon.ico",
};

export default function Home() {
  return (
    <>
      <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
        <Breadcrumb parentName="" pageName="" />
        <div className="flex flex-col gap-10"></div>
      </DefaultLayout>
    </>
  );
}
