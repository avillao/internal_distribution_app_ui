import { authClient } from '@/shared/api/clients/authClient';
import { ResponseDTO } from '@/shared/api/core/types';
import { LoginResponse } from '@/features/auth/models/login';
import { setTokens, getRefreshToken, clearTokens } from '@/shared/api/core/tokenStorage';
import { AxiosResponse } from 'axios';
 
export class AuthService {
    instance?: AuthService;

    constructor(){}

    getInstance(){
        if(!this.instance){
            this.instance = new AuthService();
        }
        return this.instance;
    }

    async login(username: string, password: string){
        const params = new URLSearchParams({ username, password });

        const res: AxiosResponse<ResponseDTO<LoginResponse>> = await authClient.post(
            '/auth/login', 
            params
        );

        if(res.status != 200){
            throw new Error("Error de inicio de sesion");   
        }

        setTokens({
            access: res.data.data.access_token,
            refresh: res.data.data.refresh_token,
            expires_in: res.data.data.expires_in
        });

        return res.data;
    }

    async refresh() {
        const refreshToken = getRefreshToken();

        const res = await authClient.post('/auth/refresh', {
            refresh_token: refreshToken,
        });

        setTokens({
            access: res.data.access_token,
            refresh: res.data.refresh_token,
            expires_in: res.data.expires_in
        });

        return res.data;
    };

    async logout(){
        clearTokens();
    }
}