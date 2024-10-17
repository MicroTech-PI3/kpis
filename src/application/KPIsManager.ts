import IKPIsManager from "../domain/interfaces/application/IKPIsManager";
import ISalesProvider from "../domain/interfaces/infrastructure/repository/provider/ISalesProvider";
import ITransactionSizeProvider from "../domain/interfaces/infrastructure/repository/provider/ITransactionSizeProvider";

export default class KPIsManager implements IKPIsManager {
  constructor(
    private readonly salesProvider: ISalesProvider,
    private readonly transactionSizeProvider: ITransactionSizeProvider
  ) {}

  async getAvgTransactionSize(): Promise<number> {
    const transactionSize = await this.transactionSizeProvider.find();
    const getAvgTransactionSize =
      transactionSize.getTotalItems() / transactionSize.getTransactions();
    return getAvgTransactionSize;
  }

  async getSalesGrowth(iDate: string, fDate: string): Promise<number> {
    const sales = await this.salesProvider.findAll(iDate, fDate);
    let initialSales: number = 0;
    let finalSales: number = 0;
    let totalSales: number = 0;

    sales.sort(
      (a, b) =>
        new Date(a.getDate()).getTime() - new Date(b.getDate()).getTime()
    );
    const firstSale = sales[0];
    const lastSale = sales[sales.length - 1];
    sales.length = 0;
    sales.push(firstSale, lastSale);

    initialSales = Number(sales[0].getSales());
    finalSales = Number(sales[1].getSales());
    totalSales = initialSales + finalSales;

    const salesGrowth = ((finalSales - initialSales) / totalSales) * 100;

    return salesGrowth;
  }
}
