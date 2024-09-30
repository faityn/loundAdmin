import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ApplyList from "@/components/Events/ApplyList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Events Manage",
  icons: "/images/favicon.ico",
};

const EventApplyListPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Events Manage" pageName="Events Apply List" />

      <div className="flex flex-col gap-10">
        <ApplyList />
      </div>
    </DefaultLayout>
  );
};

export default EventApplyListPage;
