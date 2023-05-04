/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent, useState } from 'react';
import Header from '@/components/Header';
import styles from './styles.module.scss';
import Head from 'next/head';
import { setUpAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '@/utils/canSSRAuth';

const product = () => {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') return;

        const apiClient = setUpAPIClient();
        await apiClient.post('/category', {
            name
        });

        toast.success("Categoria cadastrada!");
        setName("");
    }

    return (
        <>
            <Head><title>Novo produto - Sujeito Pizza</title></Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Cadastrar Novo Produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <select>
                            <option>Pizzas</option>
                            <option>Bebidas</option>
                        </select>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Digite o nome da categoria...'
                            className={styles.input}
                        />

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Preço do produto...'
                            className={styles.input}
                        />

                        <textarea
                            placeholder='Descreva seu produto...'
                            className={styles.input}
                        />

                        <button className={styles.addBtn} type="submit">Cadastrar</button>

                    </form>

                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})

export default product;