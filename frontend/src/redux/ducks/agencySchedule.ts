import { Dispatch } from "redux";

import API from "../../api/api";
import { IAgencyScheduleState } from "./ducks.types";
import { IAction } from "../../interfaces/interfaces";

export const GET_AGENCY_SCHEDULE = "GET_AGENCY_SCHEDULE";
export const SET_PENDING_TRUE = "SET_PENDING_TRUE";

const initialState: IAgencyScheduleState = {
  pending: true,
  agents: [],
  workTimes: null,
};

export const getAgencySchedule = (date: number) => (dispatch: Dispatch) => {
  dispatch({ type: SET_PENDING_TRUE });

  return API.getAgencySchedule(date)
    .then(({ data }) => {
      dispatch({
        type: GET_AGENCY_SCHEDULE,
        payload: data,
      });
    })
    .catch(console.error);
};

const agencyScheduleReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PENDING_TRUE: {
      return {
        ...state,
        pending: true,
      };
    }

    case GET_AGENCY_SCHEDULE: {
      return {
        ...state,
        workTimes: payload.work_times,
        agents: payload.agents,
        pending: false,
      };
    }

    default:
      return state;
  }
};

export default agencyScheduleReducer;
