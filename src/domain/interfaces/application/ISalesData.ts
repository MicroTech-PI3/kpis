import { SoldProductOptions } from "../../model/enum/SoldProductOptions";
import SoldAmount from "../../model/SoldAmount";
import SoldCategory from "../../model/soldEntities/SoldCategory";
import SoldProduct from "../../model/soldEntities/SoldProduct";

export default interface ISalesData {
  getSoldAmount(iDate: Date, fDate: Date): Promise<SoldAmount[]>;
  getProducts(
    iDate: Date,
    fDate: Date,
    option: SoldProductOptions
  ): Promise<SoldProduct[]>;
  getCategories(): Promise<SoldCategory[]>;
}
