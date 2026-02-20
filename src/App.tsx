
import { useState } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormMaskedTextBox } from "./components/FormMaskedTextBox";
import { FormInput } from "./components/FormInput";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "./components/Stepper";
import "./App.css";


function App() {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState({
    step_one: {
        first_name: "",
        phone: "",
    },
     step_two: {
        first_name: "",
        phone: "",
    }
  });

  const handleSubmit = (dataItem: any) => {
    alert(JSON.stringify(dataItem, null, 2));
  };

  const copyValues = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      step_two: {
        first_name: prevValues.step_one.first_name,
        phone: prevValues.step_one.phone,
      },
    }));
  }

  const steps = ["Step 1", "Step 2"];

  return (
    <Form
      initialValues={formValues}
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <>
          <Stepper steps={steps} currentStep={step} onStepChange={setStep} />
          {step === 0 && (
            <FormElement>
              <label>
                <span>First Name</span>
              </label>
              <Field
                key="first_name"
                id="first_name"
                name="first_name"
                label="First Name"
                value={formValues.step_one.first_name}
                component={FormInput}
                required={true}
              />
              <label className="k-form-field">
                <span className="k-form-field-label">Phone</span>
              </label>
              <Field
                key="phone"
                id="phone"
                name="phone"
                label="Phone"
                value={formValues.step_one.phone}
                component={FormMaskedTextBox}
                mask="(999) 999-9999"
                required={true}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                  style={{ display: "none" }}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  disabled={!formRenderProps.allowSubmit}
                  onClick={() => setStep(1)}
                >
                  Next
                </Button>
              </div>
            </FormElement>
          )}
          {step === 1 && (
            <FormElement>
              <button onClick={copyValues}>Copy Values</button>
              <label>
                <span>First Name</span>
              </label>
              <Field
                key="first_name"
                id="first_name"
                name="first_name"
                label="First Name"
                value={formValues.step_two.first_name}
                component={FormInput}
                required={true}
              />
              <label className="k-form-field">
                <span className="k-form-field-label">Email</span>
              </label>
              <Field
                key="phone"
                id="phone"
                name="phone"
                label="Phone"
                value={formValues.step_two.phone}
                component={FormMaskedTextBox}
                mask="(999) 999-9999"
                required={true}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  type="button"
                  onClick={() => setStep(0)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Submit
                </Button>
              </div>
            </FormElement>
          )}
        </>
      )}
    />
  );
}

export default App;
