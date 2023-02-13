import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { IEvent } from "../../../../interfaces/interfaces";
import { classModifier } from "../../../../utils";
import { MODAL_TYPES, openModal } from "../../../../redux/ducks/activeWindows";

import "./Schedule.scss";
import { ReactComponent as PlusIcon } from "../../../../icons/plus-fat.svg";
import Event from "../Event/Event";

const step = 900000; //15 min
const IS_HOUR_12 = true;

interface IScheduleStepData {
  time: number;
  skip: boolean;
  data: null | {
    cellsCount: number;
    event: IEvent;
  };
}

interface IScheduleProps {
  filterDate: number;
  workTime: null | {
    from: number;
    to: number;
  };
  events: null | IEvent[];
}

const Schedule = (props: IScheduleProps) => {
  const { filterDate, events, workTime } = props;

  const dispatch = useDispatch();

  const [scheduleData, setScheduleData] = useState<IScheduleStepData[]>([]);

  useEffect(() => {
    if (!events || !workTime) return;

    // Getting time range
    let timeRange = [];
    let date = workTime.from;

    while (date <= workTime.to) {
      timeRange.push(date);
      date += step;
    }

    // Getting schedule data
    let count = 0;
    let scheduleData: IScheduleStepData[] = [];

    timeRange.forEach((time: number) => {
      let skip = false;
      let event = events.find((event: IEvent) => {
        //TODO
        const timeByUTC =
          +new Date(event.from) + new Date().getTimezoneOffset() * -1 * 60000;

        return timeByUTC === time;
      });

      if (count > 0) {
        skip = true;
        count -= 1;
      }

      if (event) {
        const cellsCount = (+new Date(event.from) - +new Date(event.to)) / step;

        count = cellsCount - 1;
        scheduleData.push({
          time,
          skip: false,
          data: { cellsCount, event },
        });
      } else {
        scheduleData.push({
          time,
          skip,
          data: null,
        });
      }
    });

    setScheduleData(scheduleData);
  }, [workTime, events]);

  const getTimeCell = (item: IScheduleStepData) => {
    const time = new Date(item.time)
      .toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: IS_HOUR_12,
      })
      .toLowerCase();

    return (
      <div className="schedule__time-cell" key={item.time}>
        <span
          className={classModifier(
            "schedule__time",
            item.data ? "event-start" : ""
          )}
        >
          <span>{time.slice(0, 5)}</span> {time.slice(6)}
        </span>
      </div>
    );
  };

  const getEventCell = (
    item: IScheduleStepData,
    index: number,
    list: any[]
  ) => {
    const isLastItem = index === list.length - 1;

    return (
      <div
        className={classModifier(
          "schedule__event-cell",
          item.data ? "event" : ""
        )}
        key={item.time}
        style={{
          display: item.skip ? "none" : "block",
          gridRowEnd: item.data ? `span ${item.data.cellsCount}` : undefined,
        }}
      >
        {item.data ? (
          <Event item={item.data.event} filterDate={filterDate} />
        ) : isLastItem ? null : (
          <button
            type="button"
            className="schedule__add-event"
            onClick={() =>
              dispatch(
                openModal(MODAL_TYPES.eventModal, {
                  filterDate: filterDate,
                  selectedData: item.time,
                })
              )
            }
          >
            <div className="schedule__add-event-icon">
              <PlusIcon />
            </div>
          </button>
        )}
      </div>
    );
  };

  if (!scheduleData) {
    return null;
  }

  return (
    <div className="schedule">
      <div className="schedule__grid">
        <div className="schedule__time-list">
          {scheduleData.map(getTimeCell)}
        </div>

        <div
          className="schedule__events"
          style={{ gridTemplateRows: `repeat(${scheduleData.length}, 45px)` }}
        >
          {scheduleData.map(getEventCell)}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
