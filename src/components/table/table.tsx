import React from "react";
import "./table.css";

export type TTableRow = {
  bracket: number[];
  marginalRate: number;
  amountTaxable: number;
  taxPayable: number;
};

export interface ITable {
  id: string;
  rows: TTableRow[];
}

export const Table = (props: ITable) => {
  const { id, rows } = props;
  return (
    <table id={id} className={"table"}>
      <tr>
        <th>Tax Bracket</th>
        <th>Marginal Tax Rate</th>
        <th>Amount Taxable</th>
        <th>Tax Payable</th>
      </tr>
      {rows.map((row, index) => {
        const { bracket, marginalRate, amountTaxable, taxPayable } = row;
        return (
          <tr key={`${id}-${index}`}>
            <td>{`$${bracket[0]} - $${bracket[1]}`}</td>
            <td>{`${marginalRate}%`}</td>
            <td>{`$${amountTaxable}`}</td>
            <td>{`$${taxPayable}`}</td>
          </tr>
        );
      })}
    </table>
  );
};
