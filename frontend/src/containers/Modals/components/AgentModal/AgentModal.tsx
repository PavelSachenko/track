import { useDispatch } from 'react-redux';

import { getContactAvatar } from '../../../../utils';
import { MODAL_TYPES, openModal } from '../../../../redux/ducks/activeWindows';

import './AgentModal.scss'
import { ReactComponent as PhoneIcon } from '../../../../icons/phone.svg';
import { ReactComponent as MailIcon } from '../../../../icons/mail.svg';
import { ReactComponent as ShareIcon } from '../../../../icons/share.svg';
import LazyLoadImage from '../../../../components/LazyLoadImage/LazyLoadImage';

const AgentModal = (props: any) => {
  const { 
    agent,
    closeModal
  } = props;

  const dispatch = useDispatch();

  const handleRemoveAgentClick = () => {
    dispatch(openModal(MODAL_TYPES.deleteAgentModal, {
      itemId: agent.id,
      email: agent.email,
      closeAgentModal: closeModal
    }))
  }

  const addedDate = agent.wasAdded && new Date(agent.wasAdded).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <div className="agent-modal modal-wrap">
      <div className="agent-modal__header">
        <div className="agent-modal__header-main">
          <div className="agent-modal__avatar">
            <LazyLoadImage src={getContactAvatar(agent)} />
          </div>

          <div className="agent-modal__name">
            {agent.name}
          </div>
        </div>

        <button className="agent-modal__share-btn" type="button">
          <ShareIcon />
        </button>
      </div>

      <div className="agent-modal__contacts">
        {agent.phone &&
          <div className="agent-modal__contact-item agent-modal__contact-item--tel">
            <PhoneIcon className="agent-modal__contact-icon agent-modal__contact-icon--tel" />
            <span>{agent.phone}</span>
          </div>
        }

        <div className="agent-modal__contact-item agent-modal__contact-item--email">
          <MailIcon className="agent-modal__contact-icon agent-modal__contact-icon--email" />
          <span>{agent.email}</span>
        </div>
      </div>

      <div className="agent-modal__info">
        <div className="agent-modal__availability">
          <span className="agent-modal__availability-header">Today availability</span>
          <span className="agent-modal__availability-time">9:00am - 18:00pm</span>
        </div>

        <button className="agent-modal__request-btn">Request Schedule Changes</button>
      </div>

      <div className="agent-modal__footer">
        <div className="agent-modal__actions">
          <button 
            onClick={handleRemoveAgentClick}
            className="agent-modal__remove-btn"
            type="button"
          >
            Remove
          </button>
        </div>

        {agent.wasAdded &&
          <div className="agent-modal__added-date">
            Was added {addedDate}
          </div>
        }
      </div>
    </div>
  )
}

export default AgentModal;
