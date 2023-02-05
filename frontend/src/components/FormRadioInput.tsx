import React, { Fragment } from 'react';
import { FieldRenderProps } from 'react-final-form';

interface IRadioInputProps {
  className?: string;
  autoFocus?: boolean;
  getErrors?: any;
  placeholder?: string;
  errorClass?: string;
  errorInputClass?: string;
  options: [any];
  initialValue?: string;
  // isDisabled: boolean;
  // type?: string;
  input: FieldRenderProps<string, any>['input'];
  meta: FieldRenderProps<string | number, any>['meta'];
}

const RadioButtonField = (props: IRadioInputProps) => {
  const {
    input,
    className,
    options,
    // isDisabled,
    // type,
    meta: { error, touched, active }
  } = props;

  const { checked, ...withoutCheckedProps } = input;

  return (
    <>
      {options.map((o: any) => (
        <Fragment key={o.title}>
          <input
            {...withoutCheckedProps}
            id={o.title}
            className={className}
            defaultChecked={o.defaultChecked}
            value={o.value} />

          <label
            className={className}
            key={o.title}
            htmlFor={o.title}
          >
            {o.title}
          </ label>
        </Fragment>
      )
      )}

      {error && touched && !active && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

export default RadioButtonField;