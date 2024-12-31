import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExhibitionTable from "@/components/Exhibition/ExhibitionTable";

export const metadata: Metadata = {
  title: "Lound | Admin page - Exhibition Manage",
  icons: "/images/favicon.ico",
};

interface PageProps {
  params: {
    id: number;
  };
}
const UpdatePage: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="23">
      <Breadcrumb parentName="행사 관리" pageName="회의 테이블 등록" />

      <div className="flex flex-col gap-10">
        <ExhibitionTable id={params.id} url="/exhibition" />
      </div>
    </DefaultLayout>
  );
};

export default UpdatePage;
