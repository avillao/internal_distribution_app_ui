"use client";

import useStore from "@/shared/hooks/useStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashBoardAdmin () {
    const roles = useStore((state)=>state.roles);
    const isAuthenticated = useStore((state)=>state.isAuthenticated);

    useEffect(()=>{
        if (isAuthenticated && !roles.includes("admin")){
            redirect("/dashboard");
        }
    }, [isAuthenticated, roles])

    return ( 
        <div>
            Admin
        </div>
    )
}