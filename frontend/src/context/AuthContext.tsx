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
        await loginUser({ email, password, rememberMe });
        queryClient.invalidateQueries({ queryKey: ['myaccount'] });
    };

    const logout = async () => {
        await logoutUser();
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
