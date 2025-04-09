"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Gem,
  Gift,
  GitPullRequestCreateIcon,
  LayoutDashboard,
  ListStart,
  ListTodo,
  Mars,
  ScanFace,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import adminUserImg from "../../../../public/admin-user.jpg";

const sidebarOptions = [
  {
    section: "Statistic Section",
    options: [
      {
        name: "Statistics & Overviews",
        url: "/dashboard/overview",
        icon: LayoutDashboard,
      },
      // {
      //   name: "All Earnings",
      //   url: "/dashboard/earnings/all",
      //   icon: Landmark,
      // },
      {
        name: "Add Spending",
        url: "/dashboard/spending/create",
        icon: Send,
      },
      {
        name: "All Spendings",
        url: "/dashboard/spending/all",
        icon: ListTodo,
      },
    ],
  },
  {
    section: "Student Section",
    options: [
      {
        name: "Student Lists",
        url: "/dashboard/student/all",
        icon: ListStart,
      },
      {
        name: "Create Student",
        url: "/dashboard/student/create",
        icon: GitPullRequestCreateIcon,
      },
    ],
  },
  {
    section: "Teacher Section",
    options: [
      {
        name: "Teachers Lists",
        url: "/dashboard/teacher/all",
        icon: ScanFace,
      },
      {
        name: "Create Teacher",
        url: "/dashboard/teacher/create",
        icon: Mars,
      },
    ],
  },
  {
    section: "Donations",
    options: [
      {
        name: "Donation History",
        url: "/dashboard/donation/all",
        icon: Gift,
      },
      {
        name: "Add Donar",
        url: "/dashboard/donation/create",
        icon: Gem,
      },
    ],
  },
];
export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="z-50">
      <SidebarContent className="bg-zinc-900 ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl mt-1 font-black text-purple-500">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="p-3 ">
              {sidebarOptions.map((item) => (
                <div key={item.section}>
                  <h1 className="mb-1 border-b pb-1">{item.section}</h1>
                  <div className="mb-4">
                    {item.options.map((info) => (
                      <Link key={info.url} href={info.url}>
                        <div
                          className={cn(
                            "flex items-center py-2 transition-all hover:text-purple-500 text-gray-400 gap-2",
                            pathname.split("?")[0] === info.url &&
                              "bg-zinc-800 rounded-md pl-2"
                          )}
                        >
                          <info.icon className="size-4" />
                          <span>{info.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-5">
                <div className="size-8 overflow-hidden bg-white rounded-full">
                  <Image
                    src={adminUserImg}
                    height={30}
                    width={30}
                    alt="profile"
                    className="w-full translate-y-1 bg-white"
                  />
                </div>
                <div className="">
                  <h1 className="text-xs font-bold">Super Admin</h1>
                  <h3 className="text-xs text-slate-400">
                    Institution Manager
                  </h3>
                </div>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
