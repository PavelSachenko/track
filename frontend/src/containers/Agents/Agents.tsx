import { useCallback, useContext, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AppState } from "../../redux/store";
import {
  getAgents,
  filterAgents,
  updateSearch,
  updateStatusFilter,
} from "../../redux/ducks/agents";
import { classModifier } from "../../utils";
import { selectAgents } from "../../redux/selectors/selectors";
import { IAgentsConfig } from "../../redux/ducks/ducks.types";
import { SetIsVisibleContext } from "../../pages/MainPage/MainPage";
import { useDidUpdate } from "../../hooks";
import { LIST_SPINNER_SIZE, ROUTES } from "../../config/constants";
import { MODAL_TYPES, openModal } from "../../redux/ducks/activeWindows";

import "./Agents.scss";
import { ReactComponent as MailInviteIcon } from "../../icons/mail-invite.svg";
import SearchableList from "../../components/SearchableList/SearchableList";
import AgentItem from "./components/AgentItem";
import Spinner from "../../components/Spinner/Spinner";
import AgenciesPreview from "../../components/AgenciesPreview/AgenciesPreview";

interface IAgentsProps {
  ids: number[];
  pending: boolean;
  filterStatus: number;
  search: string;
  userAgentsLength: number;
  invitesCount: number;
  agentsCount: number;
  openModal: (type: string) => void;
  getAgents: (offset?: number) => Promise<any>;
  filterAgents: (config: IAgentsConfig) => Promise<any>;
  updateSearch: (query: string) => void;
  updateStatusFilter: (statusFilter: number) => void;
}

const Agents = (props: IAgentsProps) => {
  const {
    ids,
    pending,
    filterStatus,
    search,
    userAgentsLength,
    invitesCount,
    agentsCount,
    openModal,
    getAgents,
    filterAgents,
    updateStatusFilter,
  } = props;

  const { setIsVisibleNavbar } = useContext(SetIsVisibleContext);

  const startScrollPosition = useRef(0);

  useDidUpdate(() => {
    const isAnyFilter = search || filterStatus;

    if (!isAnyFilter) {
      getAgents();
    } else {
      const config = {
        search,
        filterStatus,
      };

      filterAgents(config);
    }
  }, [search, filterStatus]);

  const updateList = useCallback(
    (offset: number) => {
      const isAnyFilter = search || filterStatus;

      if (!isAnyFilter) {
        getAgents(offset);
      } else {
        const config = {
          search,
          filterStatus,
          offset,
        };

        filterAgents(config);
      }
    },
    [search, filterStatus]
  );

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    if (
      startScrollPosition &&
      startScrollPosition.current &&
      setIsVisibleNavbar
    ) {
      if (
        target.scrollTop < 20 ||
        target.scrollHeight - (target.scrollTop + target.clientHeight) < 40 ||
        target.scrollHeight - target.clientHeight < 150
      ) {
        setIsVisibleNavbar(true);
        startScrollPosition.current = 0;
      } else if (target.scrollTop < startScrollPosition.current) {
        if (startScrollPosition.current - target.scrollTop > 40) {
          setIsVisibleNavbar(true);
          startScrollPosition.current = 0;
        }
      } else {
        setIsVisibleNavbar(false);
        startScrollPosition.current = 0;
      }
    } else {
      startScrollPosition.current = target.scrollTop;
    }
  };

  if (!userAgentsLength && pending) {
    return (
      <div className="agents__spinner">
        <Spinner size="150px" />
      </div>
    );
  } else if (!userAgentsLength && !pending) {
    return <AgenciesPreview userType={2} />;
  }

  return (
    <div className="agents">
      <h2 className="agents__title">
        Your Agents <span className="agents__count">({agentsCount})</span>
      </h2>

      <div className="agents__invites">
        <div className="agents__invites-count">
          <MailInviteIcon className="agents__invites-count-icon" />

          <Link to={ROUTES.invites} className="agents__invites-count-text">
            My Invites <span>({invitesCount})</span>
          </Link>
        </div>

        <button
          className="agents__invites-btn btn"
          onClick={() => openModal(MODAL_TYPES.inviteMemberModal)}
        >
          Invite new member
        </button>
      </div>

      <div className="agents__filters">
        <button
          onClick={() => updateStatusFilter(0)}
          className={classModifier("agents__filter-btn", [
            filterStatus === 0 && "active",
          ])}
        >
          All
        </button>

        <button
          onClick={() => updateStatusFilter(1)}
          className={classModifier("agents__filter-btn", [
            filterStatus === 1 && "active",
          ])}
        >
          Online
        </button>

        <button
          onClick={() => updateStatusFilter(2)}
          className={classModifier("agents__filter-btn", [
            filterStatus === 2 && "active",
          ])}
        >
          Offline
        </button>
      </div>

      <SearchableList
        list={ids}
        listItem={AgentItem}
        listLimit={10}
        startSearch={props.updateSearch}
        stopSearch={props.updateSearch}
        loadMore={updateList}
        classPrefix="agents-list"
        listLoadPending={pending}
        spinnerSize={LIST_SPINNER_SIZE}
        listMode={`${filterStatus}__${search}`}
        onScroll={handleScroll}
        noItemsText="No agents found"
        HeaderComponent={
          <header className="agents-list__header">
            <div className="agents-list__header-block">Name</div>
            <div className="agents-list__header-block">Availability</div>
          </header>
        }
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  pending: state.agents.pending,
  filterStatus: state.agents.filterStatus,
  search: state.agents.search,
  ids: selectAgents(state),
  userAgentsLength: state.agents.ids.length,
  invitesCount: state.agents.invitesCount,
  agentsCount: state.agents.agentsCount,
});

const mapDispatchToProps = {
  openModal,
  getAgents,
  filterAgents,
  updateSearch,
  updateStatusFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Agents);
