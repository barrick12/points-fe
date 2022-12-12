import React, { useEffect, useState, MouseEvent } from "react";
import "./App.css";
import { TextField, TTextFieldStatus } from "./components/text-field";
import { Table, TTableRowData } from "./components/table";
import { Button } from "./components/button";
import { fetchTaxData, getEffectiveTaxRate } from "./App-helper";
import { TTaxDataYear } from "./api";
import calculatorAppIcon from "./assets/calculator-app-icon.png";

function App() {
  const [salary, setSalary] = useState("");
  const [year, setYear] = useState("");
  const [salaryStatus, setSalaryStatus] = useState<TTextFieldStatus>("ok");
  const [yearStatus, setYearStatus] = useState<TTextFieldStatus>("ok");
  //
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<TTableRowData[]>([]);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
  const [isError, setIsError] = useState(false);

  // derived values -- could be memoized if they were expensive
  const isYearValid =
    parseInt(year) > 2018 &&
    parseInt(year) < 2022 &&
    /^[1-9][0-9]*$/g.test(year);
  const isButtonDisabled =
    salary && salaryStatus === "ok" && year && !isLoading && isYearValid
      ? false
      : true;

  const onClickSubmit = (e: MouseEvent) => {
    setIsLoading(true);
  };

  useEffect(() => {
    // get data and generate table rows
    if (isLoading && year && salary) {
      if (isError) setIsError(false);
      (async () => {
        try {
          const rows = await fetchTaxData(
            parseInt(year) as TTaxDataYear,
            parseInt(salary)
          );
          setRows(rows);
          setEffectiveTaxRate(getEffectiveTaxRate(rows, parseInt(salary)));
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isLoading]);
  // validate salary
  useEffect(() => {
    if (!salary) setSalaryStatus("ok");
    else {
      setSalaryStatus(/^[1-9][0-9]*$/g.test(salary) ? "ok" : "error");
    }
  }, [salary]);
  // validate year
  useEffect(() => {
    if (!year) setYearStatus("ok");
    else {
      // debounce checks to be not a nuissance when typing
      const timerId = setTimeout(() => {
        setYearStatus(isYearValid ? "ok" : "error");
      }, 500);
      return () => clearTimeout(timerId);
    }
  }, [year]);

  return (
    <div className="App">
      <h1>
        <img
          src={calculatorAppIcon}
          alt="calculator"
          width="32px"
          height="32px"
          style={{ marginBottom: "-0.25rem", marginRight: "0.5rem" }}
        />
        Marginal Tax Calculator
      </h1>
      <div className="fieldContainer">
        <TextField
          id="salary-field"
          value={salary}
          status={salaryStatus}
          onChange={(e) => {
            setSalary((e.target as HTMLInputElement).value);
          }}
          label="Annual Salary"
          required
          helperErrorText="Invalid Number"
          helperText="Enter a number"
          disabled={isLoading}
        />
        <TextField
          id="year-field"
          value={year}
          status={yearStatus}
          onChange={(e) => {
            setYear((e.target as HTMLInputElement).value);
          }}
          label="Tax Year"
          required
          helperErrorText="Invalid Year"
          helperText="Enter a year (2019-2021)"
          disabled={isLoading}
        />
        <div style={{ marginBottom: "0.5rem" }}>
          <Button
            id="submit-btn"
            onClick={onClickSubmit}
            disabled={isButtonDisabled}
          >
            Submit
          </Button>
        </div>
      </div>
      {!isError && <Table id="myTable" rows={rows} isLoading={isLoading} />}
      {!isError && rows.length > 0 && !isLoading && (
        <div className="effectiveTaxRate">
          Effective Tax Rate: {effectiveTaxRate.toFixed(2)}%
        </div>
      )}
      {isError && <h2>Oops! Something went wrong, try again later.</h2>}
    </div>
  );
}

export default App;
