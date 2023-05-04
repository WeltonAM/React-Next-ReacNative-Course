import Image from 'next/image';
import styles from '../styles/home.module.scss';
import logo from '../../public/logo.svg';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { canSSRGuest } from '@/utils/canSSRGuest';

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error('Por favor, preencher todos os campos.')
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='Logo Sujeito Pizza'></Image>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>

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
              Acessar
            </Button>

            <Link className={styles.link} href="/signup">Não possui uma conta? Cadastrar-se!</Link>

          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
