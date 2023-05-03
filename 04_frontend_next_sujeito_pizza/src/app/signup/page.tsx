import { getTitlePage } from "@/hooks/useTitleHook";
import Image from "next/image";
import styles from '../../styles/home.module.scss';
import logo from '../../../public/logo.svg';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function RegisterUserPage() {
    const { title, description } = await getTitlePage("SujeitoPizza - Cadastrar Usuário", "Cadastrar Usuário Sujeito Pizza");

    return (
        <div>
            <title>{title}</title>
            <meta name="description" content={description} />

            <div className={styles.containerCenter}>
                <Image src={logo} alt='Logo Sujeito Pizza'></Image>

                <div className={styles.login}>
                    <h1>Cadastro de usuário</h1>

                    <form>
                        <Input
                            type='text'
                            placeholder='Digite seu nome...'
                        />

                        <Input
                            type='text'
                            placeholder='Digite seu email...'
                        />

                        <Input
                            type='password'
                            placeholder='Digite seu senha...'
                        />

                        <Button
                            type="submit"
                            loading={false}
                        >
                            Cadastrar
                        </Button>

                        <Link className={styles.link} href="/">Já possui uma conta? Acesse aqui!</Link>

                    </form>
                </div>
            </div>
        </div>
    )
}
