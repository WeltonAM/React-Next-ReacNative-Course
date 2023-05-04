import Link from 'next/link';
import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const Header = () => {

    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image src={logo} alt='Logo Sujeito Pizza' width={190} height={60} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category">Categoria</Link>
                    <Link href="/menu">Menu</Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;