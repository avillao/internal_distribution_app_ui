import { AuthService } from "@/features/auth/services/authService";
import { ResponseDTO } from "@/shared/api/core/types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginResponse } from "../models/login";

const authService = AuthService.prototype.getInstance();

export interface IUseAuth {
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (username: string, password: string, navigateTo: string) => void,
    logout: ()=> void;
    error?: string;
}

export const useAuth = (): IUseAuth => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined)
    const router = useRouter();
    
    const login = async (username: string, password: string, navigateTo: string) => {
        setError(undefined);

        try{
            setIsLoading(true);
            await authService.login(username, password);
            setIsAuthenticated(true);
            router?.push(navigateTo);
        } catch(err){
            let msg: string;
            if(err instanceof AxiosError){
                msg = err.response?.data?.message;
            }else if(err instanceof Error){
                msg = err?.message;
            }else{
                msg = "ERROR";
            }

            setError(msg);
            
        } finally{
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        await authService.logout();
        setIsLoading(false);
        setIsAuthenticated(false);
    };

   return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    error
   }

}