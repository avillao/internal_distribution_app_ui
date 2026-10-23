export type ArtifactPlatform = "android" | "ios";
export type ArtifactBranch = "dev" | "qa" | "prod";

export interface Application {
    applicationCode: string;
    name: string;
    packageName: string;
    enabled: boolean;
    created: string;
    updated: string;
}

export interface ApplicationDetail extends Application {
    description?: string;
    branches: ArtifactBranch[];
    platforms: ArtifactPlatform[];
}

export interface BinaryDetail {
    filename: string;
    type: string;
    filesize: number;
    keypath: string;
    url: string;
}

export interface Artifact {
    resourceApplicationCode: string;
    artifactId: string;
    applicationCode: string;
    version: string;
    branch: ArtifactBranch;
    platform: ArtifactPlatform;
    enabled: boolean;
    created: string;
    updated: string;
    binaryDetail?: BinaryDetail;
    downloadUrl?: string;
}

export interface CatalogApplication extends Application {
    branches: ArtifactBranch[];
    platforms: ArtifactPlatform[];
    artifacts?: Artifact[];
}