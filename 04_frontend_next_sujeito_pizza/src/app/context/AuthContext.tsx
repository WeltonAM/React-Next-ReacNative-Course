'use client';

import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '@/services/apiClient';

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SingInProps) => Promise<void>,
    signOut: () => void,
}

type UserProps = {
    id: string,
    name: string,
    email: string,
}

type SingInProps = {
    email: string,
    password: string,
}

type AuthProviderProps = {
    children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch (error) {
        console.log('Error to signOut');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SingInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, name, token } = response.data;
            console.log(token);

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });

            setUser({
                id,
                name,
                email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/dashboard');

        } catch (error) {
            console.log('Error to login. ' + error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}