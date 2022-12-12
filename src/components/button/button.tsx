import React, { PropsWithChildren, MouseEvent } from "react";
import classNames from "classnames";
import { useCreateTestId } from "../../utils/use-create-test-id";
import "./button.css";

export interface IButton {
  id: string;
  onClick: (e: MouseEvent) => void;
  disabled?: boolean;
  testId?: string;
}

export const Button = (props: PropsWithChildren<IButton>) => {
  const { id, children, onClick, disabled = false, testId } = props;
  const testRef = useCreateTestId(testId);
  return (
    <button
      id={id}
      className={classNames("button", { disabled })}
      onClick={onClick}
      disabled={disabled}
      ref={testRef}
    >
      {children}
    </button>
  );
};
