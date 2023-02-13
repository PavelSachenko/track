export interface IAction {
  type: string;
  payload?: any;
}
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
}

export interface IAgent {
  id: number;
  name: string;
  phone: null | string;
  description: null | string;
  img: null | string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  type: number;
  email: string;
  workTime: { day: number; from: string; to: string };
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
  created_at: string;
  name: string;
  message: null | string;
  type: number;
  img: null | string;
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
  bound_user_id: number;
  user_id: number;
  to: string;
  from: string;
  created_at: string;
  updated_at: string;
  description: null | string;
}
