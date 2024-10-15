import SoldAmount from "../../../../model/SoldAmount";

export default interface ISoldAmountProvider {
  findAll(iDate: string, fDate: string): Promise<SoldAmount[]>;
}
