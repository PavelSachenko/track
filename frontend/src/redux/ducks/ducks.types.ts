import {
  IModal,
  IEvent,
  IAgent,
  IAgency,
  IInvite,
  INotification,
  IAgentSchedule,
} from "../../interfaces/interfaces";

export interface IAction {
  type: string;
  payload?: any;
}

export interface IActiveWindowsState {
  activeModals: IModal[];
  activeModalsEntities: {
    [key: string]: boolean;
  };
}

export interface IUserState {
  authToken: null | string;
  user: null | IAgent | IAgency;
}

export interface IAgenciesState {
  entities: { [key: number]: IAgency };
  ids: number[];
  count: number;
  pending: boolean;
}
export interface IAgentsState {
  ids: number[];
  auxiliaryIds: number[];
  entities: { [key: string]: IAgent };
  agentsCount: number;
  search: string;
  pending: boolean;
  filterStatus: number;
  inviteIds: number[];
  inviteEntities: { [key: string]: IInvite };
  invitesCount: number;
}

export interface IAgentsConfig {
  search?: string;
  filterStatus?: number;
  offset?: number;
}

export interface INotificationsState {
  ids: number[];
  newIds: number[];
  entities: { [key: string]: INotification };
  count: number;
  pending: boolean;
}

export interface IAgentScheduleState {
  workTime: null | {
    from: number;
    to: number;
  };
  events: IEvent[];
  pending: boolean;
}

export interface IAgencyScheduleState {
  agents: IAgentSchedule[];
  workTimes: null | {
    from: number;
    to: number;
  };
  pending: boolean;
}
