import { Request, Response } from "express";
import { FinishOrderServer } from "../../services/order/FinishOrderServer";

class FinishOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;

        const finishOrderServer = new FinishOrderServer();

        const order = await finishOrderServer.execute({ order_id });

        return res.json(order);

    };
}

export { FinishOrderController };