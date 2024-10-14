import CustomerAmountSpent from "../../model/CustomerAmountSpent";

export default interface ICustomersData {
  getCustomers(): Promise<CustomerAmountSpent[]>;
}
