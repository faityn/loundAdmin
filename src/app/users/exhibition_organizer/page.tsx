import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionOrganizerList from "@/components/users/ExhibitionOrganizerList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition organizer",
  icons: "/images/favicon.ico",
};

const UsersPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb
        parentName="Exhibition Organizer Manage"
        pageName="Exhibition organizer"
      />

      <div className="flex flex-col gap-10">
        <ExhibitionOrganizerList url="users/exhibition_organizer" />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
