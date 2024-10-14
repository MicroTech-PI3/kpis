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

  async getSalesGrowth(
    iMonth: number,
    iYear: number,
    fMonth: number,
    fYear: number
  ): Promise<number> {
    const sales = await this.salesProvider.findAll(
      iMonth,
      iYear,
      fMonth,
      fYear
    );
    let initialSales = 0;
    let finalSales = 0;

    sales.forEach((sale) => {
      if (sale.getMonth() === iMonth && sale.getYear() === iYear) {
        initialSales += sale.getSales();
      } else if (sale.getMonth() === fMonth && sale.getYear() === fYear) {
        finalSales += sale.getSales();
      }
    });

    const salesGrowth = ((finalSales - initialSales) / initialSales) * 100;

    return salesGrowth;
  }
}
