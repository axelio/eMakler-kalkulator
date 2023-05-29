export const sellOperation = "S";
export const buyOperation = "K";
export type TransactionType = typeof sellOperation | typeof buyOperation;

export interface Transaction {
    stock: string;
    type: TransactionType;
    amount: number;
    price: number;
    commission: number;
    totalValue: number;
}

export type StockResult = {
    stock: string;
    buy: number;
    sell: number;
    boughtCnt: number;
    soldCnt: number;
    commission: number;
}

export type TotalResult = {
    buy: number;
    sell: number;
    commission: number;
}

export type ResultsCombined = {
    stockResults: StockResult[];
    totalResult: TotalResult;
}