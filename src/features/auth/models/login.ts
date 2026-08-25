import { FormikValues } from "formik";

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