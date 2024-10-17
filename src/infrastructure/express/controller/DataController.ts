import { Request, Response } from "express";
import ISalesData from "../../../domain/interfaces/application/ISalesData";
import ICustomersData from "../../../domain/interfaces/application/ICustomersData";
import { SoldProductOptions } from "../../../domain/model/enum/SoldProductOptions";

export default class DataController {
  constructor(
    private readonly salesData: ISalesData,
    private readonly customerData: ICustomersData
  ) {}

  public async getSoldAmountOnDate(req: Request, res: Response): Promise<void> {
    try {
      const { iDate, fDate } = req.body;
      const soldAmount = await this.salesData.getSoldAmount(iDate, fDate);
      res.status(200).json({ soldAmount: soldAmount });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getTopCustomersOnSales(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const customers = await this.customerData.getCustomers();
      res.status(200).json({ customers: customers });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getTopProductsMostSold(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const productOptions = SoldProductOptions.MOST;
      const products = await this.salesData.getProducts(productOptions);
      res.status(200).json({ products: products });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getTopProductsLeastSold(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const productOptions = SoldProductOptions.LEAST;
      const products = await this.salesData.getProducts(productOptions);
      res.status(200).json({ products: products });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getProductsByDate(_req: Request, res: Response): Promise<void> {
    try {
      const { iDate, fDate } = _req.body;

      const productOptions = SoldProductOptions.DATES;
      const products = await this.salesData.getProducts(
        productOptions,
        iDate,
        fDate
      );
      res.status(200).json({ products: products });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getTopCategories(_req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.salesData.getCategories();
      res.status(200).json({ categories: categories });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
