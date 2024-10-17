import ICustomersData from "../domain/interfaces/application/ICustomersData";
import ICustomerAmountProvider from "../domain/interfaces/infrastructure/repository/provider/ICustomerAmountProvider";
import CustomerAmountSpent from "../domain/model/CustomerAmountSpent";

export default class CustomersData implements ICustomersData {
  constructor(
    private readonly customerAmountProvider: ICustomerAmountProvider
  ) {}

  async getCustomers(): Promise<CustomerAmountSpent[]> {
    return this.customerAmountProvider.findAll();
  }

  async getRPR(): Promise<number> {
    const customers = await this.customerAmountProvider.findRepeatPurchase();
    let total = customers.length;
    let repeatedCustomers = 0;

    customers.forEach((customer) => {
      if (customer.getQuantity() > 1) {
        repeatedCustomers++;
      }
    });

    return (repeatedCustomers / total) * 100;
  }
}
