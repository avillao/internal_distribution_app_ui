import { FormikValues } from "formik";

export interface AuthToken {
    preferred_username: string;
    email: string;
    family_name: string;
    given_name: string;
    name: string;
    resource_access?: Record<string, { roles: string[] }>;
}

export interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    refresh_expires_in: number;
}

export interface LoginModel {
    username?: string;
    password?: string;
}