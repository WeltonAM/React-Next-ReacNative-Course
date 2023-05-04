import Image from "next/image";
import styles from '../../styles/home.module.scss';
import logo from '../../../public/logo.svg';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from 'react-toastify';

export default function RegisterUserPage() {

    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.error('Por favor, preencher todos os campos.');
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>SP - Cadastrar Usuário</title>
            </Head>
            <div>
                <div className={styles.containerCenter}>
                    <Image src={logo} alt='Logo Sujeito Pizza'></Image>

                    <div className={styles.login}>
                        <h1>Cadastro de usuário</h1>

                        <form onSubmit={handleSignUp}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type='text'
                                placeholder='Digite seu nome...'
                            />

                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='text'
                                placeholder='Digite seu email...'
                            />

                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                placeholder='Digite seu senha...'
                            />

                            <Button
                                type="submit"
                                loading={loading}
                            >
                                Cadastrar
                            </Button>

                            <Link className={styles.link} href="/">Já possui uma conta? Acesse aqui!</Link>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
