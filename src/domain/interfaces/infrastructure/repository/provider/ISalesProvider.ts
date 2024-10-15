import Sales from "../../../../model/sales/Sales";

export default interface ISalesProvider {
    findAll(iMonth: number, iYear: number, fMonth: number, fYear: number): Promise<Sales[]>;
}