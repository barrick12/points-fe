import React from "react";
import "./table.css";
import { Loading } from "../loading/loading";
import { formatNumberToString } from "../../utils/format-number";
import {
  getTotalAmountPayable,
  getTotalTaxPayable,
} from "../../utils/get-total-tax";

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

  const loadingTableRow = () => (
    <tr>
      <td colSpan={4} style={{ textAlign: "center", padding: "2rem 0 2rem 0" }}>
        <Loading />
      </td>
    </tr>
  );
  const emptyTableRow = () => (
    <tr>
      <td colSpan={4} style={{ textAlign: "center" }}>
        Nothing here yet!
      </td>
    </tr>
  );

  return (
    <table id={id} className={"table"}>
      <tr>
        <th>Tax Bracket</th>
        <th>Marginal Tax Rate</th>
        <th>Amount Taxable</th>
        <th>Tax Payable</th>
      </tr>
      {isLoading
        ? loadingTableRow()
        : rows.length
        ? rows.map((row, index) => {
            const { bracket, marginalRate, amountTaxable, taxPayable } = row;
            const renderedBracket = `$${bracket[0].toLocaleString()}${
              bracket[1] === Number.MAX_SAFE_INTEGER
                ? "+"
                : ` - $${bracket[1].toLocaleString()}`
            }`;
            return (
              <>
                <tr>
                  <td>{renderedBracket}</td>
                  <td>{`${marginalRate.toLocaleString()}%`}</td>
                  <td>{`${formatNumberToString(amountTaxable)}`}</td>
                  <td>{`${formatNumberToString(taxPayable)}`}</td>
                </tr>
                {index === rows.length - 1 && (
                  <tr>
                    <td colSpan={2} style={{ textAlign: "right" }}>
                      Total:
                    </td>
                    <td>{`${formatNumberToString(
                      getTotalAmountPayable(rows)
                    )}`}</td>
                    <td>{`${formatNumberToString(
                      getTotalTaxPayable(rows)
                    )}`}</td>
                  </tr>
                )}
              </>
            );
          })
        : emptyTableRow()}
    </table>
  );
};
