/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, FormEvent, useState } from 'react';
import Header from '@/components/Header';
import styles from './styles.module.scss';
import Head from 'next/head';
import { setUpAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { useSSRHook } from '@/hooks/useSSRHook';

type ItemProps = {
    id: string,
    name: string,
}

interface CategoryProps {
    categoryList: ItemProps[]
}

const product = ({ categoryList }: CategoryProps) => {

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error("Preencha todos os campos.");
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setUpAPIClient();
            await apiClient.post('/product', data);

            toast.success("Produto cadastrado!");

        } catch (error) {
            toast.error("Erro ao registrar produto.");
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const image = event.target.files[0];

        if (!image) return;

        if (image.type === 'image/jpg' || image.type === 'image/pgn' || image.type === 'image/jpeg') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    function handleChangeCategory(event) {
        setCategorySelected(event.target.value);
    }

    return (
        <>
            <Head><title>Novo produto - Sujeito Pizza</title></Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Cadastrar Novo Produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload color='#fff' size={30} />
                            </span>

                            <input
                                onChange={handleFile}
                                type="file"
                                accept='image/pgn, image/jpg, image/jpeg'
                            />

                            {avatarUrl && (
                                <Image
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt='Foto do produto'
                                    width={240}
                                    height={240}
                                />
                            )}

                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => (
                                <option key={item.id} value={index}>{item.name}</option>
                            ))}
                        </select>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Digite o nome do produto...'
                            className={styles.input}
                        />

                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            placeholder='Preço do produto...'
                            className={styles.input}
                        />

                        <textarea
                            placeholder='Descreva seu produto...'
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button className={styles.addBtn} type="submit">Cadastrar</button>

                    </form>

                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setUpAPIClient(ctx);

    const response = await apiClient.get('/category');

    return {
        props: {
            categoryList: response.data,
        }
    }
})

export default product;