import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionFeedbackList from "@/components/Exhibition/ExhibitionFeedbackList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

const ExhibitionFeedbackPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="25">
      <Breadcrumb parentName="행사 관리" pageName="행사 피드백 관리" />

      <div className="flex flex-col gap-10">
        <ExhibitionFeedbackList url="exhibition/feedback" />
      </div>
    </DefaultLayout>
  );
};

export default ExhibitionFeedbackPage;
