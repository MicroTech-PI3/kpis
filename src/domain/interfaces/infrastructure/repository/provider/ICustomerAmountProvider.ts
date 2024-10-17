import CustomerAmountSpent from "../../../../model/CustomerAmountSpent";
import CustomerPurchases from "../../../../model/CustomerPurchases";

export default interface ICustomerAmountProvider {
  findAll(): Promise<CustomerAmountSpent[]>;
  findRepeatPurchase(): Promise<CustomerPurchases[]>;
}
