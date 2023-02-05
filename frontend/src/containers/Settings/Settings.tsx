import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from '../../redux/store';

import './Settings.scss'
import { ReactComponent as AgencyIcon } from '../../icons/agency2.svg';
import { ReactComponent as ScheduleIcon } from '../../icons/schedule.svg';
import { ReactComponent as LockIcon } from '../../icons/lock.svg';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';

interface ISettings {
  userType: number
}

const Settings = (props: ISettings) => {
  return (
    <div className="settings">
      <h2 className="settings__title">
        Settings
      </h2>

      <div className="settings__list-wrap">
        <ul className="settings__list">
          <li className="settings__item">
            <Link to="general" className="settings__link">
              <AgencyIcon className="settings__item-icon" />
              
              <span>General</span>

              <ArrowIcon className="settings__arrow-icon" />
            </Link>
          </li>

          {props.userType === 1 &&
            <li className="settings__item">
              <Link to="schedule" className="settings__link">
                <ScheduleIcon className="settings__item-icon" />

                <span>Schedule</span>

                <ArrowIcon className="settings__arrow-icon" />
              </Link>
            </li>
          }

          <li className="settings__item">
            <Link to="security" className="settings__link">
              <LockIcon className="settings__item-icon" />

              <span>Security</span>
              
              <ArrowIcon className="settings__arrow-icon" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  userType: state.user.user.type
})

export default connect(mapStateToProps)(Settings);
