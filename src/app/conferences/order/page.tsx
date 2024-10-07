import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ConferencesOrderList from "@/components/Conferences/ConferenceOrderList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

const ConferencesOrderPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb
        parentName="Conferences Manage"
        pageName="Conferences Order"
      />

      <div className="flex flex-col gap-10">
        <ConferencesOrderList />
      </div>
    </DefaultLayout>
  );
};

export default ConferencesOrderPage;
