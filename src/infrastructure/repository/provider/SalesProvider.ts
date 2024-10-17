import ISalesProvider from "../../../domain/interfaces/infrastructure/repository/provider/ISalesProvider";
import DBSales from "../../../domain/model/database/DBSales";
import Sales from "../../../domain/model/sales/Sales";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class SalesProvider implements ISalesProvider {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(iDate: string, fDate: string): Promise<Sales[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBSales>(
          `SELECT SI.DATE, SUM(SIP.QUANTITY * P.PRICE) AS SALES FROM SOLD_ITEMS SI JOIN SOLD_ITEMS_has_PRODUCT SIP ON SI.ID = SIP.SOLD_ITEMS_ID JOIN PRODUCT P ON SIP.PRODUCT_ID = P.ID WHERE SI.DATE BETWEEN '${iDate}' AND '${fDate}' GROUP BY SI.DATE ORDER BY SALES DESC;`
        )
        .then((result) => {
          resolve(
            result.map((sales) => {
              return new Sales(sales.DATE, sales.SALES);
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }
}
