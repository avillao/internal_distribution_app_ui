"use client";

import useStore from "@/shared/hooks/useStore";
import Styles from "@/shared/styles/dashboard/dashboard.header.module.css";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function DashboardHeader () {
    const roles = useStore((state)=>state.roles);
    const pathname = usePathname();

    return (
        <header className={`d-flex flex-column justify-content-center ${Styles.headerContainer}`}>
            <div className="d-flex flex-row justify-content-between px-4">
                <div className={`d-flex flex-row justify-content-evenly ${Styles.headerSectionMenu}`}>
                    <div className="px-3 py-2">
                        <span>Internal App Distribution</span>
                    </div>
                    <nav className="nav nav-underline">
                        {roles.includes("admin") && <Link className={`nav-link ${pathname.includes("admin")? "active" : ""}`}  href={"/dashboard/admin"}>Admin</Link>}
                        {roles.find((rol)=>rol.startsWith("user_")) != undefined && <Link className={`nav-link ${pathname.includes("catalogo")? "active" : ""}`} href={"/dashboard/catalogo"}>Catalogo</Link>}
                    </nav>
                </div>
                <div className={`d-flex flex-row justify-content-center ${Styles.headerSectionConfig}`}>
                    <i className="bi bi-person-circle"></i>
                </div>
            </div>
        </header>
    )
}