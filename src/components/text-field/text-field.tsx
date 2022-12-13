import React from "react";
import classNames from "classnames";
import { useCreateTestId } from "../../utils/use-create-test-id";
import "./text-field.css";

export type TTextFieldStatus = "error" | "ok";

export interface ITextField {
  id: string;
  value: string;
  status?: TTextFieldStatus;
  label: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
  required?: boolean;
  helperErrorText?: string;
  helperText?: string;
  disabled?: boolean;
  testId?: string;
}

export const TextField = (props: ITextField) => {
  const {
    id,
    value,
    status = "ok",
    label,
    onChange,
    required = false,
    helperErrorText,
    helperText,
    disabled = false,
    testId,
  } = props;
  const testRef = useCreateTestId(testId);
  const labelRef = useCreateTestId(testId ? `${testId}-label` : "");
  return (
    <div className={classNames("textField", { disabled })}>
      {label && (
        <label htmlFor={id} ref={labelRef}>
          {label}
          {required && (
            <span className="required" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <input
        id={id}
        type="text"
        className={classNames("input", {
          error: status === ("error" as TTextFieldStatus),
        })}
        value={value}
        onInput={onChange}
        required={required}
        disabled={disabled}
        autoComplete={"off"}
        autoCorrect={"off"}
        ref={testRef}
      />
      {status === "error" ? (
        <div className="helperErrorText">{helperErrorText}</div>
      ) : (
        <div className="helperText">{helperText}</div>
      )}
    </div>
  );
};
