import React from "react";
import { render, screen } from "@testing-library/react";
import { Loading } from "./index";

const testId = "loading-test";

describe("[Loading]", () => {
  it("should render without issue", () => {
    render(<Loading testId={testId} />);
    screen.getByTestId(testId);
  });
});
