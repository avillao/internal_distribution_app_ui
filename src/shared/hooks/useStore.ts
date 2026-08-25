import { create } from 'zustand';

interface StoreState {
    isAuthenticated: boolean;
    roles: string[];
    setIsAuthenticated: (value: boolean) => void;
    setRoles: (value: string[]) => void;
}

const useStore = create<StoreState>((set) => ({
    isAuthenticated: false,
    roles: [],
    setIsAuthenticated: (value: boolean) => set(()=>({isAuthenticated: value})),
    setRoles: (values: string[]) => set(()=>({roles: values})),
}))

export default useStore;