import { useState } from "react";

/*
state to implement multi-step form */
const useFormStep = (startStep = 1) => {
  const [step, setStep] = useState(startStep);
  const next = () => {
    setStep(step + 1);
  };
  const back = () => {
    setStep(step - 1);
  };
  return { step, next, back };
};

export default useFormStep;
