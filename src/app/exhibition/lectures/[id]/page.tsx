import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import ExhibitionLectureUpdate from "@/components/Exhibition/ExhibitionLectureUpdate";

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
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb
        parentName="Exhibition Manage"
        pageName="Exhibition Lecture Update"
      />

      <div className="flex flex-col gap-10">
        <ExhibitionLectureUpdate id={params.id} url="/exhibition/lectures" />
      </div>
    </DefaultLayout>
  );
};

export default UpdatePage;
