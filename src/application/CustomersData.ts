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
}
