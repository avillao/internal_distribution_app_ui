"use client";

import Link from "next/link";
import { useState } from "react";
import type { ArtifactPlatform, CatalogApplication } from "../models/catalog";
import Styles from "../styles/application-detail.module.css";

const platformLabels: Record<ArtifactPlatform, string> = {
    android: "Android",
    ios: "iOS",
};

function getInitials(name: string) {
    return name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase();
}

function getPlatformIcon(platform: ArtifactPlatform) {
    return platform === "android" ? "bi-android2" : "bi-apple";
}

export default function ApplicationDetail({ application }: { application: CatalogApplication }) {
    const availablePlatforms = application.platforms;
    const initialPlatform = availablePlatforms.includes("android") ? "android" : availablePlatforms[0];
    const [platform, setPlatform] = useState<ArtifactPlatform>(initialPlatform);
    const platformArtifacts = application.artifacts.filter((artifact) => artifact.platform === platform);
    const branches = application.branches;
    const [branch, setBranch] = useState(branches.includes("prod") ? "prod" : branches[0]);
    const selectedArtifact = platformArtifacts.find((artifact) => artifact.branch === branch);
    const canDownload = application.enabled && selectedArtifact?.enabled === true && Boolean(selectedArtifact.downloadUrl);

    function changePlatform(nextPlatform: ArtifactPlatform) {
        setPlatform(nextPlatform);
        setBranch(application.branches.includes("prod") ? "prod" : application.branches[0]);
    }

    return (
        <main className={Styles.detailPage}>
            <div className={Styles.detailShell}>
                <Link className={Styles.backLink} href="/dashboard/catalogo">
                    <i className="bi bi-arrow-left" aria-hidden="true" /> Volver al catálogo
                </Link>

                <section className={Styles.applicationHeader}>
                    <div className={Styles.appIcon} aria-hidden="true">{getInitials(application.name)}</div>
                    <div className={Styles.applicationIdentity}>
                        <p className={Styles.kicker}><span /> APLICACIÓN / DETALLE</p>
                        <h1>{application.name}</h1>
                        <p className={Styles.applicationCode}>{application.applicationCode}</p>
                    </div>
                    <span className={`${Styles.statusBadge} ${application.enabled ? Styles.active : Styles.inactive}`}>
                        {application.enabled ? "ACTIVA" : "PAUSADA"}
                    </span>
                </section>

                <section className={Styles.downloadPanel} aria-labelledby="download-title">
                    <div className={Styles.panelIntro}>
                        <p className={Styles.kicker}>CENTRO DE DESCARGAS</p>
                        <h2 id="download-title">Elige cómo instalarla</h2>
                        <p>Selecciona tu plataforma y la rama que necesitas. La versión disponible se preparará automáticamente.</p>
                    </div>

                    <div className={Styles.applicationFacts}>
                        <div><span>PACKAGE NAME</span><strong>{application.packageName}</strong></div>
                        <div><span>ACTUALIZADA</span><time dateTime={application.updated}>{new Date(application.updated).toLocaleDateString("es-ES")}</time></div>
                    </div>

                    <div className={Styles.selectorGrid}>
                        <fieldset>
                            <legend>01 / PLATAFORMA</legend>
                            <div className={Styles.platformChoices}>
                                {availablePlatforms.map((item) => (
                                    <button className={platform === item ? Styles.selectedChoice : ""} key={item} onClick={() => changePlatform(item)} type="button">
                                        <i className={`bi ${getPlatformIcon(item)}`} aria-hidden="true" />
                                        <span>{platformLabels[item]}</span>
                                        <i className="bi bi-check2" aria-hidden="true" />
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <label className={Styles.branchSelect}>
                            <span>02 / RAMA</span>
                            <select value={branch} onChange={(event) => setBranch(event.target.value as typeof branch)}>
                                {branches.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
                            </select>
                            <i className="bi bi-chevron-down" aria-hidden="true" />
                        </label>
                    </div>

                    <div className={Styles.artifactResult}>
                        <div className={Styles.resultIcon}><i className={`bi ${getPlatformIcon(platform)}`} aria-hidden="true" /></div>
                        <div className={Styles.resultInfo}>
                            <span className={Styles.resultLabel}>VERSIÓN SELECCIONADA</span>
                            <strong>{selectedArtifact ? `v${selectedArtifact.version}` : "Sin versión"}</strong>
                            <span>{selectedArtifact ? `${platformLabels[selectedArtifact.platform]} · rama ${selectedArtifact.branch}` : "No hay un artifact para esta combinación"}</span>
                        </div>
                        {canDownload ? (
                            <a className={Styles.downloadButton} href={selectedArtifact.downloadUrl} download>
                                Descargar <i className="bi bi-download" aria-hidden="true" />
                            </a>
                        ) : (
                            <button className={Styles.downloadButton} disabled type="button">No disponible</button>
                        )}
                    </div>
                    {!application.enabled && <p className={Styles.notice}><i className="bi bi-info-circle" aria-hidden="true" /> Esta aplicación está pausada y no admite descargas.</p>}
                    {application.enabled && selectedArtifact && !selectedArtifact.enabled && <p className={Styles.notice}><i className="bi bi-info-circle" aria-hidden="true" /> Esta versión todavía no está habilitada para descarga.</p>}
                </section>
            </div>
        </main>
    );
}