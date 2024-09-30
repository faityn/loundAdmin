import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EventsList from "@/components/Events/EventsList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Events Manage",
  icons: "/images/favicon.ico",
};

const EventPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Events Manage" pageName="Events List" />

      <div className="flex flex-col gap-10">
        <EventsList />
      </div>
    </DefaultLayout>
  );
};

export default EventPage;
