export default class Sales {
  constructor(
    private date: Date,
    private sales: number
  ) {}

  getSales(): number {
    return this.sales;
  }
  setSales(sales: number): void {
    this.sales = sales;
  }
  getDate(): Date {
    return this.date;
  }
  setDate(date: Date): void {
    this.date = date;
  }
}
