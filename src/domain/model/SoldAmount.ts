export default class SoldAmount {
  constructor(
    private total: number,
    private date: string
  ) {}
  public getTotal(): number {
    return this.total;
  }
  public getDate(): string {
    return this.date;
  }
  public setTotal(total: number): void {
    this.total = total;
  }
  public setDate(date: string): void {
    this.date = date;
  }
}
