import { SoldProductOptions } from "../../model/enum/SoldProductOptions";
import SoldAmount from "../../model/SoldAmount";
import SoldCategory from "../../model/soldEntities/SoldCategory";
import SoldProduct from "../../model/soldEntities/SoldProduct";

export default interface ISalesData {
  getSoldAmount(iDate: string, fDate: string): Promise<SoldAmount[]>;
  getProducts(
    option: SoldProductOptions,
    iDate?: string,
    fDate?: string
  ): Promise<SoldProduct[]>;
  getCategories(): Promise<SoldCategory[]>;
}
