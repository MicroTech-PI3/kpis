import CustomerAmountSpent from "../../../../model/CustomerAmountSpent";

export default interface ICustomerAmountProvider {
    findAll(): Promise<CustomerAmountSpent[]>;
}