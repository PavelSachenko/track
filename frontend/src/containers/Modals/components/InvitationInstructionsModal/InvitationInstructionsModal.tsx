import { ROUTES } from '../../../../config/constants';
import API from '../../../../api/api';

import { ReactComponent as CheckIcon } from '../../../../icons/check.svg';
import './InvitationInstructionsModal.scss';

// interface IInvitationInstructionsModalProps {
//   closeModal: () => void;
//   type: 'register' | 'login';
//   invitationToken: string;
//   registerToken?: string;
// }

const InvitationInstructionsModal = (props: any) => {
  const handleClick = () => {
    const path = props.type === 'login'
      ? ROUTES.login + '?invitationToken=' + props.invitationToken
      : ROUTES.register
      + '?registerToken=' + props.registerToken
      + '&invitationToken=' + props.invitationToken

    API.logoutUser()
      .then(() => {
        localStorage.removeItem('token');

        window.location.href = path;
      })
    props.closeModal()
  }

  return (
    <div className="invitation-instructions-modal modal-wrap">
      <div className="invitation-instructions-modal__icon">
        <CheckIcon />
      </div>

      <h2 className="invitation-instructions-modal__header">Invitation!</h2>

      <div className="invitation-instructions-modal__text">
        You cannot use the invitation because you are currently logged in as a different user.
        {props.type === 'login'
          ? ' Please login with the email you received the invitation'
          : ' Please register with the email you received the invitation'
        }
      </div>

      <button
        className="invitation-instructions-modal__btn btn btn--primary"
        type="button"
        onClick={handleClick}
      >
        {props.type === 'login' ? 'Login' : 'Register'}
      </button>
      <button
        className="btn btn--cancel"
        type="button"
        onClick={() => props.closeModal()}
      >
        Cancel
      </button>
    </div>
  )
}

export default InvitationInstructionsModal;
