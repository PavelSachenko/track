import { Dispatch } from 'redux';

import API from '../../api/api'
import { normalize } from '../../utils'
import { IAction, IAgency } from '../../interfaces/interfaces';
import { IAgenciesState } from "./ducks.types";

const GET_AGENCIES = 'GET_AGENCIES';
const UPDATE_AGENCIES = 'UPDATE_AGENCIES';
const ADD_AGENCY = 'ADD_AGENCY';
const DELETE_AGENCY = 'DELETE_AGENCY';
const GET_AGENCIES_COUNT = 'GET_AGENCIES_COUNT';

export const getAgencies = (offset?: number) => (dispatch: Dispatch) => {
  API.getAgencies(offset)
    .then(({ data }) => {
      dispatch({
        type: offset ? UPDATE_AGENCIES : GET_AGENCIES,
        payload: normalize(data),
      });
    })
    .catch(console.error);
};

export const addAgency = (agency: IAgency) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_AGENCY,
    payload: agency
  })
}

export const deleteAgency = (id: number) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_AGENCY,
    payload: id
  })
}

export const getAgenciesCount = () => (dispatch: Dispatch) => {
  API.getAgenciesCount()
    .then(({ data }) => {
      dispatch({
        type: GET_AGENCIES_COUNT,
        payload: data,
      });
    })
    .catch(console.error);
};


const initialState: IAgenciesState = {
  ids: [],
  entities: {},
  count: 0,
  pending: true,
}

const agenciesReducer =  (state = initialState, action: IAction) => {
  const { type, payload } = action;
  
  switch (type) {
    case GET_AGENCIES: {
      return {
        ...state,
        entities: payload.entities,
        ids: payload.ids,
        pending: false,
      }
    }

    case UPDATE_AGENCIES: {
      return {
        ...state,
        entities: {
          ...state.entities,
          ...payload.entities,
        },
        ids: [
          ...state.ids,
          ...payload.ids,
        ],
      }
    }

    case ADD_AGENCY: {
      return {
        ...state,
        entities: {
          [payload.id]: payload,
          ...state.entities
        },
        ids: [payload.id, ...state.ids],
        count: state.count + 1
      }
    }

    case DELETE_AGENCY: {
      const updatedEntities = { ...state.entities };
      delete updatedEntities[payload];

      return {
        ...state,
        ids: state.ids.filter(id => id !== payload),
        count: (state.count - 1 < 0) ? 0 : state.count - 1
      }
    }

    case GET_AGENCIES_COUNT: {
      return {
        ...state,
        count: payload
      }
    }
    
  default:
    return state;
  }
}

export default agenciesReducer;