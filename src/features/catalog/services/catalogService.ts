import { cookies } from "next/headers";
import type { Application, ApplicationDetail, Artifact, ArtifactBranch, ArtifactPlatform, CatalogApplication } from "../models/catalog";

interface BffResponse<T> {
    message: string;
    status: number;
    error: boolean;
    data: T;
}

const baseUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "http://localhost:53400";

function apiBranch(branch: ArtifactBranch) {
    return branch === "prod" ? "prd" : branch;
}

function normalizeBranch(branch: string): ArtifactBranch {
    return branch === "prd" ? "prod" : branch as ArtifactBranch;
}

async function bffGet<T>(path: string): Promise<T> {
    const token = (await cookies()).get("access_token")?.value;
    const response = await fetch(`${baseUrl}${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`BFF request failed: ${response.status}`);
    }

    const payload = await response.json() as BffResponse<T>;
    if (payload.error) {
        throw new Error(payload.message || "BFF request failed");
    }

    return payload.data;
}

export async function getApplications(): Promise<Application[]> {
    return bffGet<Application[]>("/api/application");
}

export async function getApplicationDetail(applicationCode: string): Promise<ApplicationDetail> {
    const detail = await bffGet<ApplicationDetail>(`/api/application/${encodeURIComponent(applicationCode)}/detail`);
    return { ...detail, branches: detail.branches.map(normalizeBranch) };
}

export async function getLatestArtifact(applicationCode: string, platform: ArtifactPlatform, branch: ArtifactBranch): Promise<Artifact> {
    const artifact = await bffGet<Omit<Artifact, "branch"> & { branch: string }>(`/api/application/${encodeURIComponent(`${applicationCode}.${platform}.${apiBranch(branch)}`)}/artifact/latest`);
    return { ...artifact, branch: normalizeBranch(artifact.branch), downloadUrl: `/mock-downloads/${artifact.artifactId}` };
}

export async function getCatalogApplications(): Promise<Application[]> {
    return getApplications();
}

export async function getCatalogApplication(applicationCode: string): Promise<CatalogApplication> {
    const detail = await getApplicationDetail(applicationCode);
    const combinations = detail.platforms.flatMap((platform) => detail.branches.map((branch) => ({ platform, branch })));
    const artifacts = await Promise.all(combinations.map(async ({ platform, branch }) => {
        try {
            return await getLatestArtifact(applicationCode, platform, branch);
        } catch {
            return null;
        }
    }));

    return { ...detail, artifacts: artifacts.filter((artifact): artifact is Artifact => artifact !== null) };
}