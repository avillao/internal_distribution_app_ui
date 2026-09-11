"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/features/auth/hooks/useAuth";
import useStore from "@/shared/hooks/useStore";

export default function DashboardHome() {
    const router = useRouter();
    const { me, isLoading } = useAuth();
    const isAuthenticated = useStore((state)=> state.isAuthenticated);
    const roles = useStore((state)=> state.roles);

    useEffect(() => {
        me().then().catch();
    }, []);

    useEffect(() => {
        console.log("isLoading", `${isLoading}`)
        if (isLoading) {
            return;
        }

        console.log("isAuthenticated", `${isAuthenticated}`)
        if (!isAuthenticated) {
            router.replace("/login");
            return;
        }

        console.log("roles", roles)
        if (roles.includes("admin")) {
            router.replace("/dashboard/admin");
            return;
        }

        if (roles.some(role => role.startsWith("user_"))) {
            router.replace("/dashboard/catalogo");
            return;
        }

        router.replace("/login");

    }, [isLoading, roles, router]);

    return <div />;
}