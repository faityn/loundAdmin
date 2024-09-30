import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerUpdate from "@/components/Banner/BannerUpdate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Banner Manage",
  icons: "/images/favicon.ico",
};

interface BannerPageProps {
  params: {
    id: number;
  };
}

const BannerUpdatePage: React.FC<BannerPageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Banner Manage" pageName="Banner Update" />

      <div className="flex flex-col gap-10">
        <BannerUpdate id={params.id} />
      </div>
    </DefaultLayout>
  );
};

export default BannerUpdatePage;
