import { unSpentTxOuts } from "./../Server/data/index";
import { generateId, verifyTransaction } from "./../utils/commonUtils";
import Transaction from ".";
import UnspentTxOut from "./UnspentTxOut";
import TxIn from "./TxIn";
import TxOut from "./TxOut";

class Pool {
  public transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction: Transaction, unSpentTxOuts: Map<string, UnspentTxOut>) {
    transaction.txIns.forEach((txIn: TxIn) => {
      unSpentTxOuts.delete(txIn.txOutId);
    })

    if (transaction.remain > 0) {
      const unSpentTxOut = new UnspentTxOut(
        generateId(),
        transaction.senderAddress,
        transaction.remain,
      )
        
      unSpentTxOuts.set(unSpentTxOut.txOutId, unSpentTxOut);
    }

    this.transactions.push(transaction);
  }

  getValidTransactions(): Transaction[] {
    const validTransactions = [];

    this.transactions.forEach((transaction: Transaction) => {
      if (verifyTransaction(transaction.senderAddress, transaction))
        validTransactions.push(transaction);
    });

    return validTransactions;
  }
  
  getInvalidTransactions(): Transaction[] {
    const inValidTransactions = [];

    this.transactions.forEach((transaction: Transaction) => {
      if (!verifyTransaction(transaction.senderAddress, transaction))
        inValidTransactions.push(transaction);
    });

    return inValidTransactions;
  }

  clearTransaction(unSpentTxOuts: Map<string, UnspentTxOut>) {
    const validTransactions = this.getValidTransactions();

    // update unspentTxOuts
    validTransactions.forEach((transaction: Transaction) => {

      // add new unspent txOut
      transaction.txOuts.forEach((txOut: TxOut) => {
        const unspentTxOut = new UnspentTxOut(
          generateId(),
          txOut.address,
          txOut.amount
        );

        unSpentTxOuts.set(unspentTxOut.txOutId, unspentTxOut);
      })
    });

    this.transactions = this.getInvalidTransactions();
  }
}

export default Pool;
