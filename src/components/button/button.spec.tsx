import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./index";

const id = "button";
const testId = "button-test";
const onClick = jest.fn();
const disabled = false;
const buttonText = "Submit";

const mockProps = {
  id,
  testId,
  onClick,
  disabled,
};

describe("[Button]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render without issue", () => {
    render(<Button {...mockProps}>{buttonText}</Button>);
    screen.getByText(buttonText);
  });
  it("should call onClick when clicked", () => {
    render(<Button {...mockProps}>{buttonText}</Button>);
    userEvent.click(screen.getByText(buttonText));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
