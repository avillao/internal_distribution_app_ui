import { authClient } from '@/shared/api/clients/authClient';
import { ResponseDTO } from '@/shared/api/core/types';
import { AxiosResponse } from 'axios';
import { UserClaim } from '../models/me';
 
export class AuthService {
    instance?: AuthService;

    constructor(){}

    getInstance(){
        if(!this.instance){
            this.instance = new AuthService();
        }
        return this.instance;
    }

    async me(){
        const res: AxiosResponse<ResponseDTO<UserClaim>> = await authClient.get(
            '/auth/me'
        );

        if(res.status != 200){
            throw new Error("Error de inicio de sesion");
        }

        return res.data.data;
    }

    async login(username: string, password: string){
        const params = new URLSearchParams({ username, password });

        const res: AxiosResponse<ResponseDTO<null>> = await authClient.post(
            '/auth/login', 
            params
        );

        if(res.status != 200){
            throw new Error("Error de inicio de sesion");   
        }

    }

    async refresh() {

        const res = await authClient.post('/auth/refresh', {
        });

        return res.data;
    };

    async logout(){
        //clearTokens();
    }
}