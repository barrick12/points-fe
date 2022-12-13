import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField, TTextFieldStatus } from "./index";

const id = "text-field";
const testId = "text-field-test";
const labelTestId = `${testId}-label`;
const value = "input value";
const status = "ok" as TTextFieldStatus;
const label = "label";
const onChange = jest.fn();
const required = false;
const helperErrorText = "helper error text";
const helperText = "helper text";
const disabled = false;

const mockProps = {
  id,
  testId,
  value,
  status,
  label,
  onChange,
  required,
  helperErrorText,
  helperText,
  disabled,
};

describe("[TextField]", () => {
  it("should render without issue", () => {
    render(<TextField {...mockProps} />);
    screen.getByText(label);
    screen.getByText(helperText);
    screen.getByTestId(testId); // input
    expect(screen.getByTestId(testId)).toHaveAttribute("value", value);
  });
  it("should have required input when specified", () => {
    render(<TextField {...mockProps} required />);
    expect(screen.getByTestId(testId)).toHaveAttribute("required");
  });
  it("should be disabled when specified", () => {
    render(<TextField {...mockProps} disabled />);
    expect(screen.getByTestId(testId)).toHaveAttribute("disabled");
  });
  it("should show error helper text when specified", () => {
    render(<TextField {...mockProps} status="error" />);
    screen.getByText(helperErrorText);
  });
  it("should call onChange when the input is typed in", () => {
    render(<TextField {...mockProps} />);
    userEvent.type(screen.getByTestId(testId), "aa");
    expect(onChange).toHaveBeenCalledTimes(2);
  });
  it("should not render a label if none is given", () => {
    render(<TextField {...mockProps} label="" />);
    expect(screen.queryByTestId(labelTestId)).toBeNull;
  });
});
