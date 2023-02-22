import { Dispatch } from "redux";

import API from "../../api/api";
import { normalize, addToEntitiesIfMissing } from "../../utils";
import { IAction, IInvite, IAgent } from "../../interfaces/interfaces";
import { IAgentsState, IAgentsConfig } from "./ducks.types";

export const GET_AGENTS = "GET_AGENTS";
export const UPDATE_AGENTS = "UPDATE_AGENTS";
export const ADD_AGENT = "ADD_AGENT";
export const DELETE_AGENT = "DELETE_AGENT";

export const FILTER_AGENTS = "FILTER_AGENTS";
export const UPDATE_FILTERED_AGENTS = "UPDATE_FILTERED_AGENTS";

export const UPDATE_SEARCH = "UPDATE_SEARCH";
export const UPDATE_STATUS_FILTER = "UPDATE_STATUS_FILTER";

export const GET_INVITES = "GET_INVITES";
export const UPDATE_INVITES = "UPDATE_INVITES";
export const ADD_INVITE = "ADD_INVITE";
export const DELETE_INVITE = "DELETE_INVITE";
export const GET_INVITES_COUNT = "GET_INVITES_COUNT";
export const GET_AGENTS_COUNT = "GET_AGENTS_COUNT";

export const AGENTS_LIMIT = 20;

export const getAgents = (offset?: number) => (dispatch: Dispatch) => {
  return API.getAgents({ offset })
    .then(({ data }) => {
      dispatch({
        type: offset ? UPDATE_AGENTS : GET_AGENTS,
        payload: normalize(data),
      });
    })
    .catch(console.error);
};

export const getAgentsCount = () => (dispatch: Dispatch) => {
  API.getAgentsCount()
    .then(({ data }) => {
      dispatch({
        type: GET_AGENTS_COUNT,
        payload: data,
      });
    })
    .catch(console.error);
};

export const filterAgents = (config: IAgentsConfig) => (dispatch: Dispatch) => {
  return API.getAgents(config)
    .then(({ data }) => {
      dispatch({
        type: config.offset ? UPDATE_FILTERED_AGENTS : FILTER_AGENTS,
        payload: normalize(data),
      });
    })
    .catch(console.error);
};

export const updateSearch = (query: string) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_SEARCH,
    payload: query,
  });
};

export const updateStatusFilter =
  (statusFilter: number) => (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_STATUS_FILTER,
      payload: statusFilter,
    });
  };

export const addAgent = (agent: IAgent) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_AGENT,
    payload: agent,
  });
};

export const deleteAgent = (id: number) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_AGENT,
    payload: id,
  });
};

export const getInvites = (offset?: number) => (dispatch: Dispatch) => {
  return API.getInvites(offset)
    .then(({ data }) => {
      dispatch({
        type: offset ? UPDATE_INVITES : GET_INVITES,
        payload: normalize(data),
      });
    })
    .catch(console.error);
};

export const getInvitesCount = () => (dispatch: Dispatch) => {
  API.getInvitesCount()
    .then(({ data }) => {
      dispatch({
        type: GET_INVITES_COUNT,
        payload: data,
      });
    })
    .catch(console.error);
};

export const addInvite = (invite: IInvite) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_INVITE,
    payload: invite,
  });
};

export const deleteInvite = (id: number) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_INVITE,
    payload: id,
  });
};

const initialState: IAgentsState = {
  pending: true,
  ids: [],
  auxiliaryIds: [],
  entities: {},
  agentsCount: 0,
  search: "",
  filterStatus: 0,
  inviteIds: [],
  inviteEntities: {},
  invitesCount: 0,
};

const agenciesReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_AGENTS: {
      return {
        ...state,
        pending: false,
        ids: payload.ids,
        entities: addToEntitiesIfMissing(
          state.entities,
          payload.entities,
          "id"
        ),
        auxiliaryIds: [],
      };
    }

    case GET_AGENTS_COUNT: {
      return {
        ...state,
        agentsCount: payload,
      };
    }

    case UPDATE_AGENTS: {
      return {
        ...state,
        ids: [...state.ids, ...payload.ids],
        entities: addToEntitiesIfMissing(
          state.entities,
          payload.entities,
          "id"
        ),
      };
    }

    case FILTER_AGENTS: {
      return {
        ...state,
        pending: false,
        entities: addToEntitiesIfMissing(
          state.entities,
          payload.entities,
          "id"
        ),
        auxiliaryIds: payload.ids,
      };
    }

    case UPDATE_FILTERED_AGENTS: {
      return {
        ...state,
        entities: addToEntitiesIfMissing(
          state.entities,
          payload.entities,
          "id"
        ),
        auxiliaryIds: [...state.auxiliaryIds, ...payload.ids],
      };
    }

    case UPDATE_SEARCH: {
      if (state.search === payload) return state;

      return {
        ...state,
        search: payload,
        pending: true,
      };
    }

    case UPDATE_STATUS_FILTER: {
      if (state.filterStatus === payload) return state;

      return {
        ...state,
        filterStatus: payload,
        pending: true,
      };
    }

    case ADD_AGENT: {
      // const deletedInviteId = Object.values(state.inviteEntities).find(
      //   (invite) => invite.email === payload.email
      // )?.id;

      // const updatedEntities = { ...state.inviteEntities };
      // deletedInviteId !== undefined && delete updatedEntities[deletedInviteId];

      return {
        ...state,
        entities: {
          [payload.id]: payload,
          ...state.entities,
        },
        ids: [payload.id, ...state.ids],
        // inviteIds: state.inviteIds.filter((id) => id !== deletedInviteId),
        // inviteEntities: updatedEntities,
        // invitesCount: state.invitesCount - 1 < 0 ? 0 : state.invitesCount - 1,
        agentsCount: state.agentsCount + 1,
      };
    }

    case DELETE_AGENT: {
      const isFilter = state.filterStatus || state.search;

      const updatedIds = isFilter
        ? state.auxiliaryIds.filter((id) => id !== payload)
        : state.ids.filter((id) => id !== payload);

      const updatedEntities = { ...state.entities };
      delete updatedEntities[payload];

      return {
        ...state,
        ids: isFilter ? state.ids : updatedIds,
        auxiliaryIds: isFilter ? updatedIds : state.auxiliaryIds,
      };
    }

    case GET_INVITES: {
      return {
        ...state,
        inviteIds: payload.ids,
        inviteEntities: payload.entities,
      };
    }

    case UPDATE_INVITES: {
      return {
        ...state,
        inviteIds: [...state.inviteIds, ...payload.ids],
        inviteEntities: {
          ...state.inviteEntities,
          ...payload.entities,
        },
      };
    }

    case ADD_INVITE: {
      return {
        ...state,
        inviteEntities: {
          [payload.id]: payload,
          ...state.inviteEntities,
        },
        inviteIds: [payload.id, ...state.inviteIds],
        invitesCount: state.invitesCount + 1,
      };
    }

    case DELETE_INVITE: {
      const updatedEntities = { ...state.inviteEntities };
      delete updatedEntities[payload];

      return {
        ...state,
        inviteIds: state.inviteIds.filter((id) => id !== payload),
        inviteEntities: updatedEntities,
        invitesCount: state.invitesCount - 1 < 0 ? 0 : state.invitesCount - 1,
      };
    }

    case GET_INVITES_COUNT: {
      return {
        ...state,
        invitesCount: payload,
      };
    }

    default:
      return state;
  }
};

export default agenciesReducer;
