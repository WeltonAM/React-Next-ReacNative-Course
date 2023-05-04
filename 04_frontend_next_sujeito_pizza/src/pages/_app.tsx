import { AuthProvider } from '@/context/AuthContext';
import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ToastContainer autoClose={3000} />
            <Component {...pageProps} />
        </AuthProvider>
    )
}