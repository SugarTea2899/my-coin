import BlockChain from "../../BlockChain";
import Pool from "../../Transaction/Pool";
import UnspentTxOut from "../../Transaction/UnspentTxOut";

const _blockchain = new BlockChain();

const _unSpentTxOuts: Map<string, UnspentTxOut> = new Map<string, UnspentTxOut>();

const _publicKeys: Set<string> = new Set<string>();

const _pool: Pool = new Pool();

export const blockchain = _blockchain;

export const unSpentTxOuts = _unSpentTxOuts;

export const publicKeys = _publicKeys;

export const pool = _pool;