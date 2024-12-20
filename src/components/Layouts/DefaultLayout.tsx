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

type MenuItem = {
  menuId: number;
  status?: string;
  children?: MenuItem[];
};
export default function DefaultLayout({ children, menuId }: WithRoleProps) {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const getAdminRole = async () => {
    const role = await getRole();

    if (role === "expired") {
      router.push("/login");
    } else {
      setUserRole(String(role?.role));
      setMenuList(role?.menu);
    }
  };
  const findByMenuId = (array: MenuItem[], menuId: number): MenuItem | null => {
    for (const item of array) {
      if (item.menuId === menuId || menuId === 1) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const found = findByMenuId(item.children, menuId);
        if (found) {
          return found;
        }
      }
    }
    return null; // Return null if not found
  };

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getAdminRole();
  }, []);
  // useEffect(() => {
  //   findByMenuId(menuList, Number(menuId));
  // }, [menuList]);
  return (
    <RecoilRoot>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          menuList={menuList}
          menuId={Number(menuId)}
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
              {findByMenuId(menuList, Number(menuId)) === null ? (
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
