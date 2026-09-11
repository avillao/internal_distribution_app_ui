"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Styles from "@/shared/styles/dashboard/admin-sidebar.module.css";

const navigationItems = [
    { label: "Aplicaciones", href: "/dashboard/admin/aplicaciones", icon: "bi-grid-1x2" },
    { label: "Artefactos", href: "/dashboard/admin/artefactos", icon: "bi-box-seam" },
    { label: "Permisos", href: "/dashboard/admin/permisos", icon: "bi-shield-lock" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className={Styles.sidebar} aria-label="Administración">
            <div className={Styles.sidebarHeader}>
                <span className={Styles.eyebrow}>Workspace</span>
                <h2>Administración</h2>
            </div>
            <nav className={Styles.navigation}>
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                        <Link className={`${Styles.navLink} ${isActive ? Styles.active : ""}`} href={item.href} key={item.href}>
                            <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                            <span>{item.label}</span>
                            {isActive && <span className={Styles.activeIndicator} aria-hidden="true"></span>}
                        </Link>
                    );
                })}
            </nav>
            <div className={Styles.sidebarFooter}>
                <span className={Styles.statusDot} aria-hidden="true"></span>
                <span>Entorno interno</span>
            </div>
        </aside>
    );
}