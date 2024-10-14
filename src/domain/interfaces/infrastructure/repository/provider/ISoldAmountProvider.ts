import SoldAmount from "../../../../model/SoldAmount";

export default interface ISoldAmountProvider {
  findAll(iDate: Date, fDate: Date): Promise<SoldAmount[]>;
}