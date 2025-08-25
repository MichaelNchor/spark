import React, { createContext, useState, useContext } from "react";

const StepContext = createContext();

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  return (
    <StepContext.Provider value={{ step, setStep, totalSteps }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => useContext(StepContext);
