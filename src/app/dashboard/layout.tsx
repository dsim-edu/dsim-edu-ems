import DashboardLayout from "@/modules/dashboard/layouts";

export default function layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
