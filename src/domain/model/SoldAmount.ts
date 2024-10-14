export default class SoldAmount {
    constructor(private total: number, private date: Date){}
    public getTotal(): number {
        return this.total;
    }
    public getDate(): Date {
        return this.date;
    }
    public setTotal(total: number): void {
        this.total = total;
    }
    public setDate(date: Date): void {
        this.date = date;
    }
}