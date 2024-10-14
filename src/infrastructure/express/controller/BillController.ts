import { Request, Response } from "express";
import IBillManager from "../../../domain/interfaces/application/IBillManager";
import ISendingVia from "../../../domain/interfaces/application/ISendingVia";

export default class BillController {
  constructor(
    private readonly billManager: IBillManager,
    private readonly sendingVia: ISendingVia
  ) {}

  public async sendBill(req: Request, res: Response): Promise<void> {
    try {
      const { soldCartId } = req.body;
      const bill = await this.billManager.sendBill(soldCartId);
      res.status(200).json({ message: bill ? "Bill sent" : "Bill not sent" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async setSendingVia(req: Request, res: Response): Promise<void> {
    try {
      const { sendingVia, customerId } = req.body;
      const updated = await this.sendingVia.setSendingVia(
        sendingVia,
        customerId
      );
      res.status(200).json({
        message: updated ? "Sending via updated" : "Sending via not updated",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
