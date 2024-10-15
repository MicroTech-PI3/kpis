import TransactionSize from "../../../../model/TransactionSize";

export default interface ITransactionSizeProvider {
  find(): Promise<TransactionSize>;
}
