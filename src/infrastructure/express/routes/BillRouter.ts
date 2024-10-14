import { Router } from "express";
import ExpressRouter from "../../../express/routes/ExpressRouter";
import BillController from "../controller/BillController";

export default class BillRouter implements ExpressRouter {
  router: Router;
  path: string;

  constructor(private readonly billController: BillController) {
    this.router = Router();
    this.path = "/bill";
    this.routes();
  }

  routes = (): void => {
    this.router.post(
      "/send",
      this.billController.sendBill.bind(this.billController)
    );
    this.router.post(
      "/via",
      this.billController.setSendingVia.bind(this.billController)
    );
  };
}
