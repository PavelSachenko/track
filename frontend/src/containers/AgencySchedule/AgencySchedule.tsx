import "./AgencySchedule.scss";
import { useState, useRef, useEffect } from "react";
import { useToggle } from "../../hooks";

import { ReactComponent as ArrowIcon } from "../../icons/arrow-rounded.svg";
import { ReactComponent as CalendarIcon } from "../../icons/calendar.svg";
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import Calendar from "../../components/Calendar/Calendar";
import DropWrapper from "../../components/DropWrapper/DropWrapper";
import Schedule from "./components/Schedule/Schedule";

const IS_HOUR_12 = true;
const twentyFourHours = 86400000;

const AgencySchedule = () => {
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
      <div className="agency-schedule__calendar">
        <h2 className="agency-schedule__title">Schedule</h2>

        <div className="agency-schedule__date date-nav">
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

      <Schedule />
    </div>
  );
};

export default AgencySchedule;
