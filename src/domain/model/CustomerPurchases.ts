export default class CustomerPurchases {
  constructor(private quantity: number) {}

  getQuantity(): number {
    return this.quantity;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}
