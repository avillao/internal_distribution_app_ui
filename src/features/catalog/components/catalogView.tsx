"use client";

import { useState } from "react";
import Link from "next/link";
import type { Application } from "../models/catalog";
import Styles from "../styles/catalog.module.css";

const pageSize = 3;
function getInitials(name: string) {
    return name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function getCardClass(index: number) {
    return `${Styles.appIcon} ${Styles[`appIcon${(index % 4) + 1}`]}`;
}

function ApplicationCard({ application, index }: { application: Application; index: number }) {
    return (
        <Link className={Styles.applicationCard} href={`/dashboard/catalogo/detalle?applicationCode=${encodeURIComponent(application.applicationCode)}`}>
            <div className={Styles.cardTopline}>
                <div className={getCardClass(index)} aria-hidden="true">{getInitials(application.name)}</div>
                <span className={`${Styles.statusBadge} ${application.enabled ? Styles.stable : Styles.paused}`}>
                    {application.enabled ? "ACTIVA" : "PAUSADA"}
                </span>
            </div>

            <div className={Styles.cardBody}>
                <div>
                    <h2>{application.name}</h2>
                    <p className={Styles.applicationCode}>{application.applicationCode}</p>
                    <p className={Styles.description}>
                        {application.enabled
                            ? "Aplicación interna disponible para los usuarios autorizados."
                            : "Esta aplicación no está disponible actualmente."}
                    </p>
                </div>

                <div className={Styles.applicationDetails}>
                    <div>
                        <span className={Styles.metaLabel}>PACKAGE NAME</span>
                        <strong>{application.packageName}</strong>
                    </div>
                    <div className={Styles.updatedAt}>
                        <span className={Styles.metaLabel}>ACTUALIZADA</span>
                        <time dateTime={application.updated}>{new Date(application.updated).toLocaleDateString("es-ES")}</time>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function CatalogView({ applications }: { applications: Application[] }) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const filteredApplications = applications.filter((application) => {
        const matchesQuery = `${application.name} ${application.packageName}`.toLowerCase().includes(query.toLowerCase());
        return matchesQuery;
    });
    const totalPages = Math.max(1, Math.ceil(filteredApplications.length / pageSize));
    const visibleApplications = filteredApplications.slice((page - 1) * pageSize, page * pageSize);

    function updateQuery(value: string) {
        setQuery(value);
        setPage(1);
    }

    return (
        <main className={Styles.catalogPage}>
            <div className={Styles.pageHeader}>
                <div>
                    <p className={Styles.kicker}><span /> REGISTRY / APLICACIONES</p>
                    <h1>Catálogo de aplicaciones</h1>
                    <p className={Styles.intro}>Explora las herramientas internas disponibles para tu entorno de trabajo.</p>
                </div>
                <div className={Styles.headerMark} aria-hidden="true">APP<br />REG</div>
            </div>

            <section className={Styles.toolbar} aria-label="Filtros del catálogo">
                <label className={Styles.catalogSearch}>
                    <i className="bi bi-search" aria-hidden="true" />
                    <span className="visually-hidden">Buscar aplicaciones</span>
                    <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Buscar por nombre o paquete..." type="search" />
                </label>
            </section>

            <div className={Styles.catalogSummary}>
                <span><strong>{filteredApplications.length}</strong> aplicaciones encontradas</span>
                <span className={Styles.liveStatus}><i /> SISTEMA OPERATIVO</span>
            </div>

            {visibleApplications.length > 0 ? (
                <section className={Styles.applicationGrid} aria-label="Aplicaciones disponibles">
                    {visibleApplications.map((application, index) => <ApplicationCard application={application} index={index} key={application.applicationCode} />)}
                </section>
            ) : (
                <div className={Styles.emptyState}>
                    <i className="bi bi-search" aria-hidden="true" />
                    <h2>No encontramos aplicaciones</h2>
                    <p>Prueba con otro nombre, paquete o plataforma.</p>
                </div>
            )}

            <nav className={Styles.pagination} aria-label="Paginación del catálogo">
                <button aria-label="Página anterior" disabled={page === 1} onClick={() => setPage(page - 1)} type="button"><i className="bi bi-arrow-left" /></button>
                <span>PÁGINA <strong>{page}</strong> / {totalPages}</span>
                <button aria-label="Página siguiente" disabled={page === totalPages} onClick={() => setPage(page + 1)} type="button"><i className="bi bi-arrow-right" /></button>
            </nav>
        </main>
    );
}