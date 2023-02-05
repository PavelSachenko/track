import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';

import API from '../../api/api';
import validateFormValues from '../../utils/validateFormValues';
import { MODAL_TYPES, openModal } from '../../redux/ducks/activeWindows';

import './SettingsSecurity.scss';
import { ReactComponent as TrashIcon } from '../../icons/trash.svg';
import FormTextInput from '../../components/FormTextInput';
import AsyncBtn from '../../components/AsyncBtn/AsyncBtn';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';

export interface IResetPasswordFormValues {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

const SettingsSecurity = () => {
  const dispatch = useDispatch();

  const [pending, setPending] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const updatePassword = (values: IResetPasswordFormValues, form: any) => {
    setPending(true);

    API.changePassword(values)
      .then(() => {
        dispatch(openModal(MODAL_TYPES.successPasswordChangeModal));
        setPending(false);
        setServerErrors({});
        form.reset();
      })
      .catch((err) => {
        setPending(false);
        setServerErrors(err.response.data.errors);
      });
  }

  const handleDeleteAccountClick = () => {
    dispatch(openModal(MODAL_TYPES.deleteAccountModal))
  }

  return (
    <div className="settings-security">
      <div className="settings-security__header">
        <ReturnBtn route="/settings" />

        <h2 className="settings-security__title">Security</h2>
      </div>

      <Form
        validate={validatePasswords}
        onSubmit={updatePassword}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className="settings-security__form">
            <div className="form-group">
              <label className="label label--required">Your password</label>

              <Field
                name="oldPassword"
                type="password"
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                placeholder="Select Password"
                serverErrors={serverErrors}
              />
            </div>

            <div className="form-group">
              <label className="label label--required">New password</label>

              <Field
                name="newPassword"
                type="password"
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                placeholder="New Password"
                serverErrors={serverErrors}
              />
            </div>

            <div className="form-group">
              <label className="label label--required">Repeat password</label>

              <Field
                name="passwordConfirmation"
                type="password"
                className="input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                placeholder="Repeat Password"
                serverErrors={serverErrors}
              />
            </div>

            <button 
              className="settings-security__delete" 
              type="button" 
              onClick={handleDeleteAccountClick}
            >
              <TrashIcon className="settings-security__delete-icon" />

              <span>Delete Account</span>
            </button>

            <AsyncBtn
              type="submit"
              className="settings-security__save-btn btn btn--primary"
              spinnerSize="18px"
              pending={pending}
              disabled={submitting}
            >
              Save
            </AsyncBtn>
          </form>
        )}
      </Form>
    </div >
  )
}

const validatePasswords = ({ oldPassword, newPassword, passwordConfirmation }: IResetPasswordFormValues) => {
  const errors: any = {};

  if (validateFormValues.isEmpty(oldPassword)) {
    errors.oldPassword = 'Enter the password';
  }
  if (oldPassword && validateFormValues.isEmpty(newPassword)) {
    errors.newPassword = 'Enter a new password';
  }
  if (oldPassword && newPassword?.length < 6) {
    errors.newPassword = 'The new password must be at least 6 characters';
  }
  if (oldPassword && newPassword && validateFormValues.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation = 'Enter the new password again';
  }
  if (newPassword && (validateFormValues.isEmpty(passwordConfirmation) || newPassword !== passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords are not match';
  }
  return errors;
}

export default SettingsSecurity;
