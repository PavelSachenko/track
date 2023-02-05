import React, { useState } from 'react';
import { ValidationErrors } from "final-form";
import { Form } from "react-final-form";

import { IAnyObject } from '../../interfaces/interfaces';

import AsyncBtn from '../AsyncBtn/AsyncBtn';

interface IFormWizardProps {
  validate?: ((values: any) => ValidationErrors | Promise<ValidationErrors> | undefined) | undefined;
  onSubmit: (values: any) => Promise<any>;
  initialValues?: IAnyObject;
  onNextPage: (page: number) => void;
  onPrevPage: (page: number) => void;
  submitPending: boolean;
  setSubmitPending: (value: boolean) => void;
}

const FormWizard: React.FC<IFormWizardProps> & { Page: any } = ({ children, ...props }) => {
  const [page, setPage] = useState(0);

  const onPrevPage = () => {
    const newPage = Math.max(page - 1, 0);

    setPage(newPage);
    props.onPrevPage(newPage);
  }
  const onNextPage = () => {
    const newPage = Math.min(page + 1, React.Children.count(children) - 1);

    setPage(newPage);
    props.onNextPage(newPage);
  }

  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;

  const validate = (values: any) => {
    const activePage = React.Children.toArray(children)[page];
    // @ts-ignore
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  const onSubmit = (values: Record<string, any>) => {
    if (isLastPage) {
      props.setSubmitPending(true);
      
      return props.onSubmit(values);
    }
    return onNextPage();
  }

  console.log('FormWizard Render');
  return (
    <Form
      initialValues={props.initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          {activePage}
          <div className="auth-page__btns">
            {isLastPage
              ? (
                <AsyncBtn
                  type="submit"
                  className="btn btn--primary"
                  spinnerSize="18px"
                  pending={props.submitPending}
                  disabled={submitting}
                >
                  Submit
                </AsyncBtn>
              ) :
              <button
                className="btn btn--primary"
                type="submit"
              >
                Continue
              </button>
            }

            {page > 1 && (
              <button
                type="button" onClick={onPrevPage}
                className="btn btn--secondary"
              >
                Back
              </button>
            )}
          </div>
        </form>
      )}
    </Form>
  );
}

FormWizard.Page = ({ children }: { children: React.ReactChildren }) => children;
FormWizard.Page.displayName = 'FormWizard.Page';

export default FormWizard;