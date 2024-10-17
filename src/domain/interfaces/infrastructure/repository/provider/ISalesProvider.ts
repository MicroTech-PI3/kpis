import Sales from "../../../../model/sales/Sales";

export default interface ISalesProvider {
  findAll(iDate: string, fDate: string): Promise<Sales[]>;
}
