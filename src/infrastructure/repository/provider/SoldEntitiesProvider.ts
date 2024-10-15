import ISoldEntitiesProvider from "../../../domain/interfaces/infrastructure/repository/provider/ISoldEntitiesProvider";
import DBSoldEntity from "../../../domain/model/database/DBSoldEntity";
import { SoldProductOptions } from "../../../domain/model/enum/SoldProductOptions";
import SoldCategory from "../../../domain/model/soldEntities/SoldCategory";
import SoldProduct from "../../../domain/model/soldEntities/SoldProduct";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class SoldEntitiesProvider implements ISoldEntitiesProvider {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAllProducts(
    iDate: string,
    fDate: string,
    option: SoldProductOptions
  ): Promise<SoldProduct[]> {
    let query = "";

    switch (option) {
      case SoldProductOptions.MOST:
        query = `SELECT P.NAME, SUM(SIP.QUANTITY) AS QUANTITY FROM PRODUCT P JOIN SOLD_ITEMS_has_PRODUCT SIP ON P.ID = SIP.PRODUCT_ID JOIN SOLD_ITEMS SI ON SI.ID = SIP.SOLD_ITEMS_ID GROUP BY P.ID ORDER BY QUANTITY DESC LIMIT 10;`;
        break;
      case SoldProductOptions.LEAST:
        query = `SELECT P.NAME, SUM(SIP.QUANTITY) AS QUANTITY FROM PRODUCT P JOIN SOLD_ITEMS_has_PRODUCT SIP ON P.ID = SIP.PRODUCT_ID JOIN SOLD_ITEMS SI ON SI.ID = SIP.SOLD_ITEMS_ID GROUP BY P.ID ORDER BY QUANTITY ASC LIMIT 10;`;
        break;
      case SoldProductOptions.DATES:
        query = `SELECT P.NAME, SUM(SIP.QUANTITY) FROM PRODUCT P JOIN SOLD_ITEMS_has_PRODUCT SIP ON P.ID = SIP.PRODUCT_ID JOIN SOLD_ITEMS SI ON SI.ID = SIP.SOLD_ITEMS_ID WHERE SI.DATE BETWEEN ${iDate} AND ${fDate} GROUP BY P.ID;`;
        break;
      default:
        break;
    }

    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBSoldEntity>(query)
        .then((result) => {
          resolve(
            result.map((soldProduct) => {
              return new SoldProduct(soldProduct.NAME, soldProduct.QUANTITY);
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  async findAllCategories(): Promise<SoldCategory[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBSoldEntity>(
          `SELECT C.NAME, SUM(SIP.QUANTITY) AS QUANTITY FROM CATEGORY C JOIN PRODUCT P ON P.CATEGORY_ID = C.ID JOIN SOLD_ITEMS_has_PRODUCT SIP ON P.ID = SIP.PRODUCT_ID JOIN SOLD_ITEMS SI ON SI.ID = SIP.SOLD_ITEMS_ID GROUP BY C.ID ORDER BY QUANTITY DESC;`
        )
        .then((result) => {
          resolve(
            result.map((soldCategory) => {
              return new SoldCategory(soldCategory.NAME, soldCategory.QUANTITY);
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }
}
