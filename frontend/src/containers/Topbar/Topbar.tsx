import { useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import API from '../../api/api';
import { useToggle } from '../../hooks';
import { ROUTES } from '../../config/constants';
import { getContactAvatar } from '../../utils';
import { AppState } from "../../redux/store";
import { IAgent, IAgency } from '../../interfaces/interfaces';

import './Topbar.scss';
import LazyLoadImage from '../../components/LazyLoadImage/LazyLoadImage';
import DropWrapper from '../../components/DropWrapper';

interface ITopbarProps {
  isVisible: boolean;
  user: IAgent | IAgency;
}

const Topbar = (props: ITopbarProps) => {
  const [isMenuOpen, toggleMenuOpen] = useToggle(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const logoutUser = () => {
    API.logoutUser()
      .then(() => {
        localStorage.removeItem('token');
        window.location.href = ROUTES.login;
      })
  }

  return (
    <header className={props.isVisible || isMenuOpen ? 'topbar' : 'topbar topbar--hidden'}>
      <div className="topbar__title">Logotype</div>

      <div
        onMouseDown={() => toggleMenuOpen(true)}
        className="topbar__ava"
      >
        <LazyLoadImage src={getContactAvatar(props.user)} />

        {isMenuOpen && (
          <DropWrapper
            dropWrapperRef={menuRef}
            closeDropWrapper={toggleMenuOpen}
          >
            <div className="topbar__menu">
              <ul className="topbar__menu-list">
                <li className="topbar__menu-item">
                  <button className="topbar__menu-button" onClick={() => navigate('/schedule')}>
                    Schedule
                  </button>
                </li>

                <li className="topbar__menu-item">
                  <button className="topbar__menu-button" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </DropWrapper>
        )}
      </div>
    </header>
  )
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Topbar);
