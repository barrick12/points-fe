import { mockTaxData } from "./marginal-tax-mock-data";
import axios from 'axios';

export type TTaxDataYear = 2019 | 2020 | 2021;

export type TTaxData = {
  [key in TTaxDataYear]: TTaxBracket[]
}

export type TTaxBracket = {
  min: number,
  max?: number,
  rate: number;
}

const MAX_RETRIES = 5;
let retries = 0;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getTaxData = async (year: TTaxDataYear) => {
  // return new Promise<TTaxBracket[]>((res,rej)=> setTimeout(() => res(mockTaxData[year]), 1000));
  try {
    const res = await axios({method: 'get', url: `http://localhost:9001/tax-calculator/brackets/${year}`, timeout: 6000})
    const brackets: TTaxBracket[] = res.data.tax_brackets;
    // the last rate in the 2019 bracket data is a string
    // converting to a float
    if(year === 2019) {      
      brackets[brackets.length - 1].rate = parseFloat(res.data.tax_brackets[res.data.tax_brackets.length - 1].rate);
    }
    retries = 0;
    return brackets;
  } catch(error) {    
    if(retries < MAX_RETRIES) {      
      retries++;
      const delayRetry = new Promise<void>((res)=>{
        setTimeout(()=> res() , Math.pow(2, retries) + Math.random() * 1000);
      })
      await delayRetry;
      return await getTaxData(year);
    }
    else {
      // swallow error and show 'oops' message in ui when array is empty
      return [];
    }
  }
}