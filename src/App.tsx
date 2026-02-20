
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import type { FormRenderProps } from "@progress/kendo-react-form";
import { FormMaskedTextBox } from "./components/FormMaskedTextBox";
import { FormInput } from "./components/FormInput";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "./components/Stepper";
import "./App.css";

type FormValues = {
  first_name_step_one: string;
  phone_step_one: string;
  first_name_step_two: string;
  phone_step_two: string;
};

function App() {

  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({
    first_name_step_one: "",
    phone_step_one: "",
    first_name_step_two: "",
    phone_step_two: "",
  });

  console.log("Form Values:", formValues);

  const handleSubmit = (dataItem: { [name: string]: any }, event?: React.SyntheticEvent) => {
    alert(JSON.stringify(dataItem, null, 2));
  };

  const copyValues = (formRenderProps: FormRenderProps) => {
    // Key point to programmatically update form values using formRenderProps
    formRenderProps.onChange('first_name_step_two', { value: formValues.first_name_step_one });
    formRenderProps.onChange('phone_step_two', { value: formValues.phone_step_one });

    setFormValues((prevValues) => ({
      ...prevValues,
      first_name_step_two: formValues.first_name_step_one,
      phone_step_two: formValues.phone_step_one,
    }));
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const steps = ["Step 1", "Step 2"];

  return (
    <Form
      initialValues={formValues}
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <>
        {
          console.log("Form Values Render Props:", formRenderProps)
        }
          <Stepper steps={steps} currentStep={step} onStepChange={setStep} />
          {step === 0 && (
            <FormElement>
              <label>
                <span>First Name</span>
              </label>
              <Field
                key="first_name_step_one"
                id="first_name_step_one"
                name="first_name_step_one"
                label="First Name"
                value={formValues.first_name_step_one}
                component={FormInput}
                onChange={handleOnChange}
                required={true}
              />
              <label className="k-form-field">
                <span className="k-form-field-label">Phone</span>
              </label>
              <Field
                key="phone_step_one"
                id="phone_step_one"
                name="phone_step_one"
                label="Phone"
                value={formValues.phone_step_one}
                component={FormMaskedTextBox}
                onChange={handleOnChange}
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
              <button
                type="button"
                onClick={() => {
                  copyValues(formRenderProps)
                }}
              >
                Copy Values
              </button>
              <br />
              <label>
                <span>First Name</span>
              </label>
              <Field
                key="first_name_step_two"
                id="first_name_step_two"
                name="first_name_step_two"
                label="First Name"
                value={formValues.first_name_step_two}
                component={FormInput}
                onChange={handleOnChange}
                required={true}
              />
              <label className="k-form-field">
                <span className="k-form-field-label">Email</span>
              </label>
              <Field
                key="phone_step_two"
                id="phone_step_two"
                name="phone_step_two"
                label="Phone"
                value={formValues.phone_step_two}
                component={FormMaskedTextBox}
                onChange={handleOnChange}
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
