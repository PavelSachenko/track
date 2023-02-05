import { useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";

import { ROUTES } from "../config/constants";
import { useDidMount } from "../hooks";
import validateFormValues from "../utils/validateFormValues";

import AsyncBtn from "./AsyncBtn/AsyncBtn";
import FormTextInput from "./FormTextInput";

interface IEmailFormProps {
  linkText: string;
  onSubmit: (email: string) => Promise<any>;
}

interface IEmailFormValues {
  email: string;
}

const EmailForm = (props: IEmailFormProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [serverErrors, setServerErrors] = useState({});
  const [pending, setPending] = useState(false);

  useDidMount(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  });

  const onSubmit = (values: IEmailFormValues) => {
    setPending(true);

    props.onSubmit(values.email)
      .catch((err) => {
        setServerErrors(err.response.data.errors);
        setPending(false);
      });
  }

  console.log('EmailForm Render');
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ handleSubmit, submitting }) => {
        return (
          <form
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label className="label label--required">Email Address</label>
              <Field
                name="email"
                type="email"
                inputRef={firstInputRef}
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                placeholder="Email"
                serverErrors={serverErrors}
              />
            </div>

            <Link
              to={ROUTES.login}
              className="link"
            >
              {props.linkText}
            </Link>

            <div className="auth-page__btns">
              <AsyncBtn
                type="submit"
                className="btn btn--primary"
                spinnerSize="18px"
                pending={pending}
                disabled={submitting}
              >
                Send instructions
              </AsyncBtn>
            </div>
          </form>
        )
      }}
    </Form>
  );
}

const validate = ({ email }: IEmailFormValues) => {
  const errors: any = {};

  if (validateFormValues.isEmpty(email)) {
    errors.email = 'Enter the email';
  }
  else if (!validateFormValues.isEmail(email)) {
    errors.email = 'Incorrect email';
  }

  return errors;
};

export default EmailForm;