export type LoginResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    refresh_expires_in: number;
}

export type LoginModel = {
    email?: string;
    password?: string;
}