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

  getBalance (unspentTxOuts: Map<string, UnspentTxOut>): number {
    let balance = 0;

    unspentTxOuts.forEach(item => balance += item.amount);

    return balance;
  }

  createTransaction (receiptAddress: string, amount: number, unspentTxOuts: Map<string, UnspentTxOut>) {
    const {includedTxOuts, remainAmount} = this.findTxOutsForAmount(amount, unspentTxOuts);

    if (!includedTxOuts && !remainAmount) {
      const txOut = new TxOut(receiptAddress, amount);
      const txIns = includedTxOuts.map((unspentTxOut: UnspentTxOut) => {
        const txIn: TxIn = new TxIn(unspentTxOut.txOutId, null);
        return txIn;
      })

      const transaction = new Transaction(this.address, txIns, [txOut]);

      return transaction;
    } else {
      throw new Error('You are not enough coins to send.');
    }
  }

  private findTxOutsForAmount (amount: number, unspentTxOuts: Map<string, UnspentTxOut>): any {
      let includedTxOuts = [];
      let remainAmount = 0;
      let curAmount = 0;

      unspentTxOuts.forEach((unspentTxOut: UnspentTxOut) => {
        if (this.address === unspentTxOut.address) {
          curAmount += unspentTxOut.amount;
          includedTxOuts.push(unspentTxOut);

          if (curAmount >= amount) {
            remainAmount = amount - curAmount;
            return {includedTxOuts, remainAmount}
          }
        }
      });
  }

  signTransaction (transaction: Transaction, unspentTxOuts: Map<string, UnspentTxOut>) {

    if (transaction.senderAddress !== this.address) {
      throw new Error('Transaction address is not match');
    }

    transaction.txIns?.forEach((txIn: TxIn) => {
      if (!verifyUnspentTxOut(txIn.txOutId, this.address, unspentTxOuts)) {
        throw new Error('Cannot find unspentTxOut by txIn');
      }

      txIn.signature = this.keyPair.sign(transaction.hashData());
    })
  }
}

export default Wallet;
