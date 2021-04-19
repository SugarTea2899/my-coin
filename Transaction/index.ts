import TxIn from "./TxIn";
import TxOut from "./TxOut";

class Transaction {
  public id: string;
  public senderAddress: string;
  public txIns: TxIn[];
  public txOuts: TxOut[];

  constructor(id: string, senderAddress: string, txIns: TxIn[], txOuts: TxOut[]) {
    this.id = id;
    this.senderAddress = senderAddress;
    this.txIns = txIns;
    this.txOuts = txOuts;
  }
}

export default Transaction;
