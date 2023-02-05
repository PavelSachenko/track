import { Dispatch } from 'redux';

import API from '../../api/api';
import { IAgentScheduleState } from './ducks.types';
import { IAction, IEvent } from "../../interfaces/interfaces";

export const GET_AGENT_SCHEDULE = 'GET_AGENT_SCHEDULE';

export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export const SET_PENDING_TRUE = 'SET_PENDING_TRUE';

export const getAgentSchedule = (date: number) => (dispatch: Dispatch) => {
  dispatch({ type: SET_PENDING_TRUE });

  return API.getAgentSchedule(date)
    .then(({ data }) => {
      dispatch({
        type: GET_AGENT_SCHEDULE,
        payload: data
      })
    })
    .catch(console.error);
}

export const addEvent = (
  event: IEvent, 
  workTime: { from: number, to: number },
) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_EVENT,
    payload: { event, workTime }
  })
}

export const updateEvent = (
  event: IEvent,
  workTime: { from: number, to: number },
) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_EVENT,
    payload: { event, workTime }
  })
}

export const deleteEvent = (
  eventId: number, 
  workTime: { from: number, to: number }
) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_EVENT,
    payload: { eventId, workTime }
  })
}

const initialState: IAgentScheduleState = {
  pending: true,
  events: [],
  workTime: null,
}

const agentScheduleReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PENDING_TRUE: {
      return {
        ...state,
        pending: true,
      }
    }

    case GET_AGENT_SCHEDULE: {
      return {
        ...state,
        workTime: payload.date,
        events: payload.schedule,
        pending: false,
      }
    }

    case ADD_EVENT: {
      return {
        ...state,
        workTime: payload.workTime,
        events: [...state.events, payload.event],
      }
    }

    case UPDATE_EVENT: {
      return {
        ...state,
        workTime: payload.workTime,
        events: state.events?.map(event => event.id === payload.event.id ? payload.event : event),
      }
    }

    case DELETE_EVENT: {
      return {
        ...state,
        workTime: payload.workTime,
        events: state.events?.filter(event => event.id !== payload.eventId),
      }
    }


  default:
    return state
  }
}

export default agentScheduleReducer;
