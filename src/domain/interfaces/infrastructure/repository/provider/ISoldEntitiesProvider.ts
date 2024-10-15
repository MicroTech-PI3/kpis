import { SoldProductOptions } from "../../../../model/enum/SoldProductOptions";
import SoldCategory from "../../../../model/soldEntities/SoldCategory";
import SoldProduct from "../../../../model/soldEntities/SoldProduct";

export default interface ISoldEntitiesProvider {
  findAllProducts(
    iDate: string,
    fDate: string,
    option: SoldProductOptions
  ): Promise<SoldProduct[]>;
  findAllCategories(): Promise<SoldCategory[]>;
}
