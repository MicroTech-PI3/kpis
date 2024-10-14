import TransactionSize from "../../../../model/TransactionSize";

export default interface TransactionSizeProvider {
    find(): Promise<TransactionSize>;
}