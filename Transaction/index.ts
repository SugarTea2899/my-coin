import { hash } from './../utils/commonUtils';
import TxIn from "./TxIn";
import TxOut from "./TxOut";

class Transaction {
  public id: string;
  public senderAddress: string;
  public remain: number;

  public txIns: TxIn[];
  public txOuts: TxOut[];

  constructor(senderAddress: string, remain: number, txIns: TxIn[], txOuts: TxOut[]) {
    this.senderAddress = senderAddress;
    this.txIns = txIns;
    this.txOuts = txOuts;
    this.remain = remain;
  }

  hashData(): string {
    const txInContent: string = this.txIns
      .map((txIn: TxIn) => txIn.txOutId)
      .reduce((a, b) => a + b, "");

    const txOutContent: string = this.txOuts
      .map((txOut: TxOut) => txOut.address + txOut.amount)
      .reduce((a, b) => a + b, "");

    return hash(txInContent + txOutContent);
  }
}

export default Transaction;
