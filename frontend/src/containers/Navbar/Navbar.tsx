import { connect } from 'react-redux';
import { Link, useLocation} from 'react-router-dom';

import { openModal, MODAL_TYPES } from '../../redux/ducks/activeWindows';
import { useDidMount } from '../../hooks';
import { AppState } from "../../redux/store";

import './Navbar.scss';
import { ROUTES } from '../../config/constants';
import { ReactComponent as AgencyIcon } from '../../icons/agency2.svg';
import { ReactComponent as AgentsIcon } from '../../icons/agents.svg';
import { ReactComponent as ScheduleIcon } from '../../icons/schedule.svg';
import { ReactComponent as NotificationIcon } from '../../icons/notification.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg';

interface INavbarProps {
  openModal: (type: string) => void;
  isVisible: boolean;
  userType: number;
  unreadCount: number;
}

const Navbar = (props: INavbarProps) => {
  const { unreadCount } = props;

  const location = useLocation(); 

  const isAgent = props.userType === 1;

  useDidMount(() => {
    if (localStorage.successRegisterModal) {
      setTimeout(() => {
        props.openModal(MODAL_TYPES.successRegisterModal);
      }, 500);

      localStorage.removeItem('successRegisterModal');
    }
  })

  const getClassName = (...pathNames: string[]): string => {
    return pathNames.includes(location.pathname)
      ? "navbar__item navbar__item--active"
      : "navbar__item";
  };

  return (
    <nav className={props.isVisible ? 'navbar' : 'navbar navbar--hidden'}>
      <ul className="navbar__list">
        <li className={getClassName(ROUTES.main, ROUTES.invites)}>
          <Link
            to={ROUTES.main}
            title={isAgent ? 'Agencies' : 'Agents'}
            className="navbar__link"
          >
            <div className="navbar__icon">{isAgent ? <AgencyIcon /> : <AgentsIcon />}</div>
            <div className="navbar__item-title">{isAgent ? 'Agencies' : 'Agents'}</div>
          </Link>
        </li>

        <li className={getClassName(ROUTES.schedule)}>
          <Link 
            to={ROUTES.schedule} 
            title="Schedule"
            className="navbar__link"
          >
            <div className="navbar__icon"> <ScheduleIcon /></div>
            <div className="navbar__item-title">Schedule</div>
          </Link>
        </li>

        <li className={getClassName(ROUTES.notifications)}>
          <Link
            to={ROUTES.notifications}
            title="Notifications"
            className="navbar__link"
          >
            <div className="navbar__icon">
              <NotificationIcon />

              {unreadCount
                ? <span className="navbar__unread-count">{unreadCount > 99 ? '99+' : unreadCount}</span>
                : null
              }
            </div>
            <div className="navbar__item-title">Notifications</div>
          </Link>
        </li>

        <li className={getClassName(
          ROUTES.settings, 
          ROUTES.settingsGeneral, 
          ROUTES.settingsSchedule, 
          ROUTES.settingsSecurity
        )}>
          <Link
            to={ROUTES.settings}
            title="Settings"
            className="navbar__link"
          >
            <div className="navbar__icon navbar__icon--notification"><SettingsIcon /></div>
            <div className="navbar__item-title">Settings</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state: AppState) => ({
  userType: state.user.user.type,
  unreadCount: state.notifications.count,
});

const mapDispatchToProps = {
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
