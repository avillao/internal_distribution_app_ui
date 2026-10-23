import { authClient } from "@/shared/api/clients/authClient";
import type { Application, ApplicationDetail, Artifact, ArtifactBranch, ArtifactPlatform, CatalogApplication } from "../models/catalog";

interface BffResponse<T> {
    data: T;
    error: boolean;
    message: string;
}

function normalizeBranch(branch: string): ArtifactBranch {
    return branch === "prd" ? "prod" : branch as ArtifactBranch;
}

function bffData<T>(response: { data: BffResponse<T> }) {
    if (response.data.error) {
        throw new Error(response.data.message || "No se pudo cargar la información");
    }
    return response.data.data;
}

export async function fetchApplications() {
    return bffData<Application[]>(await authClient.get("/api/application"));
}

export async function fetchApplicationDetail(applicationCode: string): Promise<ApplicationDetail> {
    const detail = bffData<ApplicationDetail>(await authClient.get(`/api/application/${encodeURIComponent(applicationCode)}/detail`));
    return { ...detail, branches: detail.branches.map(normalizeBranch) };
}

export async function fetchLatestArtifact(applicationCode: string, platform: ArtifactPlatform, branch: ArtifactBranch): Promise<Artifact> {
    const apiBranch = branch === "prod" ? "prd" : branch;
    const resourceApplicationCode = `${applicationCode}.${platform}.${apiBranch}`;
    const artifact = bffData<Omit<Artifact, "branch"> & { branch: string }>(await authClient.get(`/api/application/${encodeURIComponent(resourceApplicationCode)}/artifact/latest`));
    const downloadUrl = artifact.binaryDetail?.url ?? artifact.downloadUrl;
    return { ...artifact, branch: normalizeBranch(artifact.branch), downloadUrl };
}

export async function fetchCatalogApplication(applicationCode: string): Promise<CatalogApplication> {
    const detail = await fetchApplicationDetail(applicationCode);
    return { ...detail };
}