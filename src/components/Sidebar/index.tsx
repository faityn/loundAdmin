"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { VscFeedback } from "react-icons/vsc";
import { FaUsers, FaIndent, FaAtom } from "react-icons/fa";
import { SiGotomeeting } from "react-icons/si";
interface SidebarProps {
  userRole: string;
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ userRole, sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebar = useRef<any>(null);
  const storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

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

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-75 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark xl:static xl:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-4 ">
        <div className="flex items-end gap-2">
          <div className=" pb-2">
            <Link href="/">
              <img
                src={`/images/logo/lound-logo-white.png`}
                contextMenu="false"
                alt="logo "
                className="max-h-[40px] max-w-[140px]  "
              />
            </Link>
          </div>
          <div className="text-xl text-blue-300">Admin Page</div>
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
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/users" || pathname.includes("users")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out  hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/users" ||
                            pathname.includes("users")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUsers />
                        회원 관리
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
                          <li>
                            <Link
                              href="/users"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/users" && "text-white"
                              }`}
                            >
                              회원 관리
                            </Link>
                          </li>

                          <li
                            className={`${
                              userRole === "Super Admin" ? "" : "hidden"
                            }`}
                          >
                            <Link
                              href="/users/exhibition_organizer"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/users/exhibition_organizer" &&
                                "text-white"
                              }`}
                            >
                              행사 주최사 관리
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/exhibition" || pathname.includes("exhibition")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/exhibition" ||
                            pathname.includes("exhibition")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <SiGotomeeting />
                        행사 관리
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
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/exhibition"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/exhibition" && "text-white"
                              }`}
                            >
                              등록 행사 승인
                            </Link>
                          </li>

                          <li>
                            <Link
                              href="/exhibition/create"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/exhibition/create" &&
                                "text-white"
                              }`}
                            >
                              행사 등록
                            </Link>
                          </li>

                          <li
                            className={
                              userRole === "Super Admin" ? "" : "hidden"
                            }
                          >
                            <Link
                              href="/exhibition/exhibition_users"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/exhibition/exhibition_users" &&
                                "text-white"
                              }`}
                            >
                              행사 참가자 등록
                            </Link>
                          </li>
                          <li
                            className={
                              userRole === "Super Admin" ? "" : "hidden"
                            }
                          >
                            <Link
                              href="/exhibition/exhibition_users/manage"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname ===
                                  "/exhibition/exhibition_users/manage" &&
                                "text-white"
                              }`}
                            >
                              행사 참가자 관리
                            </Link>
                          </li>
                          <li
                            className={
                              userRole === "Super Admin" ? "" : "hidden"
                            }
                          >
                            <Link
                              href="/exhibition/feedback"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/exhibition/feedback" &&
                                "text-white"
                              }`}
                            >
                              행사 피드백 관리
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/exhibition/lectures"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/exhibition/lectures" &&
                                "text-white"
                              }`}
                            >
                              강연 관리
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/conferences" ||
                  pathname.includes("conferences")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out  hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/conferences" ||
                            pathname.includes("conferences")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaAtom />
                        회의 관리
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
                          <li>
                            <Link
                              href="/conferences"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/conferences" &&
                                pathname.includes("/conferences") &&
                                "text-white"
                              }`}
                            >
                              회의 목록 확인 및 설정
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/data" || pathname.includes("/data")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`${
                          userRole === "Super Admin" ? "" : "hidden"
                        } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/data" || pathname.includes("data")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <VscFeedback />
                        입력 데이터 관리
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
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          {/* <li
                            className={
                              userRole === "Super Admin" ? "" : "hidden"
                            }
                          >
                            <Link
                              href="/data"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/data" && "text-white"
                              }`}
                            >
                              입력 데이터 관리
                            </Link>
                          </li> */}
                          <li
                            className={
                              userRole === "Super Admin" ? "" : "hidden"
                            }
                          >
                            <Link
                              href="/data/interests"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname.includes("/data/interests") &&
                                "text-white"
                              }`}
                            >
                              관심 분야
                            </Link>
                          </li>
                          <li
                            className={
                              userRole === "Super Admin" ? "" : "hidden"
                            }
                          >
                            <Link
                              href="/data/purposes"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname.includes("/data/purposes") &&
                                "text-white"
                              }`}
                            >
                              참가 목적
                            </Link>
                          </li>
                          <li
                            className={
                              userRole === "Super Admin" ? "" : "hidden"
                            }
                          >
                            <Link
                              href="/data/profession"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname.includes("/data/profession") &&
                                "text-white"
                              }`}
                            >
                              직업
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/banner" || pathname.includes("banner")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`${
                          userRole === "Super Admin" ? "" : "hidden"
                        } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/banner" ||
                            pathname.includes("banner")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaIndent />
                        배너 관리
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
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/banner"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/banner" && "text-white"
                              }`}
                            >
                              배너 관리
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}
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
