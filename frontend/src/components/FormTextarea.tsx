import React, { MutableRefObject, useEffect, useRef } from "react";
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
  rows?: number;
  input: FieldRenderProps<string, HTMLTextAreaElement>['textarea'];
  meta: FieldRenderProps<string | number, HTMLTextAreaElement>['meta'];
  inputRef?: MutableRefObject<HTMLTextAreaElement>;
}

const FormTextTextarea = (props: IFormTextInputProps) => {
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

  const textareaRef = useRef<FieldRenderProps<HTMLTextAreaElement>['textarea']>(null);

  const inputHeightAutosize = (): void => {
    if (inputRef && inputRef.current) {
      inputRef.current.style.height = '';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
    else {
      textareaRef.current.style.height = '';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    inputHeightAutosize();
  }, [input.value])


  const errorInputClass = (error && touched && !active)
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
      <textarea
        {...input}
        disabled={disabled}
        ref={inputRef ? inputRef : textareaRef}
        placeholder={placeholder}
        className={`${className} ${errorInputClass}`}
        name={input.name}
        value={input.value}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        rows={props.rows || 1}
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

export default FormTextTextarea;