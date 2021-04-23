import BlockChain from "../../BlockChain";
import UnspentTxOut from "../../Transaction/UnspentTxOut";

const _blockchain = new BlockChain();

const _unSpentTxOuts: UnspentTxOut[] = [];

export const blockchain = _blockchain;

export const unSpentTxOuts = _unSpentTxOuts;