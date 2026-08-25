"use client";

import useStore from "@/shared/hooks/useStore"
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardCatalogo () {
    const roles = useStore((state)=>state.roles);
    const isAuthenticated = useStore((state)=>state.isAuthenticated);

    useEffect(()=>{
        if (isAuthenticated && roles.find((rol)=>rol.startsWith("user_")) == undefined){
            redirect("/dashboard");
        }
    }, [isAuthenticated, roles])

    return (
        <div>
            Catalogo
        </div>
    )
}