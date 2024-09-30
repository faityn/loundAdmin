import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionUsersList from "@/components/Exhibition/ExhibitionUsersList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const ExhibitionUsersPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb
        parentName="Exhibition Manage"
        pageName="Exhibition Users List"
      />

      <div className="flex flex-col gap-10">
        <ExhibitionUsersList />
      </div>
    </DefaultLayout>
  );
};

export default ExhibitionUsersPage;
