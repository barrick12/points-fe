import React from "react";
import "./table.css";
import { Loading } from "../loading/loading";

export type TTableRowData = {
  bracket: number[];
  marginalRate: number;
  amountTaxable: number;
  taxPayable: number;
};

export interface ITable {
  id: string;
  rows: TTableRowData[];
  isLoading: boolean;
}

export const Table = (props: ITable) => {
  const { id, rows, isLoading } = props;
  return (
    <table id={id} className={"table"}>
      <tr>
        <th>Tax Bracket</th>
        <th>Marginal Tax Rate</th>
        <th>Amount Taxable</th>
        <th>Tax Payable</th>
      </tr>
      {isLoading ? (
        <tr>
          <td
            colSpan={4}
            style={{ textAlign: "center", padding: "2rem 0 2rem 0" }}
          >
            <Loading />
          </td>
        </tr>
      ) : rows.length ? (
        rows.map((row, index) => {
          const { bracket, marginalRate, amountTaxable, taxPayable } = row;
          return (
            <tr key={`${id}-${index}`}>
              <td>{`$${bracket[0]} - $${bracket[1]}`}</td>
              <td>{`${marginalRate.toFixed(2)}%`}</td>
              <td>{`$${amountTaxable.toFixed(2)}`}</td>
              <td>{`$${taxPayable.toFixed(2)}`}</td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={4} style={{ textAlign: "center" }}>
            Nothing here yet!
          </td>
        </tr>
      )}
    </table>
  );
};
