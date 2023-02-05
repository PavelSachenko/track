import { Dispatch } from 'redux';

import { IAction, IAgent, IAgency } from '../../interfaces/interfaces';
import { IUserState } from './ducks.types';
import { getAgencies, getAgenciesCount } from './agencies';
import { getAgents, getInvitesCount } from './agents';
import { getNotificationsCount } from './notifications';

export const SET_TOKEN = 'SET_TOKEN';

export const SET_USER = 'SET_USER';

export const initApp = (user: IAgent | IAgency) => (dispatch: Dispatch<any>) => {
  const authToken = localStorage.getItem('token');

  dispatch({
    type: SET_TOKEN,
    payload: authToken,
  })

  dispatch({
    type: SET_USER,
    payload: user,
  })

  if (user.type === 1) {
    dispatch(getAgenciesCount());
    dispatch(getAgencies());
  } 

  if (user.type === 2) {
    dispatch(getInvitesCount());
    dispatch(getAgents());
  }

  dispatch(getNotificationsCount())
}

export const setUser = (user: IAgent | IAgency) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user
  })
}

const initialState: IUserState = {
  authToken: null,
  user: null,
}

const userReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case SET_TOKEN: {
      return {
        ...state,
        authToken: payload
      }
    }

    case SET_USER: {
      return {
        ...state,
        user: {
          ...payload
        }
      }
    }

    default:
      return state;
  }
}

export default userReducer;