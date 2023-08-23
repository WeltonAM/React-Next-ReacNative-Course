import prismaClient from "../../../prisma";

class ListOrdersService {
    async execute() {
        const order = prismaClient.order.findMany({
            where: {
                draft: true,
                status: true,
            },
            orderBy: {
                created_at: 'desc',
            }
        });

        return order;
    };
}

export { ListOrdersService };