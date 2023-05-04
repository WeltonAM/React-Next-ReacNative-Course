import { setUpAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

export function useSSRHook(url: string) {

    const getServerSideProps = canSSRAuth(async (ctx) => {
        const apiClient = setUpAPIClient(ctx);

        const response = await apiClient.get(url);

        return {
            props: {
                data: response.data,
            }
        }
    })

    return getServerSideProps;
}
