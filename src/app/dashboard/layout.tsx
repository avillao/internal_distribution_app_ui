import DashboardHeader from "@/shared/components/dashboard/header";
import { cookies } from 'next/headers'
import AuthHydrator from "@/features/auth/components/hydrator/authHydrator";

export interface AuthToken {
    preferred_username: string;
    email: string;
    family_name: string;
    given_name: string;
    name: string;
    resource_access: {
        [key: string] : {
            roles: string[]
        }
    }
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const token = (await cookies()).get("access_token")?.value;

    return (
        <>
            <DashboardHeader />
            <div>
                <AuthHydrator token={token}>
                    {children}
                </AuthHydrator>
            </div>
        </>
    )
}