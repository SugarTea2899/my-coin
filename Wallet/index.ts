import { verifyUnspentTxOut } from './../utils/commonUtils';
import { ec as EC } from "elliptic";
import Transaction from "../Transaction";
import TxIn from "../Transaction/TxIn";
import TxOut from "../Transaction/TxOut";
import UnspentTxOut from "../Transaction/UnspentTxOut";
import { getKeyPairFromPrivateKey } from "../utils/commonUtils";

class Wallet {
  public address: string;
  public keyPair: EC.KeyPair;

  constructor (privateKey: string) {
    this.keyPair = getKeyPairFromPrivateKey(privateKey);
    this.address = this.keyPair.getPublic().encode("hex", false);
  }

  getBalance (unspentTxOuts: UnspentTxOut[]): number {
    let balance = 0;

    unspentTxOuts.forEach(item => balance += item.amount);

    return balance;
  }

  createTransaction (receiptAddress: string, amount: number, unspentTxOuts: UnspentTxOut[]) {
    const {includedTxOuts, remainAmount} = this.findTxOutsForAmount(amount, unspentTxOuts);

    if (!includedTxOuts && !remainAmount) {
      const txOut = new TxOut(receiptAddress, amount);
      const txIns = includedTxOuts.map((unspentTxOut: UnspentTxOut) => {
        const txIn: TxIn = new TxIn(unspentTxOut.txOutId, unspentTxOut.txOutIndex, null);
        return txIn;
      })

      const transaction = new Transaction(this.address, txIns, [txOut]);

      return transaction;
    } else {
      throw new Error('You are not enough coin to send.');
    }
  }

  findTxOutsForAmount (amount: number, unspentTxOuts: UnspentTxOut[]): any {
      
  }

  signTransaction (transaction: Transaction, unspentTxOuts: UnspentTxOut[]) {

    if (transaction.senderAddress !== this.address) {
      throw new Error('Transaction address is not match');
    }

    transaction.txIns?.forEach((txIn: TxIn) => {
      if (!verifyUnspentTxOut(txIn.txOutId, txIn.txOutIndex, this.address, unspentTxOuts)) {
        throw new Error('Cannot find unspentTxOut by txIn');
      }

      txIn.signature = this.keyPair.sign(transaction.hashData());
    })
  }
}

export default Wallet;
