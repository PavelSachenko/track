import { useDispatch } from 'react-redux';

import API from '../../../../api/api';
import { deleteEvent } from '../../../../redux/ducks/agentSchedule';

import './DeleteEventModal.scss'
import { ReactComponent as CloseIcon } from '../../../../icons/close.svg';
import AsyncBtn from '../../../../components/AsyncBtn/AsyncBtn';

// interface IDeleteEventModalProps  {
//   eventId: number;
//   pending: boolean;
//   closeModal: () => void;
//   setPending: (pending: boolean) => void;
//   closeEventModal: () => void;
// }

const DeleteEventModal = (props: any) => {
  const {
    eventId,
    pending,
    closeModal,
    setPending,
    closeEventModal,
  } = props;

  const dispatch = useDispatch();

  const handleDeleteInviteClick = () => {
    setPending(true);

    return API.deleteEvent(eventId)
      .then(({ data }) => {
        setPending(false);
        dispatch(deleteEvent(eventId, data.date));
        closeModal();
        closeEventModal();
      })
      .catch(console.error)
  }

  return (
    <div className="delete-event-modal modal-wrap">
      <div className="delete-event-modal__icon-wrap">
        <div className="delete-event-modal__icon">
          <CloseIcon />
        </div>
      </div>

      <h2 className="delete-event-modal__header">Delete Event</h2>

      <div className="delete-event-modal__text">Are you sure you want to delete the event?</div>

      <div className="delete-event-modal__btns">
        <button
          type="button"
          className="delete-event-modal__close-btn btn btn--cancel"
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

export default DeleteEventModal;
