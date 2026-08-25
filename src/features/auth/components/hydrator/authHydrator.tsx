"use client";

import { AuthToken } from "@/app/dashboard/layout";
import useStore from "@/shared/hooks/useStore";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react"

export default function AuthHydrator({
  token,
  children,
}: {
  token?: string
  children: React.ReactNode
}) {
    const isAuthenticated = useStore((state)=>state.isAuthenticated);
    const roles = useStore((state)=>state.roles);
    const setIsAuthenticated = useStore((state)=>state.setIsAuthenticated);
    const setRoles = useStore((state)=>state.setRoles);

    useEffect(()=>{
        if (token && (!isAuthenticated || roles.length == 0)){
            const user = jwtDecode<AuthToken>(token || "{}");
            setIsAuthenticated(true);
            setRoles(user.resource_access["internal_distribution_app"].roles)
        }
    },[isAuthenticated, roles]);
  

  return <>{children}</>
}