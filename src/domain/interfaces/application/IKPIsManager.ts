export default interface IKPIsManager {
  getSalesGrowth(
    iMonth: number,
    iYear: number,
    fMonth: number,
    fYear: number
  ): Promise<number>;
  getAvgTransactionSize(): Promise<number>;
}
