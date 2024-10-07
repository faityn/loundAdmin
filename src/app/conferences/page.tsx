import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ConferencesList from "@/components/Conferences/ConferencesList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

const ConferencesPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Conferences Manage" pageName="Conferences List" />

      <div className="flex flex-col gap-10">
        <ConferencesList url="/conferences" />
      </div>
    </DefaultLayout>
  );
};

export default ConferencesPage;
