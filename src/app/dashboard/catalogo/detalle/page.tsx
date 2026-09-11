"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ApplicationDetail from "@/features/catalog/components/applicationDetail";
import { fetchCatalogApplication } from "@/features/catalog/services/catalogClient";
import type { CatalogApplication } from "@/features/catalog/models/catalog";

export default function ApplicationDetailPage() {
    const searchParams = useSearchParams();
    const applicationCode = searchParams.get("applicationCode");
    const [application, setApplication] = useState<CatalogApplication>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!applicationCode) {
            setError("Aplicación no especificada");
            return;
        }

        fetchCatalogApplication(applicationCode)
            .then(setApplication)
            .catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : "No se pudo cargar la aplicación"));
    }, [applicationCode]);

    if (error) return <div>{error}</div>;
    if (!application) return <div>Cargando aplicación...</div>;
    return <ApplicationDetail application={application} />;
}