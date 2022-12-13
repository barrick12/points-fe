import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import { mockTaxData } from "./api/marginal-tax-mock-data";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

// some of this might be best tested in an end-to-end test
// suite like Cypress

// there are many more possible test cases, including validation, fetching
// different tax year data, failed network calls, etc, but I won't check those here

describe("[App]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render without issue", () => {
    render(<App />);
    // heading
    screen.getByText("Marginal Tax Calculator");
    // text fields
    screen.getByText("Annual Salary");
    screen.getByText("Tax Year");
    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("disabled");
    // table column header
    screen.getByText("Tax Bracket");
    // table empty content
    screen.getByText("Nothing here yet!");
  });
  it("should fetch tax data without issue when submit is pressed", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    axios.mockImplementation(() =>
      Promise.resolve({ data: { tax_brackets: mockTaxData[2020] } })
    );
    render(<App />);
    const inputSalary = screen.getByLabelText("Annual Salary", {
      exact: false,
    });
    const inputYear = screen.getByLabelText("Tax Year", {
      exact: false,
    });
    userEvent.type(inputSalary, "100000");
    userEvent.type(inputYear, "2020");
    userEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(screen.queryAllByRole("row").length).toBe(5);
      // check some table details
      // brackets and tax payable
      screen.getByText("$0 - $48,535");
      screen.getByText("$7,280.25");
      //
      screen.getByText("$48,535 - $97,069");
      screen.getByText("$9,949.47");
      //
      screen.getByText("$97,069 - $150,473");
      screen.getByText("$762.06");
      //
      // check total tax payable
      screen.getByText("Total:", { exact: false });
      screen.getByText("$17,991.78");
      //
      // check effect tax rate
      screen.getByText("Effective Tax Rate:", { exact: false });
      screen.getByText("17.99", { exact: false });
    });
  });
});
