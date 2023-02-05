import { useState, useCallback, useContext, useRef } from 'react'
import { connect } from 'react-redux';

import { SetIsVisibleContext } from '../../pages/MainPage/MainPage';
import { useDidMount } from '../../hooks';
import { openModal, MODAL_TYPES } from '../../redux/ducks/activeWindows';
import { LIST_SPINNER_SIZE } from '../../config/constants'; 
import { getInvites, deleteInvite } from '../../redux/ducks/agents'; 

import './Invites.scss';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';
import List from '../../components/List/List';
import InviteItem from './components/InviteItem';
import { AppState } from '../../redux/store';

interface IInvitesProps {
  ids: number[];
  invitesCount: number;
  openModal: (type: string) => void;
  getInvites: (offset?: number) => any;
  deleteInvite: (id: number) => any;
}

const Invites = (props: IInvitesProps) => {
  const {
    ids,
    invitesCount,
    openModal,
    getInvites,
    deleteInvite,
  } = props;

  const { setIsVisibleNavbar } = useContext(SetIsVisibleContext);

  const startScrollPosition = useRef(0);

  const [pending, setPending] = useState(true);

  useDidMount(() => {
    getInvites().then(() => setPending(false));
  })

  const loadMore = useCallback((offset: number) => {
    getInvites(offset);
  }, []);

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    if (startScrollPosition && startScrollPosition.current && setIsVisibleNavbar) {
      if (
        (target.scrollTop < 20) ||
        (target.scrollHeight - (target.scrollTop + target.clientHeight) < 40) ||
        (target.scrollHeight - target.clientHeight < 150)
      ) {
        setIsVisibleNavbar(true);
        startScrollPosition.current = 0;
      }
      else if (target.scrollTop < startScrollPosition.current) {
        if (startScrollPosition.current - target.scrollTop > 40) {
          setIsVisibleNavbar(true);
          startScrollPosition.current = 0;
        }
      }
      else {
        setIsVisibleNavbar(false);
        startScrollPosition.current = 0;
      }
    }
    else {
      startScrollPosition.current = target.scrollTop;
    }
  };

  return (
    <div className="invites">
      <ReturnBtn 
        text="Back to Agents"
        route="/"
      />
      
      <div className="invites__info">
        <div className="invites__count">Invites&nbsp;<span>({invitesCount})</span></div>

        <button 
          className="invites__invite-btn btn"
          onClick={() => openModal(MODAL_TYPES.inviteMemberModal)}
        >
          Invite Agent
        </button>
      </div>

      <div className="invites__invite-list invite-list">
        <div className="invite-list__list-header">
          <div className="invite-list__list-header-block invite-list__list-header-block--name">Name</div>
          <div className="invite-list__list-header-block invite-list__list-header-block--date">Date</div>
        </div>

        <List
          list={ids}
          limit={10}
          listItem={InviteItem}
          classPrefix="invite-list"
          loadMore={loadMore}
          listLoadPending={pending}
          spinnerSize={LIST_SPINNER_SIZE}
          onScroll={handleScroll}
          noItemsText="No invites"
          listItemProps={{
            deleteInvite
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  ids: state.agents.inviteIds,
  invitesCount: state.agents.invitesCount
})

const mapDispatchToProps = {
  openModal,
  getInvites,
  deleteInvite
}

export default connect(mapStateToProps, mapDispatchToProps)(Invites);
