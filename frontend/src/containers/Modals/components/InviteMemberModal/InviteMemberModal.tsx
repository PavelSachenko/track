import { useState } from 'react';
import { Form, Field } from "react-final-form";

import API from '../../../../api/api';
import { useToggle } from '../../../../hooks';
import validateFormValues from "../../../../utils/validateFormValues";

import './InviteMemberModal.scss';
import { ReactComponent as AgentsIcon } from '../../../../icons/agents.svg'
import FormTextInput from '../../../../components/FormTextInput';
import AsyncBtn from '../../../../components/AsyncBtn/AsyncBtn';

interface IInviteFormValues {
  email: string;
}

const InviteMemberModal = (props: any) => {
  const {
    setPending,
    closeModal,
  } = props;

  const [serverErrors, setServerErrors] = useState({});

  const [pending, togglePending] = useToggle(false);

  const onSubmit = (values: IInviteFormValues) => {
    togglePending(true);
    setPending(true);

    API.sendInvite(values.email)
      .then(() => {
        setPending(false);
        closeModal();
      })
      .catch((err) => {
        setServerErrors({ email: err.response.data.message });
        togglePending(false);
        console.log(err);
      })
  }

  return (
    <div className="invite-member-modal modal-wrap">
      <div className="invite-member-modal__icon-wrap">
        <AgentsIcon />
      </div>

      <h2 className="invite-member-modal__title">Invite a member</h2>

      <Form
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label label--required">Email</label>
              <Field
                name="email"
                type="email"
                className="input invite-member-modal__input"
                errorInputClass="input--error"
                errorClass="form-group__error"
                component={FormTextInput}
                placeholder="Write a member's email"
                serverErrors={serverErrors}
              />
            </div>

            <div className="invite-member-modal__btns">
              <button
                type="button"
                className="invite-member-modal__cancel-btn btn"
                onClick={() => !props.pending && props.closeModal()}
              >
                Cancel
              </button>

              <AsyncBtn
                type="submit"
                className="invite-member-modal__send-btn btn btn--primary"
                spinnerSize="18px"
                pending={pending}
              >
                Send
              </AsyncBtn>
            </div>
          </form>
        )}
      </Form>
    </div>
  )
}

const validate = ({ email }: { email: string }) => {
  const errors: any = {};

  if (validateFormValues.isEmpty(email)) {
    errors.email = 'Enter the email';
  }
  else if (!validateFormValues.isEmail(email)) {
    errors.email = 'Incorrect email';
  }

  return errors;
};

export default InviteMemberModal;
