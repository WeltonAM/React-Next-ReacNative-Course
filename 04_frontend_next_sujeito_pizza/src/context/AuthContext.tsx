import { createContext, ReactNode, useEffect, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '@/services/apiClient';
import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SingInProps) => Promise<void>,
    signOut: () => void,
    signUp: (credentials: SingUpProps) => Promise<void>,
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

type SingUpProps = {
    name: string,
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

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me')
                .then(response => {
                    const { id, name, email } = response.data;

                    setUser({
                        id,
                        name,
                        email
                    });
                })
                .catch(() => {
                    signOut();
                })
        }

    }, []);

    async function signIn({ email, password }: SingInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, name, token } = response.data;

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

            toast.success('Bem-vindo(a), ' + name + '!')

            Router.push('/dashboard');

        } catch (error) {
            toast.error('Erro ao acessar o sistema.')
        }
    }

    async function signUp({ name, email, password }: SingUpProps) {
        try {

            const response = await api.post('/users', {
                name, email, password
            });

            toast.success('Usuário cadastrado!')

            Router.push('/');

        } catch (error) {
            toast.error('Erro ao registrar-se.')
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}