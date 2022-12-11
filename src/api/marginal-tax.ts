import { mockTaxData } from "./marginal-tax-mock-data";

export type TTaxDataYear = 2019 | 2020 | 2021;

export type TTaxData = {
  [key in TTaxDataYear]: TTaxBracket[]
}

export type TTaxBracket = {
  min: number,
  max?: number,
  rate: number;
}

export const getMockTaxData = (year: TTaxDataYear) => {
  return new Promise<TTaxBracket[]>((res,rej)=> setTimeout(() => res(mockTaxData[year]), 1000));
}