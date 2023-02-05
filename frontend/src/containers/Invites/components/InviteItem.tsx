import { connect } from 'react-redux';

import { IInvite } from '../../../interfaces/interfaces';
import { MODAL_TYPES, openModal } from '../../../redux/ducks/activeWindows';

import './InviteItem.scss';
import LazyLoadImage from '../../../components/LazyLoadImage/LazyLoadImage';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';
import AgentAvatar from '../../../icons/agent-avatar.svg';
import { AppState } from '../../../redux/store';

interface IInviteItemProps {
  item: number;
  invite: IInvite;
  className?: string;
  openModal: (type: string, props: any) => void;
  deleteInvite: (id: number) => void;
}

const InviteItem = (props: IInviteItemProps) => {
  const {
    item,
    invite,
    className,
    openModal,
  } = props;

  const handleRemoveClick = () => {
    openModal(MODAL_TYPES.deleteInviteModal, { itemId: item });
  }

  const dateCreated = new Date(invite.created_at).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })

  return (
    <div className={className ? `${className} invite-item` : 'invite-item'}>
      <div className="invite-item__avatar">
        <LazyLoadImage src={AgentAvatar}/>
      </div>

      <div className="invite-item__name">{invite.email}</div>

      <div className="invite-item__date">{dateCreated}
      </div>
      
      <button 
        className="invite-item__remove-btn"
        onClick={handleRemoveClick}
        type="button"
      >
        <CloseIcon className="invite-item__remove-icon"/>
      </button>
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: IInviteItemProps) => ({
  invite: state.agents.inviteEntities[ownProps.item]
})

const mapDispatchToProps = {
  openModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteItem);
