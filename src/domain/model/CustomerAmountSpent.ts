export default class CustomerAmountSpent {
  constructor(
    private names: string,
    private total: number
  ) {}
  public getNames(): string {
    return this.names;
  }
  public getTotal(): number {
    return this.total;
  }
  public setNames(names: string): void {
    this.names = names;
  }
  public setTotal(total: number): void {
    this.total = total;
  }
}
