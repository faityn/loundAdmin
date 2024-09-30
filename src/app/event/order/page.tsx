import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EventOrderList from "@/components/Events/EventOrderList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Events Manage",
  icons: "/images/favicon.ico",
};

const EventOrderPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Events Manage" pageName="Events Order" />

      <div className="flex flex-col gap-10">
        <EventOrderList />
      </div>
    </DefaultLayout>
  );
};

export default EventOrderPage;
