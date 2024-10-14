export default abstract class SoldEntity {
    constructor(private name: string, private quantity: number){}
    public getName(): string {
        return this.name;
    }
    public getQuantity(): number {
        return this.quantity;
    }
    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
    public setName(name: string): void {
        this.name = name;
    }
}