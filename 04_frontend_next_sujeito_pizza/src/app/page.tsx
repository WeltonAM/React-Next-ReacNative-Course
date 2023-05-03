'use client';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import logo from '../../public/logo.svg';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FormEvent, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

export default function Home() {

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: "algum@teste.com",
      password: "123456",
    }

    await signIn(data);
  }

  return (
    <div className={styles.containerCenter}>
      <Image src={logo} alt='Logo Sujeito Pizza'></Image>

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
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
            Acessar
          </Button>

          <Link className={styles.link} href="/signup">Não possui uma conta? Cadastrar-se!</Link>

        </form>
      </div>
    </div>
  )
}
