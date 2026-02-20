import React from "react";
import { MaskedTextBox } from "@progress/kendo-react-inputs";

type FieldRenderProps = {
  validationMessage?: string;
  touched?: boolean;
  label?: string;
  id: string;
  value: any;
  disabled?: boolean;
  valid?: boolean;
  hint?: string;
  type?: string;
  optional?: boolean;
  wrapperStyle?: React.CSSProperties;
  onBlur?: () => void;
  customProp?: {
    onBlur?: (fieldRenderProps: FieldRenderProps) => void;
    [key: string]: any; // Allow for additional custom properties
  };
  required?: boolean | "yes" | "no";
  [key: string]: any; // Allow for additional properties
};

export const FormMaskedTextBox = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    value,
    disabled,
    valid,
    hint,
    optional,
    required,
    onBlur,
    customProp,
    ...others
  } = fieldRenderProps;

  const showValidationMessage: string | false | null | undefined =
    touched && validationMessage;
  const showHint: boolean = !showValidationMessage && !!hint;
  const hintId: string = showHint ? `${id}_hint` : "";
  const errorId: string = showValidationMessage ? `${id}_error` : "";

  const customOnBlur = () => {
    if (onBlur) {
      onBlur();
    }
    if (customProp?.onBlur) {
      customProp.onBlur(fieldRenderProps);
    }
  };

  return (
    <div className="vertical-flex">
      <MaskedTextBox
        ariaDescribedBy={`${hintId} ${errorId}`}
        valid={valid}
        id={id}
        value={value}
        disabled={disabled}
        onBlur={customOnBlur}
        {...others}
      />
    </div>
  );
};
