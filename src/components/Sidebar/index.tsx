"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { VscFeedback } from "react-icons/vsc";
import { FaUsers, FaIndent, FaAtom } from "react-icons/fa";
import { SiGotomeeting } from "react-icons/si";
import { RiListSettingsLine } from "react-icons/ri";
import { LiaUsersSolid } from "react-icons/lia";
import { menuPermissionAtom } from "@/atom";
import { useSetRecoilState } from "recoil";
import { AdminChildMenuType, AdminMenuType } from "@/types/adminType";
interface SidebarProps {
  menuList: AdminMenuType[];
  menuId: number;
  userRole: string;
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({
  menuList,
  menuId,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebar = useRef<any>(null);
  const storedSidebarExpanded = "true";

  const setMenuPermission = useSetRecoilState(menuPermissionAtom);
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const findByMenuId = (
    array: AdminMenuType[],
    menuId: number
  ): AdminMenuType | null => {
    for (const item of array) {
      if (item.menuId === menuId) {
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

    
    const foundItem = findByMenuId(menuList, Number(menuId));
    setMenuPermission({ menuId: foundItem?.menuId, status: foundItem?.status });
  }, [menuList]);
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const hasUrlInChildren = (
    children: AdminChildMenuType,
    url: string
  ): boolean => {
    return children.some((child) => child.url === url);
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-75 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark xl:static xl:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-4 ">
        <div className="flex items-center justify-between gap-2  w-full ">
          <div className="w-[150px] mx-auto   ">
            <Link href="/">
              <img
                src={`/images/logo/lound-logo-white.png`}
                contextMenu="false"
                alt="logo "
                className="h-[50px] w-[136px]  "
              />
            </Link>
          </div>
        </div>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-1 lg:px-6">
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2"></h3> */}
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuList?.map((item, index) => (
                <SidebarLinkGroup
                  key={index}
                  activeCondition={hasUrlInChildren(
                    item?.children as AdminChildMenuType,
                    pathname
                  )}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out  hover:bg-graydark dark:hover:bg-meta-4 `}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          {item?.menuId === 10 ? (
                            <FaUsers />
                          ) : item?.menuId === 20 ? (
                            <SiGotomeeting />
                          ) : item?.menuId === 30 ? (
                            <FaAtom />
                          ) : item?.menuId === 40 ? (
                            <VscFeedback />
                          ) : item?.menuId === 50 ? (
                            <RiListSettingsLine />
                          ) : item?.menuId === 60 ? (
                            <FaIndent />
                          ) : (
                            <LiaUsersSolid />
                          )}
                          {item?.menu_name}
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </Link>

                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            {item?.children?.map((sub, s) => (
                              <li key={s}>
                                <Link
                                  href={String(sub?.url)}
                                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                    pathname === sub?.url && "text-white"
                                  }`}
                                >
                                  {sub?.menu_name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ))}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
