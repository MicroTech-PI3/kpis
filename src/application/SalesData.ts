import ISalesData from "../domain/interfaces/application/ISalesData";
import ISoldAmountProvider from "../domain/interfaces/infrastructure/repository/provider/ISoldAmountProvider";
import ISoldEntitiesProvider from "../domain/interfaces/infrastructure/repository/provider/ISoldEntitiesProvider";
import { SoldProductOptions } from "../domain/model/enum/SoldProductOptions";
import SoldAmount from "../domain/model/SoldAmount";
import SoldCategory from "../domain/model/soldEntities/SoldCategory";
import SoldProduct from "../domain/model/soldEntities/SoldProduct";

export default class SalesData implements ISalesData {
  constructor(
    private readonly soldEntitiesProvider: ISoldEntitiesProvider,
    private readonly soldAmountProvider: ISoldAmountProvider
  ) {}

  async getCategories(): Promise<SoldCategory[]> {
    return this.soldEntitiesProvider.findAllCategories();
  }

  async getProducts(
    option: SoldProductOptions,
    iDate: Date = new Date(),
    fDate: Date = new Date()
  ): Promise<SoldProduct[]> {
    return this.soldEntitiesProvider.findAllProducts(iDate, fDate, option);
  }

  async getSoldAmount(iDate: Date, fDate: Date): Promise<SoldAmount[]> {
    return this.soldAmountProvider.findAll(iDate, fDate);
  }
}
