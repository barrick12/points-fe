import { useRef, useEffect } from "react";

export function useCreateTestId(testId: string | undefined) {
  const testRef = useRef(null);
  useEffect(() => {
    if (testId?.length && testRef?.current) {
      (testRef?.current as HTMLElement).setAttribute("data-testid", testId);
    }
  }, [testRef, testId]);
  return testRef;
}
