"use client";

import useStore from "@/shared/hooks/useStore";
import AdminSidebar from "@/shared/components/dashboard/adminSidebar";
import Styles from "@/shared/styles/dashboard/admin-sidebar.module.css";
import { usePathname } from "next/navigation";

export default function AdminDashboardShell({ children }: { children: React.ReactNode }) {
    const roles = useStore((state) => state.roles);
    const pathname = usePathname();
    const isAdminRoute = pathname === "/dashboard/admin" || pathname.startsWith("/dashboard/admin/");
    const showAdminSidebar = roles.includes("admin") && isAdminRoute;

    return (
        <div className={Styles.dashboardShell}>
            {showAdminSidebar && <AdminSidebar />}
            <div className={showAdminSidebar ? Styles.dashboardContent : undefined}>
                {children}
            </div>
        </div>
    );
}