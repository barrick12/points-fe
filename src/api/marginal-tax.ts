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

const MAX_RETRIES = 10;
//let retries = 0;

export const getTaxData = async (year: TTaxDataYear) => {
  
  return new Promise<TTaxBracket[]>((res,rej)=> setTimeout(() => res(mockTaxData[year]), 1000));
  
  // try {
  //   const res = await axios.get<TTaxBracket[]>(`http://localhost:5000/tax-calculator/brackets/${year}`)    
  //   return res.data;
  // } catch(error) {
  //   if(retries < MAX_RETRIES) {
  //     retries++;
  //     const delayRetry = new Promise<void>((res)=>{
  //       setTimeout(()=> res() , Math.pow(2, retries) + Math.random() * 1000);
  //     })
  //     delayRetry.then(()=>getTaxData(year))      
  //   }
  //   else throw error;
  // }

  // throw new Error('messed up!');
}