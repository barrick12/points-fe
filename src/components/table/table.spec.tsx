import React from "react";
import { render, screen } from "@testing-library/react";
import { Table } from "./index";

const id = "table";
const testId = "table-test";
const mockRows = [
  {
    bracket: [1000, 2000],
    marginalRate: 0.1,
    amountTaxable: 1000,
    taxPayable: 100,
  },
  {
    bracket: [2001, 3000],
    marginalRate: 0.2,
    amountTaxable: 999,
    taxPayable: 199.8,
  },
];
const isLoading = false;
const emptyContentMessage = "Nothing here yet!";

const mockProps = {
  id,
  testId,
  rows: mockRows,
  isLoading,
};

describe("[Table]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render without issue", () => {
    render(<Table {...mockProps} />);
    // check some headings
    screen.getByText("Tax Bracket");
    screen.getByText("Amount Taxable");
    // check some row data exists with expected formatting
    // row 1
    screen.getByText("$1,000 - $2,000");
    screen.getByText("$100.00");
    // row 2
    screen.getByText("$2,001 - $3,000");
    screen.getByText("$199.80");
  });
  it("should show loader when isLoading is true", () => {
    render(<Table {...mockProps} isLoading />);
    screen.getByTestId(`${testId}-loading`);
  });
  it("should indicate empty content when rows are empty", () => {
    render(<Table {...mockProps} rows={[]} />);
    screen.getByText(emptyContentMessage);
  });
});
