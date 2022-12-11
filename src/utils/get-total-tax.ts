import { TTableRowData } from "../components/table"

export const getTotalAmountPayable = (rows: TTableRowData[]) => {
  return rows.reduce((prev,curr)=>{ return prev + curr.amountTaxable },0)
}

export const getTotalTaxPayable = (rows: TTableRowData[]) => {
  return rows.reduce((prev,curr)=>{ return prev + curr.taxPayable },0)
}