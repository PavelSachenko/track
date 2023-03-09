import "./AgencySchedule.scss";
import { useState, useRef, useEffect } from "react";
import { useToggle } from "../../hooks";
import { connect } from "react-redux";

import { ReactComponent as ArrowIcon } from "../../icons/arrow-rounded.svg";
import { ReactComponent as CalendarIcon } from "../../icons/calendar.svg";
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import Spinner from "../../components/Spinner/Spinner";
import Calendar from "../../components/Calendar/Calendar";
import DropWrapper from "../../components/DropWrapper/DropWrapper";
import Schedule from "./components/Schedule/Schedule";
import { useDidMount, useDidUpdate } from "../../hooks";
import { AppState } from "../../redux/store";
import { getAgencySchedule } from "../../redux/ducks/agencySchedule";

const IS_HOUR_12 = true;
const twentyFourHours = 86400000;

interface IAgencyScheduleProps {
  pending: boolean;
  workTimes: null | {
    from: number;
    to: number;
  };
  agents: [];
  getAgencySchedule: (date: number) => void;
}

const AgencySchedule = (props: IAgencyScheduleProps) => {
  const { pending, workTimes, agents, getAgencySchedule } = props;

  console.log(pending);

  const today = new Date();
  const todayByUTC =
    new Date(today).setHours(0, 0, 0, 0) +
    today.getTimezoneOffset() * -1 * 60000;

  const [date, setDate] = useState(todayByUTC);
  const [time, setTime] = useState<string>(
    new Date().toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: IS_HOUR_12,
    })
  );

  const [isCalendarOpen, toggleCalendarOpen] = useToggle(false);

  const calendarContainerRef = useRef(null);
  const calendarDropWrapperRef = useRef(null);

  useDidMount(() => {
    getAgencySchedule(todayByUTC);
  });

  useDidUpdate(() => {
    getAgencySchedule(date);
  }, [date]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: IS_HOUR_12,
      });

      setTime(currentTime);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const getDateToShow = () => {
    return new Date(date).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      weekday: "short",
      day: "numeric",
    });
  };

  return (
    <div className="agency-schedule">
      <div className="agency-schedule__header">
        <h2 className="agency-schedule__title">Schedule</h2>

        <div className="agency-schedule__date date-nav">
          <div className="agency-schedule__search">
            <SearchIcon />
            <input type="text" placeholder="Search Agent" />
          </div>
          <button
            className="date-nav__nav-btn date-nav__nav-btn--prev"
            type="button"
            onClick={() => setDate((date) => date - twentyFourHours)}
          >
            <ArrowIcon />
          </button>

          <div className="date-nav__date" ref={calendarContainerRef}>
            <button
              type="button"
              className="date-nav__date-btn"
              onMouseDown={toggleCalendarOpen}
            >
              <CalendarIcon className="date-nav__icon" />

              <span>{getDateToShow()}</span>
            </button>

            {isCalendarOpen && (
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
            )}
          </div>

          <button
            className="date-nav__nav-btn date-nav__nav-btn--next"
            type="button"
            onClick={() => setDate((date) => date + twentyFourHours)}
          >
            <ArrowIcon />
          </button>
        </div>

        <div className="agency-schedule__time">
          <ClockIcon />

          <span>{time}</span>
        </div>
      </div>
      <div className="agency-schedule__main">
        {pending ? (
          <div className="agency-schedule__spinner">
            <Spinner size="100px" />
          </div>
        ) : (
          <Schedule agents={agents} workTimes={workTimes} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  pending: state.agencySchedule.pending,
  workTimes: state.agencySchedule.workTimes,
  agents: state.agencySchedule.agents,
});

const mapDispatchToProps = {
  getAgencySchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencySchedule);
