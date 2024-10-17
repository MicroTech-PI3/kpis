import { Router } from "express";
import ExpressRouter from "../../../express/routes/ExpressRouter";
import DataController from "../controller/DataController";

export default class DataRouter implements ExpressRouter {
  router: Router;
  path: string;

  constructor(private readonly dataController: DataController) {
    this.router = Router();
    this.path = "/kpis/data";
    this.routes();
  }

  routes = (): void => {
    this.router.post(
      "/sold-amount",
      this.dataController.getSoldAmountOnDate.bind(this.dataController)
    );
    this.router.get(
      "/top-customers",
      this.dataController.getTopCustomersOnSales.bind(this.dataController)
    );
    this.router.get(
      "/top-products/most",
      this.dataController.getTopProductsMostSold.bind(this.dataController)
    );
    this.router.get(
      "/top-products/least",
      this.dataController.getTopProductsLeastSold.bind(this.dataController)
    );
    this.router.post(
      "/products-by-date",
      this.dataController.getProductsByDate.bind(this.dataController)
    );
    this.router.get(
      "/top-categories",
      this.dataController.getTopCategories.bind(this.dataController)
    );
  };
}
