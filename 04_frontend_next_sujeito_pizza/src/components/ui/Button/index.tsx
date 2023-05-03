import Link from "next/link";
import styles from "./styles.module.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
            disabled={loading}
            className={styles.button}
            {...rest}
        >
            {loading ? (
                <FaSpinner color="#fff" size={16} />
            ) : (
                <Link href="#" className={styles.buttonTxt}>
                    {children}
                </Link>
            )}
        </button>
    )
}