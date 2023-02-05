import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { IEvent } from '../../interfaces/interfaces';
import { AppState } from '../../redux/store';
import { useToggle } from '../../hooks';
import { useDidMount, useDidUpdate } from '../../hooks';
import { getAgentSchedule } from '../../redux/ducks/agentSchedule';

import './AgentSchedule.scss';
import { ReactComponent as ClockIcon } from '../../icons/clock.svg';
import { ReactComponent as ArrowIcon } from '../../icons/arrow-rounded.svg';
import { ReactComponent as CalendarIcon } from '../../icons/calendar.svg';
import Toggle from '../../components/Toggle/Toggle';
import Spinner from '../../components/Spinner/Spinner';
import Calendar from '../../components/Calendar/Calendar';
import Schedule from './components/AgentSchedule/Schedule';
import DropWrapper from '../../components/DropWrapper/DropWrapper';
import API from '../../api/api';

const IS_HOUR_12 = true;
const twentyFourHours = 86400000;

interface IAgentScheduleProps {
  pending: boolean;
  events: null | IEvent[];
  workTime: null | {
    from: number;
    to: number;
  },
  userStatus: 0 | 1;
  getAgentSchedule: (date: number) => void;
}

const AgentSchedule = (props: IAgentScheduleProps) => {
  const {
    pending,
    events,
    workTime,
    userStatus,
    getAgentSchedule,
  } = props;

  const today = new Date();
  const todayByUTC = new Date(today).setHours(0, 0, 0, 0) + today.getTimezoneOffset() * (-1) * 60000;

  const [date, setDate] = useState(todayByUTC);
  const [time, setTime] = useState<string>(new Date().toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: IS_HOUR_12
  }));

  const [isWorking, toggleIsWorking] = useToggle(userStatus === 1);
  const [isCalendarOpen, toggleCalendarOpen] = useToggle(false);

  const calendarContainerRef = useRef(null);
  const calendarDropWrapperRef = useRef(null);

  useDidMount(() => {
    getAgentSchedule(todayByUTC);
  })

  useDidUpdate(() => { 
    getAgentSchedule(date);
  }, [date])

  useDidUpdate(() => {
    API.changeWorkingStatus(isWorking ? 1 : 0)
      .catch(console.error);
  }, [isWorking])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: IS_HOUR_12
      });

      setTime(currentTime);
    }, 15000)

    return () => clearInterval(intervalId);
  }, [])

  const getDateToShow = () => {
    return new Date(date).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      weekday: 'short',
      day: 'numeric'
    })
  }

  console.log('AgentSchedule render');
  return (
    <div className="agent-schedule">
      <div className="agent-schedule__sticky-container">
        <h2 className="agent-schedule__title">Schedule</h2>

        <div className="agent-schedule__date date-nav">
          <button
            className="date-nav__nav-btn date-nav__nav-btn--prev"
            type="button"
            onClick={() => setDate(date => date - twentyFourHours)}
          >
            <ArrowIcon />
          </button>

          <div
            className="date-nav__date"
            ref={calendarContainerRef}
          >
            <button
              type="button"
              className="date-nav__date-btn"
              onMouseDown={toggleCalendarOpen}
            >
              <CalendarIcon className="date-nav__icon" />

              <span>{getDateToShow()}</span>
            </button>

            {isCalendarOpen &&
              <DropWrapper
                dropWrapperRef={calendarDropWrapperRef}
                closeDropWrapper={toggleCalendarOpen}
              >
                <Calendar
                  containerForAutoPositionRef={calendarContainerRef}
                  date={date}
                  onChange={(date: number) => {
                    setDate(date);
                    toggleCalendarOpen(false);
                  }}
                />
              </DropWrapper>
            }
          </div>

          <button
            className="date-nav__nav-btn date-nav__nav-btn--next"
            type="button"
            onClick={() => setDate(date => date + twentyFourHours)}
          >
            <ArrowIcon />
          </button>
        </div>

        <div className="agent-schedule__time">
          <ClockIcon />

          <span>{time}</span>
        </div>
      </div>

      <div className="agent-schedule__work-status">
        <span>
          I'm working today
        </span>

        <Toggle 
          name="work"
          active={isWorking}
          onToggle={toggleIsWorking}
        />
      </div>

      <div className="agent-schedule__main">
        {pending 
          ? (
            <div className="agent-schedule__spinner">
              <Spinner size='100px' />
            </div>
          ):(
            <Schedule
              filterDate={date}
              events={events}
              workTime={workTime}
            />
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  events: state.agentSchedule.events,
  userStatus: state.user.user.status,
  pending: state.agentSchedule.pending,
  workTime: state.agentSchedule.workTime,
})

const mapDispatchToProps = {
  getAgentSchedule,
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentSchedule);
