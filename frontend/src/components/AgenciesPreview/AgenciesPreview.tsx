import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../config/constants';
import { openModal, MODAL_TYPES } from '../../redux/ducks/activeWindows';

import './AgenciesPreview.scss';
import { ReactComponent as AgencyPreviewIcon } from '../../icons/agencies-preview.svg';
import { ReactComponent as MailInviteIcon } from '../../icons/mail-invite.svg'
import { AppState } from '../../redux/store';

interface IAgenciesPreviewProps {
  userType: number;
  openModal: (type: string) => void;
  invitesCount: number;
}

const AgenciesPreview = (props: IAgenciesPreviewProps) => {
  const {
    userType,
    openModal,
    invitesCount,
  } = props;

  const isAgent = userType === 1;

  return (
    <div className="agency-preview">
      <div className="agency-preview__icon">  
        <AgencyPreviewIcon />
      </div>

      <h2 className="agency-preview__title">
        {isAgent ? "Your Agencies" : "Your Agents"}
      </h2>

      <div className="agency-preview__description">
        {isAgent 
          ? "While you are not a member of any of the agencies. See instructions below to become a member of the agency."
          : "As long as you don't have any agents, see the instructions below to add invite agents."
        }
      </div>

      {!isAgent && 
        <div className="agency-preview__invites">
          <div className="agency-preview__invites-count">
            <MailInviteIcon className="agency-preview__invites-count-icon" />

            <Link 
              to={ROUTES.invites}
              className="agency-preview__invites-count-text"
            >
              My Invites <span>({invitesCount})</span>
            </Link>
          </div>

          <button 
            className="agency-preview__invites-btn btn"
            onClick={() => openModal(MODAL_TYPES.inviteMemberModal)}
          >
            Invite new member
          </button>
        </div>
      }

      <div className="agency-preview__instructions agency-instructions">
        <h2 className="agency-instructions__title">
          Instructions
        </h2>

        <ol className="agency-instructions__list">
          <li className="agency-instructions__item">
            <h3 className="agency-instructions__item-title">Step 1</h3>
            <div className="agency-instructions__item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, malesuada fames</div>
          </li>

          <li className="agency-instructions__item">
            <h3 className="agency-instructions__item-title">Step 2</h3>
            <div className="agency-instructions__item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, malesuada fames</div>
          </li>

          <li className="agency-instructions__item">
            <h3 className="agency-instructions__item-title">Step 3</h3>
            <div className="agency-instructions__item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, malesuada fames</div>
          </li>
        </ol>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  invitesCount: state.agents.invitesCount,
})

const mapDispatchToProps = {
  openModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AgenciesPreview);
