"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import React, { Suspense } from "react";
import { AppSidebar } from "./AppSideBar";
import { Toaster } from "sonner";
import { ChildrenProps } from "@/data/types";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { userLogout } from "@/modules/marketing/server/user.action";
import { useUserAuth } from "@/modules/marketing/hooks/use-user";

const DashboardLayout = ({ children }: ChildrenProps) => {
  const { data: auth } = useUserAuth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className=""></div>
      <main className="w-full bg-star-moon z-20 ">
        <div
          className={cn(
            "flex w-full z-10 items-center justify-between gap-4 px-1   bg-stone-900/50 py-3 "
          )}
        >
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="md:text-xl text-sm text-purple-500 font-bold ">
              দারুস সুন্নাহ ইসলামিয়া মাদ্রাসা
            </h1>
          </div>
          {auth && (
            <Button
              variant={"ghost"}
              onClick={async () => await userLogout()}
              className="hover:text-red-400 cursor-pointer"
            >
              logout <LogOut />
            </Button>
          )}
        </div>
        <div className="w-full p-3  min-h-dvh text-black">
          <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
          <Toaster />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
