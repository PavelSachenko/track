import { useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "../../../config/constants";
import { useDidMount } from "../../../hooks";
import validateFormValues from "../../../utils/validateFormValues";
import AUTH_API from "../../../api/auth-api";

import FormTextInput from "../../../components/FormTextInput";
import AsyncBtn from "../../../components/AsyncBtn/AsyncBtn";
import AuthPage from "../AuthPage";

export interface ILoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const location = useLocation();

  const firstInputRef = useRef<HTMLInputElement>(null);

  const [serverErrors, setServerErrors] = useState({});
  const [pending, setPending] = useState(false);

  useDidMount(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  })

  const loginUser = (values: ILoginFormValues) => {
    setPending(true);

    console.log('submit login', values);
    AUTH_API.login(values)
      .then(res => {
        localStorage.token = res.data.token;

        const invitationToken = new URLSearchParams(location.search).get('invitationToken');

        if (invitationToken) {
          window.location.href = (ROUTES.invitation + '?invitationToken=' + invitationToken);
        }
        else {
          window.location.href = ROUTES.main;
        }
      })
      .catch((err) => {
        setServerErrors(err.response.data);
        setPending(false);
      })
  }


  console.log('LoginPage Render');
  return (
    <AuthPage
      title="Login"
      description="Sign in to continue"
    >
      <>
        <Form
          onSubmit={loginUser}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
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

              <div className="form-group">
                <label className="label label--required">Password</label>
                <Field
                  name="password"
                  type="password"
                  component={FormTextInput}
                  placeholder="Password"
                  className="input"
                  errorInputClass="input--error"
                  errorClass="form-group__error"
                  serverErrors={serverErrors}
                />
              </div>

              <Link
                to={ROUTES.recovery}
                className="link"
              >
                Forgot password?
              </Link>

              <div className="auth-page__btns">
                <AsyncBtn
                  type="submit"
                  className="btn btn--primary"
                  spinnerSize="18px"
                  pending={pending}
                  disabled={submitting}
                >
                  Login
                </AsyncBtn>
              </div>
            </form>
          )}
        </Form>

        <footer className="auth-page__footer">
          Don't have an account?&nbsp;
          <Link
            to={ROUTES.register}
            className="link"
          >
            Sign Up
          </Link>
        </footer>
      </>
    </AuthPage>
  );
}

const validate = (values: ILoginFormValues) => {
  const { password, email } = values;
  const errors: any = {};

  if (validateFormValues.isEmpty(email)) {
    errors.email = 'Enter the email';
  }
  else if (!validateFormValues.isEmail(email)) {
    errors.email = 'Incorrect email';
  }

  if (validateFormValues.isEmpty(password)) {
    errors.password = 'Enter the password';
  }

  return errors;
};

export default LoginPage;