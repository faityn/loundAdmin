import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ConferencePreparationList from "@/components/Conferences/ConferencePreparationList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

const ConferencePreparationPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb
        parentName="Conferences Manage"
        pageName="Conferences Preparation"
      />

      <div className="flex flex-col gap-10">
        <ConferencePreparationList />
      </div>
    </DefaultLayout>
  );
};

export default ConferencePreparationPage;
