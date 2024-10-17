import { Request, Response } from "express";
import IKPIsManager from "../../../domain/interfaces/application/IKPIsManager";
import ICustomersData from "../../../domain/interfaces/application/ICustomersData";

export default class KPIsController {
  constructor(
    private readonly kpisManager: IKPIsManager,
    private readonly customersData: ICustomersData
  ) {}

  public async getSalesGrowth(req: Request, res: Response): Promise<void> {
    try {
      const { iDate, fDate } = req.body;
      const salesGrowth = await this.kpisManager.getSalesGrowth(iDate, fDate);
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

  public async getRPR(_req: Request, res: Response): Promise<void> {
    try {
      const rpr = await this.customersData.getRPR();
      res.status(200).json({ rpr: rpr });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
