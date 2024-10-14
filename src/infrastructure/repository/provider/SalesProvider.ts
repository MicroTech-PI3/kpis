import ISalesProvider from "../../../domain/interfaces/infrastructure/repository/provider/ISalesProvider";
import DBSales from "../../../domain/model/database/DBSales";
import Sales from "../../../domain/model/sales/Sales";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class SalesProvider implements ISalesProvider {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(
    iMonth: number,
    iYear: number,
    fMonth: number,
    fYear: number
  ): Promise<Sales[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBSales>(
          `SELECT MONTH(SI.DATE) AS MONTH, YEAR(SI.DATE) AS YEAR, SUM(SIP.QUANTITY * P.PRICE) AS SALES FROM SOLD_ITEMS SI JOIN SOLD_ITEMS_has_PRODUCT SIP ON SI.ID = SIP.SOLD_ITEMS_ID JOIN PRODUCT P ON SIP.PRODUCT_ID = P.ID WHERE MONTH(SI.DATE) IN (${iMonth}, ${fMonth}) AND YEAR(SI.DATE) IN (${iYear}, ${fYear}) GROUP BY YEAR, MONTH ORDER BY SALES DESC;`
        )
        .then((result) => {
          resolve(
            result.map((sales) => {
              return new Sales(sales.MONTH, sales.YEAR, sales.SALES);
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }
}
