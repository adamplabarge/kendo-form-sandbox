import React from "react";
import { Input } from '@progress/kendo-react-inputs';

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

export const FormInput = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        type,
        optional,
        value,
        wrapperStyle,
        onBlur,
        customProp,
        required,
        ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null | undefined = touched && validationMessage;
    const showHint: boolean = !!(showValidationMessage === false && hint);
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
                <Input
                    valid={valid}
                    type={type}
                    id={id}
                    disabled={disabled}
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    value={value}
                    onBlur={customOnBlur}
                    formNoValidate={true}
                    onInvalid={() => { }}
                    {...others}
                />
            </div>
        
    );
};