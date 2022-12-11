import React, { useEffect, useState, MouseEvent } from "react";
import "./App.css";
import { TextField, TTextFieldStatus } from "./components/text-field";
import { Table } from "./components/table";
import { Button } from "./components/button";

function App() {
  const [salary, setSalary] = useState("");
  const [year, setYear] = useState("");
  const [salaryStatus, setSalaryStatus] = useState<TTextFieldStatus>("ok");
  const [yearStatus, setYearStatus] = useState<TTextFieldStatus>("ok");

  const onButtonClick = (e: MouseEvent) => {
    console.log("hello");
  };

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
      // debounce checks to be not be an annoyance
      const timerId = setTimeout(() => {
        setYearStatus(
          parseInt(year) > 1900 && /^[1-9][0-9]*$/g.test(year) ? "ok" : "error"
        );
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [year]);

  return (
    <div className="App">
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
          disabled
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
          helperText="Enter a year"
        />
        <Button id="submit-btn" onClick={onButtonClick}>
          Submit
        </Button>
      </div>
      <br />
      <Table
        id="myTable"
        rows={[
          {
            bracket: [10000, 20000],
            marginalRate: 10,
            amountTaxable: 10000,
            taxPayable: 1000,
          },
          {
            bracket: [20001, 30000],
            marginalRate: 20,
            amountTaxable: 10000,
            taxPayable: 2000,
          },
        ]}
      />
    </div>
  );
}

export default App;
