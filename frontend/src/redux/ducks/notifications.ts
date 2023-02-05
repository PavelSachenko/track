import { Dispatch } from 'redux';

import API from '../../api/api';
import { IAction, INotification } from '../../interfaces/interfaces';
import { INotificationsState } from './ducks.types';
import { normalize } from '../../utils';

export const GET_NOTIFICATIONS_COUNT = 'GET_NOTIFICATIONS_COUNT';
export const REDUCE_NOTIFICATIONS_COUNT = 'REDUCE_NOTIFICATIONS_COUNT';

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const REMOVE_NOTIFICATIONS = 'REMOVE_NOTIFICATIONS';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const getNotificationsCount = () => (dispatch: Dispatch) => {
  API.getNotificationsCount()
    .then(({ data }) => {
      dispatch({
        type: GET_NOTIFICATIONS_COUNT,
        payload: data
      })
    })
}

export const reduceNotificationsCount = (value: number) => (dispatch: Dispatch) => {
  dispatch({
    type: REDUCE_NOTIFICATIONS_COUNT,
    payload: value
  })
}

export const getNotifications = (offset?: number) => (dispatch: Dispatch) => {
  API.getNotifications(offset)
    .then(({ data }) => {
      dispatch({
        type: offset ? UPDATE_NOTIFICATIONS : GET_NOTIFICATIONS,
        payload: normalize(data)
      })
    })
    .catch(console.error)
}

export const addNotification = (notification: INotification) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: notification
  })
}

export const removeNotifications = (ids: number[], isReduceCount: boolean = true) => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_NOTIFICATIONS,
    payload: { ids, isReduceCount }
  })
}

const initialState: INotificationsState = {
  ids: [],
  newIds: [],
  entities: {},
  count: 0,
  pending: true,
}

const notificationsReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS_COUNT: {
      return {
        ...state,
        count: payload,
      }
    }

    case REDUCE_NOTIFICATIONS_COUNT: {
      return {
        ...state,
        count: (state.count - payload < 0) ? 0 : state.count - payload,
      }
    }

    case GET_NOTIFICATIONS: {
      return {
        ...state,
        entities: payload.entities,
        ids: payload.ids,
        pending: false,
      }
    }

    case UPDATE_NOTIFICATIONS: {
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

    case ADD_NOTIFICATION: {
      return {
        ...state,
        entities: { 
          [payload.id]: payload, 
          ...state.entities 
        },
        ids: state.ids.includes(payload.id) ? state.ids : [payload.id, ...state.ids],
        count: state.ids.includes(payload.id) ? state.count : state.count + 1,
      }
    }

    case REMOVE_NOTIFICATIONS: {
      if (payload.ids.length === 0) return state;

      const updatedEntities = { ...state.entities };
      payload.ids.forEach((id: number) => delete updatedEntities[id]);

      return {
        ...state,
        ids: state.ids.filter((id) => !payload.ids.includes(id)),
        entities: updatedEntities,
        count: payload.isReduceCount 
          ? (state.count - payload.ids.length < 0) ? 0 : state.count - payload.ids.length
          : state.count
      }
    }

    default:
      return state;
  }
}

export default notificationsReducer;