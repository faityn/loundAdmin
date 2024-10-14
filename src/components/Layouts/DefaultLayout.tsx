"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/navigation";
import getRole from "@/helper/getRole";
interface WithRoleProps {
  children: ReactNode;
  allowedRoles: string[];
  menuId?: string;
}
export default function DefaultLayout({
  children,
  allowedRoles,
}: WithRoleProps) {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getAdminRole = async () => {
    const role = await getRole();
    if (role === "expired") {
      router.push("/login");
    } else {
      setUserRole(String(role));
    }
  };
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getAdminRole();
  }, []);

  return (
    <RecoilRoot>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          userRole={userRole}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            userRole={userRole}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {!allowedRoles.includes(userRole) ? (
                <div className=" text-3xl pt-10">Access Denied</div>
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>
    </RecoilRoot>
  );
}
