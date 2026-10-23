export type BranchPermission = "qa" | "prd";

export interface ApplicationPermission {
    applicationCode: string;
    branch: BranchPermission;
}

const ROLE_PREFIX = "user_";

export function getApplicationPermissions(roles: string[]): ApplicationPermission[] {
    const permissions: ApplicationPermission[] = [];
    for (const role of roles) {
        if (!role.startsWith(ROLE_PREFIX)) continue;
        const rest = role.slice(ROLE_PREFIX.length);
        if (!rest) continue;
        const lastUnderscore = rest.lastIndexOf("_");
        if (lastUnderscore < 0) continue;
        const branch = rest.slice(lastUnderscore + 1);
        const applicationCode = rest.slice(0, lastUnderscore);
        if (branch !== "qa" && branch !== "prd") continue;
        permissions.push({ applicationCode, branch });
    }
    return permissions;
}

export function hasApplicationPermission(
    roles: string[],
    applicationCode: string,
    branch: BranchPermission,
): boolean {
    return getApplicationPermissions(roles).some(
        (permission) => permission.applicationCode === applicationCode && permission.branch === branch,
    );
}

export function getAccessibleApplicationCodes(roles: string[]): string[] {
    const codes = new Set<string>();
    for (const permission of getApplicationPermissions(roles)) {
        codes.add(permission.applicationCode);
    }
    return Array.from(codes);
}

export function getAccessibleBranches(
    roles: string[],
    applicationCode: string,
): BranchPermission[] {
    const branches = new Set<BranchPermission>();
    for (const permission of getApplicationPermissions(roles)) {
        if (permission.applicationCode === applicationCode) {
            branches.add(permission.branch);
        }
    }
    return Array.from(branches);
}
