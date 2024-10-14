export default class TransactionSize{
    constructor(private totalItems: number, private transactions: number){}

    public getTotalItems(): number {
        return this.totalItems;
    }
    public getTransactions(): number {
        return this.transactions;
    }
    public setTotalItems(totalItems: number): void {
        this.totalItems = totalItems;
    }
    public setTransactions(transactions: number): void {
        this.transactions = transactions;
    }
}