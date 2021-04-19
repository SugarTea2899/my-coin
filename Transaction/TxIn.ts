import { ec as EC } from "elliptic";

class TxIn {
  public txOutId: string;
  public txOutIndex: number;
  public signature: EC.Signature;

  constructor (txOutId: string, txOutIndex: number, signature: EC.Signature) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.signature = signature;
  }
}

export default TxIn;
