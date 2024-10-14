import ITransactionSizeProvider from "../../../domain/interfaces/infrastructure/repository/provider/ITransactionSizeProvider";
import DBTransactionSize from "../../../domain/model/database/DBTransactionSize";
import TransactionSize from "../../../domain/model/TransactionSize";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class TransactionSizeProvider
  implements ITransactionSizeProvider
{
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async find(): Promise<TransactionSize> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBTransactionSize>(
          `SELECT SUM(SIP.QUANTITY) AS TOTAL_ITEMS, COUNT(*)-1 AS TRANSACTIONS FROM SOLD_ITEMS SI JOIN SOLD_ITEMS_has_PRODUCT SIP ON SI.ID = SIP.SOLD_ITEMS_ID;`
        )
        .then((result) => {
          resolve(
            new TransactionSize(result[0].TOTAL_ITEMS, result[0].TRANSACTIONS)
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }
}
