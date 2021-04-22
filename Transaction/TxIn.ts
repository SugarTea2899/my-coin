import { ec as EC } from "elliptic";

class TxIn {
  public txOutId: string;
  public signature: EC.Signature;

  constructor (txOutId: string, signature: EC.Signature) {
    this.txOutId = txOutId;
    this.signature = signature;
  }
}

export default TxIn;
