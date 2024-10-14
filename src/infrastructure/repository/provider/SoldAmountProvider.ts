import ISoldAmountProvider from "../../../domain/interfaces/infrastructure/repository/provider/ISoldAmountProvider";
import DBSoldAmount from "../../../domain/model/database/DBSoldAmount";
import SoldAmount from "../../../domain/model/SoldAmount";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class SoldAmountProvider implements ISoldAmountProvider {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(iDate: Date, fDate: Date): Promise<SoldAmount[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBSoldAmount>(
          `SELECT SUM(COALESCE(P.PRICE, 0) * COALESCE(SIP.QUANTITY, 0)) AS TOTAL_AMOUNT, DATE(SI.DATE) AS SALE_DATE FROM PRODUCT P JOIN SOLD_ITEMS_has_PRODUCT SIP ON P.ID = SIP.PRODUCT_ID JOIN SOLD_ITEMS SI ON SI.ID = SIP.SOLD_ITEMS_ID WHERE SI.DATE BETWEEN ${iDate} AND ${fDate} GROUP BY DATE(SI.DATE);`
        )
        .then((result) => {
          resolve(
            result.map((soldAmount) => {
              return new SoldAmount(
                soldAmount.TOTAL_AMOUNT,
                soldAmount.SALE_DATE
              );
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }
}
