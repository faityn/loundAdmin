import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableOrderList from "@/components/Conferences/TableOrderList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Conferences Manage",
  icons: "/images/favicon.ico",
};

const TableOrderPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="32">
      <Breadcrumb parentName="회의 관리" pageName="회의 테이블 예약 확인" />

      <div className="flex flex-col gap-10">
        <TableOrderList url="/table_order_manage" />
      </div>
    </DefaultLayout>
  );
};

export default TableOrderPage;
