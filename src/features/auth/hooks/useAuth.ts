import { AuthService } from "@/features/auth/services/authService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "@/shared/hooks/useStore";
import { UserClaim } from "../models/me";

const authService = AuthService.prototype.getInstance();

export interface IUseAuth {
    isLoading: boolean,
    login: (username: string, password: string, navigateTo: string) => Promise<void>,
    logout: ()=> Promise<void>;
    me: ()=>Promise<void>
    error?: string;
}

export default function useAuth(): IUseAuth {
    const setIsAuthenticated = useStore((state) => state.setIsAuthenticated );
    const setRoles = useStore((state) => state.setRoles);
    const setUserData = useStore((state) => state.setUserData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined)
    const router = useRouter();
    
    const login = async (username: string, password: string, navigateTo: string) => {
        setError(undefined);
        await logout();

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
        setIsAuthenticated(false);
        setRoles([]);
        setIsLoading(false);
    };

    const me = async () => {
        setIsLoading(true);
        const user = await authService.me();
        setIsLoading(false);
        console.log("finalizado me()")
        setUserData(user.name, user.username, user.email);
        setRoles(user.roles);
    }

   return {
    isLoading,
    login,
    logout,
    error,
    me
   }

}