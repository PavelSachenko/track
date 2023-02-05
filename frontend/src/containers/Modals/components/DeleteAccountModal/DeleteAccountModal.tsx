import API from '../../../../api/api';
import { ROUTES } from '../../../../config/constants';

import './DeleteAccountModal.scss'
import { ReactComponent as CloseIcon } from '../../../../icons/close.svg';
import AsyncBtn from '../../../../components/AsyncBtn/AsyncBtn';

const DeleteAccountModal = (props: any) => {
  const {
    pending,
    setPending
  } = props;

  const deleteAccount = () => {
    setPending(true);

    return API.deleteUser()
      .then(() => {
        setPending(false);
        localStorage.removeItem('token');

        window.location.href = ROUTES.login;
      })
      .catch(console.error);
  }

  return (
    <div className="delete-account-modal modal-wrap">
      <div className="delete-account-modal__icon-wrap">
        <div className="delete-account-modal__icon">
          <CloseIcon />
        </div>
      </div>

      <h2 className="delete-account-modal__header">Delete Account</h2>

      <div className="delete-account-modal__text">Do you really want to delete your account?</div>

      <div className="delete-account-modal__btns">
        <button
          type="button"
          className="delete-account-modal__close-btn btn btn--cancel"
          onClick={() => !pending && props.closeModal()}
        >
          Close
        </button>

        <AsyncBtn
          type="button"
          className="btn btn--delete"
          spinnerSize="18px"
          onClick={deleteAccount}
        >
          Delete
        </AsyncBtn>
      </div>
    </div>
  )
}

export default DeleteAccountModal;
