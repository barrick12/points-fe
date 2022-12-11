import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./loading.css";
import { useCreateTestId } from "../../utils/use-create-test-id";

export interface ILoading {
  testId?: string;
}

export const Loading = (props: ILoading): JSX.Element => {
  const { testId } = props;
  const testRef = useCreateTestId(testId);

  return (
    <div className="loading" ref={testRef}>
      <BeatLoader color="#03c3ca" />
    </div>
  );
};
