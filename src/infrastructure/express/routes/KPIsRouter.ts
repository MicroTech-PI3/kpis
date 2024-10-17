import { Router } from "express";
import ExpressRouter from "../../../express/routes/ExpressRouter";
import KPIsController from "../controller/KPIsController";

export default class KPIsRouter implements ExpressRouter {
  router: Router;
  path: string;

  constructor(private readonly kpisController: KPIsController) {
    this.router = Router();
    this.path = "/kpis";
    this.routes();
  }

  routes = (): void => {
    this.router.post(
      "/sales-growth",
      this.kpisController.getSalesGrowth.bind(this.kpisController)
    );
    this.router.get(
      "/avg-transaction-size",
      this.kpisController.getAvgTransactionSize.bind(this.kpisController)
    );
    this.router.get(
      "/rpr",
      this.kpisController.getRPR.bind(this.kpisController)
    );
  };
}
