import Header from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";

const dashboard = () => {
    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizza</title>
            </Head>

            <div>
                <Header />
                <h1>Painel</h1>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})


export default dashboard;