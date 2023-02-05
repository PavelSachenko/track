export interface IAction {
  type: string;
  payload?: any;
};
export interface IAnyObject {
  [key: string]: any;
}

export interface ReactSelectOption {
  label: any;
  value: any;
}

export interface IRegistrationValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  type: number;
}

export interface ILoginValues {
  email: string;
  password: string;
}

export interface IModal {
  type: string;
  props?: IAnyObject;
};

export interface IAgent {
  id: number;
  name: string;
  phone: null | string;
  description: null | string;
  img: null | string;
  status: 0 | 1;
  created_at: string;
  updated_at: string;
  type: number;
  email: string;
  url: null | string;
  wasAdded: null | string;
}

export interface IAgency {
  id: number;
  name: string;
  url: null | string;
  phone: null | string;
  description: null | string;
  img: null | string;
  created_at: string;
  updated_at: string;
  type: number;
  email: string;
}

export interface INotificationItem {
  type: string;
  data: INotification;
} 

export interface INotification {
  id: number;
  email: string;
  token: string;
  status: number;
  sender: IAgency | IAgency;
  created_at: string;
  updated_at: string;
  observer_id: string;
}

export interface IInvite {
  id: number;
  email: string;
  created_at: string;
}

export interface IEvent {
  id: number;
  type: number;
  agency: null | IAgency;
  agent_id: number;
  work_end: string;
  work_start: string;
  created_at: string;
  updated_at: string;
  description: null | string;
}