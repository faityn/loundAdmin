"use client";
import React, { ReactNode } from "react";

import { RecoilRoot } from "recoil";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <div className="flex h-screen overflow-hidden">
        <div className="relative login_bg flex flex-1 flex-col overflow-y-auto overflow-x-hidden pt-20">
          <main>
            <div className="mx-auto max-w-[1700px] ">
              <div className=" pb-2 pl-4">
                <img
                  src={`/images/logo/lound-logo-white.png`}
                  contextMenu="false"
                  alt="logo "
                  className="max-h-[40px] max-w-[140px]  "
                />
              </div>
            </div>
            <div className="mx-auto max-w-[1600px] p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </RecoilRoot>
  );
}
