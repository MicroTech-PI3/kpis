import { ResultSetHeader } from "mysql2";
import ICustomerSetter from "../../../domain/interfaces/infrastructure/repository/setter/ICustomerSetter";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class CustomerSetter implements ICustomerSetter {
  constructor(private readonly mySqlDbc: MySqlDBC) {}

  async updateBillVia(billVia: string, customerId: number): Promise<boolean> {
    const result = await this.mySqlDbc.query<ResultSetHeader>(
      `UPDATE CUSTOMER SET BILL_VIA = '${billVia} WHERE ID = ${customerId}'`
    );
    return result[0].affectedRows === 1;
  }
}
