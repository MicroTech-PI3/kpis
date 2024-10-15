import { Month } from "../enum/Month";

export default class Sales {
  constructor(
    private month: Month,
    private year: number,
    private sales: number
  ) {}

  getMonth(): Month {
    return this.month;
  }
  getYear(): number {
    return this.year;
  }
  getSales(): number {
    return this.sales;
  }
  setMonth(month: Month): void {
    this.month = month;
  }
  setYear(year: number): void {
    this.year = year;
  }
  setSales(sales: number): void {
    this.sales = sales;
  }
}
