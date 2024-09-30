import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EventPreparationList from "@/components/Events/EventPreparationList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Events Manage",
  icons: "/images/favicon.ico",
};

const EventPreparationPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Events Manage" pageName="Events Preparation" />

      <div className="flex flex-col gap-10">
        <EventPreparationList />
      </div>
    </DefaultLayout>
  );
};

export default EventPreparationPage;
