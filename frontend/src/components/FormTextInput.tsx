import React, { MutableRefObject } from "react";
import { FieldRenderProps } from "react-final-form";

import Spinner from "./Spinner/Spinner";
interface IFormTextInputProps {
  // name: string;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  serverErrors?: any;
  placeholder?: string;
  errorClass?: string;
  errorInputClass?: string;
  spinnerClass?: string;
  asyncValidation?: boolean;
  // type?: string;
  input: FieldRenderProps<string, HTMLInputElement>['input'];
  meta: FieldRenderProps<string | number, HTMLInputElement>['meta'];
  inputRef?: MutableRefObject<HTMLInputElement>;
}


const FormTextInput = (props: IFormTextInputProps) => {
  const {
    input,
    autoFocus,
    autoComplete,
    disabled,
    className,
    placeholder,
    serverErrors,
    inputRef,
    // type,
    meta: { error, touched, active, submitFailed, validating, dirty }
  } = props;

  const errorInputClass = (error && touched && !active && submitFailed)
    ? props.errorInputClass
    : '';

  const renderClientError = () => {
    if (props.asyncValidation) {
      return error && dirty && <div className={props.errorClass}>{error}</div>
    }
    return error && touched && !active && submitFailed && <div className={props.errorClass}>{error}</div>
  }

  return (
    <>
      <input
        {...input}
        disabled={disabled}
        type={input.type || "text"}
        ref={inputRef}
        placeholder={placeholder}
        className={`${className} ${errorInputClass}`}
        name={input.name}
        value={input.value}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
      />

      {/* Client Error */}
      {renderClientError()}
      {/* Server Error */}
      {serverErrors
        && serverErrors[input.name]
        && !error
        && <div className={props.errorClass}>{serverErrors[input.name]}</div>
      }
      {validating && <Spinner size="14px" className={props.spinnerClass} />}
    </>
  )
}

export default FormTextInput;