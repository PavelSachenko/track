import { useDispatch } from 'react-redux';

import API from '../../../../api/api';
import { deleteInvite } from '../../../../redux/ducks/agents';

import './DeleteInviteModal.scss'
import { ReactComponent as CloseIcon } from '../../../../icons/close.svg';
import AsyncBtn from '../../../../components/AsyncBtn/AsyncBtn';

// interface IDeleteInviteModalProps  {
//   closeModal: () => void;
//   itemId: number;
// }

const DeleteInviteModal = (props: any) => {
  const {
    itemId,
    pending,
    closeModal,
    setPending
  } = props;

  const dispatch = useDispatch();

  const handleDeleteInviteClick = () => {
    setPending(true);

    return API.deleteInvite(itemId)
      .then(() => {
        setPending(false);
        dispatch(deleteInvite(itemId));
        closeModal();
      })
      .catch(console.error)
  }

  return (
    <div className="delete-invite-modal modal-wrap">
      <div className="delete-invite-modal__icon-wrap">
        <div className="delete-invite-modal__icon">
          <CloseIcon />
        </div>
      </div>

      <h2 className="delete-invite-modal__header">Delete Invitation</h2>

      <div className="delete-invite-modal__text">Are you sure you want to delete the invitation?</div>

      <div className="delete-invite-modal__btns">
        <button
          type="button"
          className="delete-invite-modal__close-btn btn btn--cancel"
          onClick={() => !pending && props.closeModal()}
        >
          Close
        </button>

        <AsyncBtn
          type="button"
          className="btn btn--delete"
          spinnerSize="18px"
          onClick={handleDeleteInviteClick}
        >
          Delete
        </AsyncBtn>
      </div>
    </div>
  )
}

export default DeleteInviteModal;
