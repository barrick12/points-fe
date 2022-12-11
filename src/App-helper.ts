import { getMockTaxData, TTaxDataYear, TTaxBracket } from "./api/marginal-tax";
import { TTableRowData } from './components/table';

export const fetchTaxData = async (year: TTaxDataYear, salary: number) => {
    const res = await getMockTaxData(year);
    return getTableRows(res, salary);
}

export const getTableRows = (brackets: TTaxBracket[], salary: number ) => {
  const tableRows: TTableRowData[] = [];
  for(const respbracket of brackets) {
    const bracket = [respbracket.min,respbracket?.max ?? Number.MAX_SAFE_INTEGER];
    const amountTaxable = getAmountTaxable(salary, bracket);
    if(amountTaxable === 0) break;
    const taxPayable = getTaxPayable(amountTaxable, respbracket.rate);
    const row: TTableRowData = {
      bracket,
      marginalRate: respbracket.rate * 100,
      amountTaxable,
      taxPayable,
    }
    tableRows.push(row);
  }
  return tableRows;
}

const getAmountTaxable = (salary: number, bracket: number[]): number => {
  if(salary > bracket[1])
    return Math.round((bracket[1] - bracket[0]) * 100 / 100);
  if(salary < bracket[0])
    return 0;
  return Math.round((salary - bracket[0]) * 100 / 100)
}

const getTaxPayable = (amountTaxable: number, rate: number): number => {
  return Math.round(amountTaxable * rate * 100) / 100;
}

export const getEffectiveTaxRate = (rows: TTableRowData[], salary: number) => {
  let totalAmountPayable = 0;
  for(const row of rows) {
    totalAmountPayable += row.taxPayable;
  }
  return totalAmountPayable / salary * 100;
}