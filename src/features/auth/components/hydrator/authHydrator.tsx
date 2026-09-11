"use client";

import useStore from "@/shared/hooks/useStore";
import { useEffect } from "react"

export default function AuthHydrator({
  children,
}: {
  children: React.ReactNode
}) {
    const isAuthenticated = useStore((state)=>state.isAuthenticated);
    const roles = useStore((state)=>state.roles);
    const setIsAuthenticated = useStore((state)=>state.setIsAuthenticated);
    const setRoles = useStore((state)=>state.setRoles);

    useEffect(() => {
      if (!isAuthenticated || roles.length === 0) {
        setIsAuthenticated(true);
        setRoles([]);
      }
    }, [isAuthenticated, roles.length, setIsAuthenticated, setRoles]);
  

  return <>{children}</>
}