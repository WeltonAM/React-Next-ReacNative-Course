/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import Header from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import styles from './styles.module.scss';
import { FiRefreshCcw } from "react-icons/fi";
import { setUpAPIClient } from "@/services/api";

type OrderProps = {
    id: string,
    table: number,
    status: boolean,
    draft: boolean,
    name: string,
    created_at: string,
    updated_at: string,
}

interface OrderListProps {
    ordersList: OrderProps[]
}

const dashboard = ({ ordersList }: OrderListProps) => {

    const [orderList, setOrderList] = useState(ordersList || []);

    function handleOpenModalView(itemId: string) {
        alert(itemId);
    }

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizza</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Pedidos</h1>
                        <button>
                            <FiRefreshCcw color="#3fffa3" size={25} />
                        </button>
                    </div>

                    <article className={styles.listOrders}>

                        {orderList.map((item) => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}

                    </article>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setUpAPIClient(ctx);

    const response = await apiClient.get('/orders');

    return {
        props: {
            ordersList: response.data,
        }
    }
})


export default dashboard;