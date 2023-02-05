import { connect } from 'react-redux';

import { AppState } from '../../../redux/store';
import { classModifier, getContactAvatar } from '../../../utils';
import { openModal, MODAL_TYPES }from '../../../redux/ducks/activeWindows';
import { IAnyObject } from '../../../interfaces/interfaces';

import './AgentItem.scss'
import LazyLoadImage from '../../../components/LazyLoadImage/LazyLoadImage';

interface IAgentItemProps {
  item: number;
  agent: any;
  className: string;
  openModal: (type: string, props?: IAnyObject) => void;
}

const AgentItem = (props: IAgentItemProps) => {
  const { 
    agent,
    className,
    openModal,
  } = props;

  return (
    <div 
      className={'agent-item' + (className ? ` ${className}` : '')}
      onClick={() => openModal(MODAL_TYPES.agentModal, { agent })}
    >
      <div className="agent-item__info">
        <div className="agent-item__avatar-wrap">
          <LazyLoadImage
            src={getContactAvatar(agent)}
            classPrefix={classModifier('agent-item__avatar', [agent.status && 'online'])}
          />
        </div>

        <div className="agent-item__name">{agent.name}</div>
      </div>

      <div className={classModifier('agent-item__time', [!agent.isAvailable && 'unavailable'])}>
        {agent.isAvailable ? agent.availability_time : 'Not Available'}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: IAgentItemProps) => ({
  agent: state.agents.entities[ownProps.item]
})

const mapDispatchToProps = ({
  openModal
})

export default connect(mapStateToProps, mapDispatchToProps)(AgentItem);
