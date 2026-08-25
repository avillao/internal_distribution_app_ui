import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AuthToken } from "./layout";
import { cookies } from "next/headers";

export default async function DashboardHome() {
    const token = (await cookies()).get('access_token')?.value
    const user = jwtDecode<AuthToken>(token || "{}");
    const roles = user.resource_access["internal_distribution_app"].roles;

    const isAdmin = roles.includes("admin");
    const isUser = roles.find((rol)=>rol.startsWith("user_")) != undefined;

    if (isAdmin) {
        redirect("/dashboard/admin");
    } else if (isUser) {
        redirect("/dashboard/catalogo");
    } else {
        redirect("/login");
    }
}