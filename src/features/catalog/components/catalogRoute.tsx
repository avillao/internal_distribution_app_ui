"use client";

import { redirect } from "next/navigation";
import useStore from "@/shared/hooks/useStore";
import CatalogView from "./catalogView";
import { fetchApplications } from "../services/catalogClient";
import type { Application } from "../models/catalog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CatalogRoute() {
    const roles = useStore((state) => state.roles);
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (isAuthenticated && !roles.some((role) => role.startsWith("user_"))) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, roles, router]);

    useEffect(() => {
        fetchApplications()
            .then(setApplications)
            .catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : "No se pudo cargar el catálogo"))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <div>Cargando catálogo...</div>;
    if (error) return <div>{error}</div>;
    return <CatalogView applications={applications} />;
}