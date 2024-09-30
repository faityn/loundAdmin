import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EventInfoList from "@/components/Events/EventInfoList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Events Manage",
  icons: "/images/favicon.ico",
};

const EventInfoPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Events Manage" pageName="Events Info" />

      <div className="flex flex-col gap-10">
        <EventInfoList />
      </div>
    </DefaultLayout>
  );
};

export default EventInfoPage;
