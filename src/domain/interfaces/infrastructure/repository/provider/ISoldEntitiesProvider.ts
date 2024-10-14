import SoldCategory from "../../../../model/soldEntities/SoldCategory";
import SoldProduct from "../../../../model/soldEntities/SoldProduct";

export default interface ISoldEntitiesProvider {
    findAllProducts(iDate: Date, fDate: Date): Promise<SoldProduct[]>;
    findAllCategories(iDate: Date, fDate: Date): Promise<SoldCategory[]>;
}