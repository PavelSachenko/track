import { useDispatch } from "react-redux";

import API from "../../../../api/api";
import { deleteAgent } from "../../../../redux/ducks/agents";

import "./DeleteAgentModal.scss";
import { ReactComponent as CloseIcon } from "../../../../icons/close.svg";
import AsyncBtn from "../../../../components/AsyncBtn/AsyncBtn";

// interface DeleteAgentModal  {
//   itemId: number;
//   itemEmail: string;
//   closeModal: () => void;
// }

const DeleteAgentModal = (props: any) => {
  const {
    /*email,*/ itemId,
    pending,
    setPending,
    closeModal,
    closeAgentModal,
  } = props;

  const dispatch = useDispatch();

  const removeAgent = () => {
    setPending(true);

    return API.unsubscribeAgent(itemId)
      .then(() => {
        setPending(false);
        dispatch(deleteAgent(itemId));
        closeModal();
        closeAgentModal();
      })
      .catch(console.error);
  };

  return (
    <div className="delete-agent-modal modal-wrap">
      <div className="delete-agent-modal__icon-wrap">
        <div className="delete-agent-modal__icon">
          <CloseIcon />
        </div>
      </div>

      <h2 className="delete-agent-modal__header">Delete Agent</h2>

      <div className="delete-agent-modal__text">
        Do you really want to delete your agent?'
      </div>

      <div className="delete-agent-modal__btns">
        <button
          type="button"
          className="delete-agent-modal__close-btn btn btn--cancel"
          onClick={() => !pending && props.closeModal()}
        >
          Close
        </button>

        <AsyncBtn
          type="button"
          className="btn btn--delete"
          spinnerSize="18px"
          onClick={removeAgent}
        >
          Delete
        </AsyncBtn>
      </div>
    </div>
  );
};

export default DeleteAgentModal;
