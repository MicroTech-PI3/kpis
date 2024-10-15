import { Request, Response } from "express";
import IKPIsManager from "../../../domain/interfaces/application/IKPIsManager";

export default class KPIsController {
  constructor(private readonly kpisManager: IKPIsManager) {}

  public async getSalesGrowth(req: Request, res: Response): Promise<void> {
    try {
      const { iMonth, fMonth, iYear, fYear } = req.body;
      const salesGrowth = await this.kpisManager.getSalesGrowth(
        iMonth,
        iYear,
        fMonth,
        fYear
      );
      res.status(200).json({ salesGrowth: salesGrowth });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getAvgTransactionSize(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const avgTransactionSize = await this.kpisManager.getAvgTransactionSize();
      res.status(200).json({ avgTransactionSize: avgTransactionSize });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
