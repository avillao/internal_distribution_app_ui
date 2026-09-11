import AdminDashboardShell from "@/shared/components/dashboard/adminDashboardShell";
import DashboardHeader from "@/shared/components/dashboard/header";
import AuthHydrator from "@/features/auth/components/hydrator/authHydrator";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (<>
        {/* <AuthHydrator> */}
            <DashboardHeader />
            <AdminDashboardShell>
                {children}
            </AdminDashboardShell>
        {/* </AuthHydrator> */}
        </>
    )
}