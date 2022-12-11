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

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  const { config } = error; 
  config.retry -=1;
  const delayRetry = new Promise<void>((res,rej)=>{
    setTimeout(()=> res() ,1000);
  })
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(config.retry > 0)
    return delayRetry.then(()=>axiosInstance(config))
  return Promise.reject(error);
});

export const getMockTaxData = (year: TTaxDataYear) => {
  return new Promise<TTaxBracket[]>((res,rej)=> setTimeout(() => res(mockTaxData[year]), 1000));
}