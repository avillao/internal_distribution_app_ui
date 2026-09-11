import { create } from 'zustand';

interface StoreState {
    username?: string;
    name?: string;
    email?: string;
    isAuthenticated: boolean;
    roles: string[];
    setUserData: (name: string, username: string, email: string) => void;
    setIsAuthenticated: (value: boolean) => void;
    setRoles: (value: string[]) => void;
}

const useStore = create<StoreState>((set) => ({
    isAuthenticated: false,
    roles: [],
    username: undefined,
    name: undefined,
    email: undefined,
    setUserData: (name: string, username: string, email: string) => set(()=>({
        username,
        name, 
        email
    })),
    setIsAuthenticated: (value: boolean) => set(()=>({isAuthenticated: value})),
    setRoles: (values: string[]) => set(()=>({roles: values})),
}))

export default useStore;