import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '../features/auth/hooks'
import { loginUser, logoutUser } from '../features/auth/api';

interface AuthContextType {
    user: any,
    login: ({ email, password, rememberMe }: { email: string, password: string, rememberMe: boolean }) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) =>{
    const queryClient = useQueryClient()
    const { data: user, isLoading: loading } = useUser()

    const login = async ({ email, password, rememberMe }: { email: string, password: string, rememberMe: boolean }) => {
        const res = await loginUser({ email, password, rememberMe });

        if(res?.access){
            localStorage.setItem('access', res.access);
        }

        if (res?.refresh) {
            localStorage.setItem('refresh', res.refresh);
        }

        queryClient.invalidateQueries({ queryKey: ['myaccount'] });
        return user
    };

    const logout = async () => {
        await logoutUser();
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        queryClient.setQueryData(['myaccount'], null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
