import { StockResult, TotalResult, Transaction, buyOperation, sellOperation } from "../types/types";

const isTransactionTypeRow = (csvRow: any): boolean => csvRow.includes(gpw);

const convertCsvTransactionValueToNumber = (value: string): number =>
    //example value: 1 480,22
    Number(value
        .replaceAll(" ", "")
        .replaceAll(",", ".")
    );

const gpw = "WWA-GPW";
const tickerIndex = 1;
const typeIndex = 3;
const amountIndex = 4;
const priceIndex = 5;
const commissionIndex = 7;
const totalValueIndex = 9;

// const createDate = (value: string) => {
//     //example date from CSV: 18.05.2023 10:23:27
//     const space = ' ';
//     const dateWithoutHour = value.substring(0, value.search(space));
//     const splitted = dateWithoutHour.split('.');
//     const year = Number(splitted[2]);
//     const month = Number(splitted[1]);
//     const day = Number(splitted[0]);
//     return new Date(year, month, day);
// }

const createTransaction = (csvRow: any): Transaction =>
({
    stock: csvRow[tickerIndex],
    type: csvRow[typeIndex],
    amount: Number(csvRow[amountIndex]),
    price: convertCsvTransactionValueToNumber(csvRow[priceIndex]),
    commission: convertCsvTransactionValueToNumber(csvRow[commissionIndex]),
    totalValue: convertCsvTransactionValueToNumber(csvRow[totalValueIndex]),
});

const prepareEmptyStockResult = (stock: string): StockResult => ({ stock: stock, buy: 0, sell: 0, commission: 0, boughtCnt: 0, soldCnt: 0 });
const prepareEmptyTotalResult = (): TotalResult => ({ buy: 0, sell: 0, commission: 0 });

const updateStockResult = (result: StockResult, tran: Transaction) => {
    const { totalValue, amount, type, commission } = tran;

    if (tran.type === sellOperation) {
        result.sell += totalValue;
        result.soldCnt += amount;
    } else if (tran.type === buyOperation) {
        result.buy += totalValue;
        result.boughtCnt += amount;
    }
    else {
        throw new Error(`Unexpected transaction type: ${type}`);
    }

    result.commission += commission;
};

export const calculateStockResults = (results: any): Array<StockResult> => {
    const stockResults = results.data.reduce((stockResults: Record<string, StockResult>, csvRow: any) => {
        if (isTransactionTypeRow(csvRow)) {
            const tran = createTransaction(csvRow);
            stockResults[tran.stock] = stockResults[tran.stock] ?? prepareEmptyStockResult(tran.stock);
            updateStockResult(stockResults[tran.stock], tran);
        }

        return stockResults;
    }, {});

    return Object.values<StockResult>(stockResults);
}

export const calculateTotalResult = (stockResults: Array<StockResult>) => {
    const total = prepareEmptyTotalResult();

    for (const result of stockResults) {
        total.buy += result.buy;
        total.sell += result.sell;
        total.commission += result.commission;
    }

    return total;
}
