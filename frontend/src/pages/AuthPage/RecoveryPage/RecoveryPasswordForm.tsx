import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";

import { ROUTES } from "../../../config/constants";
import validateFormValues from "../../../utils/validateFormValues";
import { useDidMount } from "../../../hooks";
import AUTH_API from "../../../api/auth-api";
import { openModal, MODAL_TYPES } from '../../../redux/ducks/activeWindows';

import AsyncBtn from "../../../components/AsyncBtn/AsyncBtn";
import FormTextInput from "../../../components/FormTextInput";
export interface IRecoveryPasswordFormValues {
  password: string;
  password_confirmation: string;
  token: string;
}

const RecoveryPasswordForm = ({ recoveryToken }: { recoveryToken: string }) => {
  let dispatch = useDispatch();

  const firstInputRef = useRef<HTMLInputElement>(null);

  const [serverErrors, setServerErrors] = useState({});
  const [pending, setPending] = useState(false);

  useDidMount(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  });

  const resetPassword = (values: IRecoveryPasswordFormValues) => {
    setPending(true);

    AUTH_API.resetPassword(values)
      .then(() => {
        dispatch(openModal(MODAL_TYPES.successPasswordRecoveryModal));
      })
      .catch((err) => {
        setServerErrors(err.response.data.errors);
        setPending(false);
      });
  }

  console.log('RecoveryPasswordForm Render');
  return (
    <Form
      onSubmit={resetPassword}
      initialValues={{ token: recoveryToken }}
      validate={validate}
    >
      {({ handleSubmit, submitting }) => {
        return (
          <form
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label className="label label--required">Password</label>
              <Field
                name="password"
                type="password"
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                inputRef={firstInputRef}
                placeholder="Password"
                serverErrors={serverErrors}
              />
            </div>

            <div className="form-group">
              <label className="label label--required">Confirm Password</label>
              <Field
                name="password_confirmation"
                type="password"
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                placeholder="Confirm Password"
                serverErrors={serverErrors}
              />
            </div>

            <Link
              to={ROUTES.login}
              className="link"
            >
              Back to Sign In
            </Link>

            <div className="auth-page__btns">
              <AsyncBtn
                type="submit"
                className="btn btn--primary"
                spinnerSize="18px"
                pending={pending}
                disabled={submitting}
              >
                Reset password
              </AsyncBtn>
            </div>
          </form>
        )
      }}
    </Form>
  );
}

const validate = ({ password, password_confirmation }: IRecoveryPasswordFormValues) => {
  const errors: any = {};

  if (validateFormValues.isEmpty(password)) {
    errors.password = 'Enter the password';
  }
  if (password && password.length < 6) {
    errors.password = 'The new password must be at least 6 characters';
  }
  if (password && validateFormValues.isEmpty(password_confirmation)) {
    errors.password_confirmation = 'Enter the password again';
  }
  if (password && password !== password_confirmation) {
    errors.password_confirmation = 'Passwords are not match';
  }

  return errors;
};

export default RecoveryPasswordForm;