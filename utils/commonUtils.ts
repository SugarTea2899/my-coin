import { SUCCESS_TRANSACTION, WAITING_CONFIRM } from './constants';
import { v1 as uuidv1 } from "uuid";
import { ec as EC } from "elliptic";
import SHA256 from "crypto-js/sha256";
import UnspentTxOut from "../Transaction/UnspentTxOut";
import Transaction from "../Transaction";
import TxIn from "../Transaction/TxIn";
import Block from "../BlockChain/Block";

const ec = new EC("secp256k1");

export const generateKeyPair = (): EC.KeyPair => {
  return ec.genKeyPair();
};

export const getKeyPairFromPrivateKey = (privateKey: string): EC.KeyPair => {
  return ec.keyFromPrivate(privateKey, "hex");
};

export const generateId = (): string => {
  return uuidv1();
};

export const hash = (data: string): string => {
  return SHA256(data).toString();
};

export const verifySignature = (publicKey, signature, dataHash): boolean => {
  return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
};

export const verifyTransaction = (publicKey: string, transaction: Transaction): boolean => {
  transaction.txIns.forEach((txIn: TxIn) => {
    if (!verifySignature(publicKey, txIn.signature, transaction.hashData()))
      return false;
  })

  return true;
}

export const verifyUnspentTxOut = (
  id: string,
  address: string,
  unspentTxOuts: Map<string, UnspentTxOut>
): boolean => {
  if (unspentTxOuts.get(id)?.address === address) return true;
  return false;
};

export const updateInPoolValueTransaction = (
  transaction: Transaction,
  unSpentTxOuts: Map<string, UnspentTxOut>
) => {

  transaction?.txIns?.forEach((txIn: TxIn) => {
    if (unSpentTxOuts.has(txIn.txOutId))
      unSpentTxOuts.get(txIn.txOutId).inPool = true;
  })
};

export const convertTransactionFromChain = (chain: Block[]): any => {
  let results = [];

  chain.forEach((block: Block) => {
    const transactions = block.data.map((tx: Transaction) => ({
      senderAddress: tx.senderAddress,
      receiverAddress: tx.txOuts[0].address,
      amount: tx.txOuts[0].amount,
      timeStamp: tx.timeStamp,
      id: tx.hashData(),
      status: SUCCESS_TRANSACTION
    }));

    results = [...results, ... transactions];
  })

  return results.reverse();
}

export const convertTransactionInPool = (txsInPool: Transaction[]): any => {
  return txsInPool.map((tx: Transaction) => ({
    senderAddress: tx.senderAddress,
    receiverAddress: tx.txOuts[0].address,
    amount: tx.txOuts[0].amount,
    timeStamp: tx.timeStamp,
    id: tx.hashData(),
    status: WAITING_CONFIRM
  })).reverse();
}
