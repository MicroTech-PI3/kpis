import ICustomerAmountProvider from "../../../domain/interfaces/infrastructure/repository/provider/ICustomerAmountProvider";
import CustomerAmountSpent from "../../../domain/model/CustomerAmountSpent";
import CustomerPurchases from "../../../domain/model/CustomerPurchases";
import DBCustomerAmountSpent from "../../../domain/model/database/DBCustomerAmountSpent";
import { DBCustomerRepeatedPurchase } from "../../../domain/model/database/DBCustomerRepeatedPurchase";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class CustomerAmountProvider implements ICustomerAmountProvider {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(): Promise<CustomerAmountSpent[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBCustomerAmountSpent>(
          "SELECT CONCAT(C.NAME, ' ', C.LASTNAME) AS NAMES, SUM(P.PRICE * SIP.QUANTITY) AS TOTAL_SPENT FROM CUSTOMER C JOIN SOLD_ITEMS SI ON SI.CUSTOMER_ID = C.ID JOIN SOLD_ITEMS_has_PRODUCT SIP ON SIP.SOLD_ITEMS_ID = SI.ID JOIN PRODUCT P ON SIP.PRODUCT_ID = P.ID GROUP BY C.ID;"
        )
        .then((result) => {
          resolve(
            result.map((customerAmount) => {
              return new CustomerAmountSpent(
                customerAmount.NAMES,
                customerAmount.TOTAL_SPENT
              );
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  async findRepeatPurchase(): Promise<CustomerPurchases[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBCustomerRepeatedPurchase>(
          "SELECT COUNT(SI.CUSTOMER_ID) AS QUANTITY FROM CUSTOMER C LEFT JOIN SOLD_ITEMS SI ON SI.CUSTOMER_ID = C.ID GROUP BY C.ID;"
        )
        .then((result) => {
          resolve(
            result.map((customerPurchases) => {
              return new CustomerPurchases(customerPurchases.QUANTITY);
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }
}
