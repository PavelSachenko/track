import { useDispatch } from 'react-redux';

import API from '../../../../api/api';
import { removeNotifications } from '../../../../redux/ducks/notifications';

import './DeclineInviteModal.scss'
import { ReactComponent as CloseIcon } from '../../../../icons/close.svg';
import AsyncBtn from '../../../../components/AsyncBtn/AsyncBtn';

// interface DeclineInviteModal  {
//   closeModal: () => void;
//   itemId: number;
// }

const DeclineInviteModal = (props: any) => {
  const {
    token,
    itemId,
    pending,
    setPending,
    closeModal,
  } = props;

  const dispatch = useDispatch();

  const declineInvitation = () => {
    setPending(true);

    return API.declineNotification(token)
      .then(() => {
        setPending(false);
        dispatch(removeNotifications([itemId]));
        closeModal();
      })
      .catch(console.error)
  }

  return (
    <div className="decline-invite-modal modal-wrap">
      <div className="decline-invite-modal__icon-wrap">
        <div className="decline-invite-modal__icon">
          <CloseIcon />
        </div>
      </div>

      <h2 className="decline-invite-modal__header">Decline Invitation</h2>

      <div className="decline-invite-modal__text">Are you sure you want to decline the invitation?</div>

      <div className="decline-invite-modal__btns">
        <button
          type="button"
          className="decline-invite-modal__close-btn btn btn--cancel"
          onClick={() => !pending && props.closeModal()}
        >
          Close
        </button>

        <AsyncBtn
          type="button"
          className="btn btn--delete"
          spinnerSize="18px"
          onClick={declineInvitation}
        >
          Decline
        </AsyncBtn>
      </div>
    </div>
  )
}

export default DeclineInviteModal;
