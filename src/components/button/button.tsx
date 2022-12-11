import React, { PropsWithChildren, MouseEvent } from "react";
import classNames from "classnames";
import "./button.css";

export interface IButton {
  id: string;
  onClick: (e: MouseEvent) => void;
  disabled?: boolean;
}

export const Button = (props: PropsWithChildren<IButton>) => {
  const { id, children, onClick, disabled = false } = props;
  return (
    <button
      id={id}
      className={classNames("button", { disabled })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
