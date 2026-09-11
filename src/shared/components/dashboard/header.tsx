"use client";

import useStore from "@/shared/hooks/useStore";
import Styles from "@/shared/styles/dashboard/dashboard.header.module.css";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardHeader () {
    const roles = useStore((state)=>state.roles);
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAdmin = roles.includes("admin");
    const isClient = roles.some((role) => role.startsWith("user_"));

    return (
        <header className={Styles.headerContainer}>
            <div className={Styles.headerInner}>
                <Link className={Styles.brand} href="/dashboard" aria-label="Internal App Distribution, inicio">
                    <span className={Styles.brandMark} aria-hidden="true">I</span>
                    <span className={Styles.brandText}>Internal App Distribution</span>
                </Link>

                <nav className={Styles.navigation} aria-label="Navegación principal">
                    {isAdmin && <Link className={`${Styles.navLink} ${pathname.includes("admin") ? Styles.active : ""}`} href="/dashboard/admin">Admin</Link>}
                    {isClient && <Link className={`${Styles.navLink} ${pathname.includes("catalogo") ? Styles.active : ""}`} href="/dashboard/catalogo">Catálogo</Link>}
                </nav>

                <div className={Styles.headerActions}>
                    <label className={Styles.search}>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="visually-hidden">Buscar aplicaciones</span>
                        <input type="search" placeholder="Buscar..." aria-label="Buscar aplicaciones" />
                    </label>
                    <button className={Styles.iconButton} type="button" aria-label="Ver notificaciones">
                        <i className="bi bi-bell" aria-hidden="true"></i>
                    </button>
                    <button className={Styles.iconButton} type="button" aria-label="Abrir configuración">
                        <i className="bi bi-sliders2" aria-hidden="true"></i>
                    </button>
                    <button className={Styles.profileButton} type="button" aria-label="Abrir perfil">
                        <i className="bi bi-person" aria-hidden="true"></i>
                    </button>
                    <button className={Styles.menuButton} type="button" aria-label="Abrir navegación" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className={`bi ${isMobileMenuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && <nav className={Styles.mobileNavigation} aria-label="Navegación móvil">
                {isAdmin && <Link className={Styles.navLink} href="/dashboard/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>}
                {isClient && <Link className={Styles.navLink} href="/dashboard/catalogo" onClick={() => setIsMobileMenuOpen(false)}>Catálogo</Link>}
            </nav>}
        </header>
    )
}