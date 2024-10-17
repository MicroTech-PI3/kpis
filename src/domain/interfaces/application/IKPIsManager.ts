export default interface IKPIsManager {
  getSalesGrowth(iDate: string, fDate: string): Promise<number>;
  getAvgTransactionSize(): Promise<number>;
}
