import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField, TTextFieldStatus } from "./index";

const id = "text-field";
const testId = "text-field-test";
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
    screen.getByTestId(testId);
    expect(screen.getByTestId(testId)).toHaveAttribute("value", value);
  });
  it("should have required input when specified", () => {
    render(<TextField {...mockProps} required />);
    expect(screen.getByTestId(testId)).toHaveAttribute("required");
  });
  // it("should be required when specified", () => {});
});
