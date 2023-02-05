import { useState, useEffect, RefObject } from 'react';
import ReactCalendar from 'react-calendar';

import './Calendar.scss';
import { ReactComponent as ArrowIcon } from '../../icons/arrow-rounded.svg';

export const TODAY = 'Today';
export const YESTERDAY = 'Yesterday';
export const TOMORROW = 'Tomorrow';

const shortcuts = [YESTERDAY, TODAY, TOMORROW];

const calendarWidth = 270;

interface ICalendarProps {
  date: number;
  onChange: (timestamp: number) => void;
  containerForAutoPositionRef: RefObject<Element>;
}

const Calendar = (props: ICalendarProps) => {
  const {
    date,
    onChange,
    containerForAutoPositionRef
  } = props;

  const twentyFourHours = 86400000;

  const today = new Date();
  const todayByUTC = new Date(today).setHours(0, 0, 0, 0) + today.getTimezoneOffset() * (-1) * 60000;

  const [activeShortcut, setActiveShortcut] = useState<null | string>(null)

  useEffect(() => { // Setting active shortcut
    if (date === todayByUTC) {
      setActiveShortcut(TODAY);
    }
    else if (date === todayByUTC - twentyFourHours) {
      setActiveShortcut(YESTERDAY);
    }
    else if (date === todayByUTC + twentyFourHours) {
      setActiveShortcut(TOMORROW);
    }
  }, [date]);

  const selectShortcut = (name: string): void => {
    switch (name) {
      case TODAY: {
        onChange(todayByUTC);
        break;
      }
      case YESTERDAY: {
        onChange(todayByUTC - twentyFourHours);
        break;
      }
      case TOMORROW: {
        onChange(todayByUTC + twentyFourHours);
        break;
      }
    }
  }

  const handleCalendarDateChange = (date: Date | Date[]) => {
    if (date instanceof Date) {
      const dateByUTC = new Date(date).setHours(0, 0, 0, 0) + date.getTimezoneOffset() * (-1) * 60000;

      onChange(+dateByUTC);
    }
  };

  const getAutoPositionStyles = () => {
    if (!containerForAutoPositionRef?.current) return;

    const containerCoords = containerForAutoPositionRef.current.getBoundingClientRect();

    return {
      left: (containerCoords.width / 2) - (calendarWidth / 2) + 'px',
    }
  }

  const getClassName = (name: string) => {
    return activeShortcut === name
      ? 'calendar__shortcut calendar__shortcut--active'
      : 'calendar__shortcut'
  };

  return (
    <div
      className="calendar"
      style={{ ...getAutoPositionStyles() }}
    >
      <ul className="calendar__shortcuts">
        {shortcuts.map(item => 
          <li
            key={item}
            onClick={() => selectShortcut(item)}
            className={getClassName(item)}
          >
            {item}
          </li>
        )}
      </ul>

      <ReactCalendar
        locale="en-En"
        minDetail="month"
        value={new Date(date)}
        onChange={handleCalendarDateChange}
        prev2Label={null}
        next2Label={null}
        prevLabel={<ArrowIcon />}
        nextLabel={<ArrowIcon />}
        formatShortWeekday={(locale, date) => (
          new Date(date).toLocaleString(locale, { weekday: 'short' }).slice(0, 2)
        )}
      />
    </div>
  )
}

export default Calendar;
