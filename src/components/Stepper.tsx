import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      {steps.map((label, idx) => (
        <React.Fragment key={idx}>
          <button
            type="button"
            onClick={() => onStepChange(idx)}
            style={{
              background: idx === currentStep ? "#1976d2" : "#e0e0e0",
              color: idx === currentStep ? "#fff" : "#000",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              fontWeight: "bold"
            }}
            aria-current={idx === currentStep ? "step" : undefined}
          >
            {idx + 1}
          </button>
          <span style={{ margin: "0 8px" }}>{label}</span>
          {idx < steps.length - 1 && <span style={{ margin: "0 8px" }}>→</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
