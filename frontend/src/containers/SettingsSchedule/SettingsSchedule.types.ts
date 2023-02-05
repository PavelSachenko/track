export type ModeType = 'everyday' | 'weekdays' | 'custom';

export interface IDay {
  day: string;
  from: string;
  to: string;
}

export interface IData {
  mode: ModeType;
  timeData: {
    everydayWeekdays: IDay[];
    custom: IDay[];
  }
}

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const modeOptions = {
  everyday: { value: 'everyday', label: 'Every day' },
  weekdays: { value: 'weekdays', label: 'Weekdays' },
  custom: { value: 'custom', label: 'Custom' }
};