import "./Schedule.scss";

import { useEffect, useState } from "react";
import { ReactComponent as AgentsIcon } from "../../../../icons/agents.svg";
import { ReactComponent as PlusIcon } from "../../../../icons/plus-fat.svg";
import { IEvent } from "../../../../interfaces/interfaces";
import { IAgentSchedule } from "../../../../interfaces/interfaces";
import Event from "../Event/Event";

const step = 900000; //15 min
const IS_HOUR_12 = true;

interface IScheduleStep {
  time: number;
  skip: boolean;
  data: null | {
    cellsCount: number;
    event: IEvent | fakeIventType;
  };
}

export type fakeIventType = Pick<IEvent, "type">;

interface IScheduleData {
  agent: IAgentSchedule;
  scheduleSteps: IScheduleStep[];
}

interface ScheduleProps {
  workTimes: null | {
    from: number;
    to: number;
  };
  agents: IAgentSchedule[];
}

const Schedule = (props: ScheduleProps) => {
  const { workTimes, agents } = props;

  const [scheduleTimes, setScheduleTimes] = useState<number[]>([]);
  const [scheduleData, setScheduleData] = useState<IScheduleData[]>([]);

  useEffect(() => {
    if (!workTimes) return;

    let timeRange: number[] = [];
    let date = workTimes.from;

    while (date <= workTimes.to) {
      timeRange.push(date);
      date += step;
    }

    setScheduleTimes(timeRange);

    let schedule: IScheduleData[] = [];

    agents.forEach((agent) => {
      const scheduleSteps: IScheduleStep[] = [];

      const startWorkByUTC =
        +new Date(agent.work_time.from) +
        new Date().getTimezoneOffset() * -1 * 60000;
      const endWorkByUTC =
        +new Date(agent.work_time.to) +
        new Date().getTimezoneOffset() * -1 * 60000;

      let flagStart: boolean = true;
      let flagEnd: boolean = true;
      let count: number = 0;

      for (let time of timeRange) {
        let skip: boolean = false;

        if (count > 0) {
          skip = true;
          count -= 1;
        }

        if (flagStart) {
          if (time < startWorkByUTC) {
            const cellsCount = (startWorkByUTC - time) / step;
            count = cellsCount - 1;

            scheduleSteps.push({
              time,
              skip,
              data: {
                cellsCount,
                event: {
                  type: 2,
                },
              },
            });

            flagStart = false;
            continue;
          }
        }

        if (flagEnd) {
          if (time == endWorkByUTC) {
            const lastTime: number = timeRange[timeRange.length - 1];
            const cellsCount = (lastTime - time) / step; // Check later
            count = cellsCount;

            scheduleSteps.push({
              time,
              skip,
              data: {
                cellsCount,
                event: {
                  type: 2,
                },
              },
            });

            flagEnd = false;
            continue;
          }
        }

        let event = agent.schedule_events.find((event: IEvent) => {
          const timeByUTC =
            +new Date(event.from) + new Date().getTimezoneOffset() * -1 * 60000;

          return timeByUTC === time;
        });

        if (event) {
          const cellsCount =
            (+new Date(event.to) - +new Date(event.from)) / step;
          count = cellsCount - 1;

          scheduleSteps.push({
            time,
            skip,
            data: {
              cellsCount,
              event,
            },
          });

          continue;
        }

        scheduleSteps.push({
          time,
          skip,
          data: null,
        });
      }

      schedule.push({ scheduleSteps, agent });
    });

    setScheduleData(schedule);
    // console.log(schedule);
    // console.log(scheduleData);
  }, [workTimes, agents]);

  const getTimeCell = (date: number) => {
    const fullTime = new Date(date)
      .toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: IS_HOUR_12,
      })
      .toLowerCase();

    const time = fullTime.slice(0, 5);
    const abbr = fullTime.slice(-2);
    const isZeroMin = time.slice(-2) == "00";

    return (
      <div
        className={`schedule__time-cell ${isZeroMin ? "bold" : ""}`}
        key={date}
      >
        <span className="schedule__num">{time}</span>
        <span>{abbr}</span>
      </div>
    );
  };

  const getSchedule = (schedule: IScheduleData) => {
    const startWork = new Date(schedule.agent.work_time.from)
      .toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric",
        hour12: IS_HOUR_12,
      })
      .toLowerCase()
      .split(" ")
      .join("");

    const endWork = new Date(schedule.agent.work_time.to)
      .toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "2-digit",
        hour12: IS_HOUR_12,
      })
      .toLowerCase()
      .split(" ")
      .join("");

    const getEventCell = (timeStep: IScheduleStep) => {
      return (
        <div
          className="schedule__event-cell"
          style={{
            display: timeStep.skip ? "none" : "block",
            gridColumnEnd: timeStep.data
              ? `span ${timeStep.data.cellsCount}`
              : undefined,
          }}
        >
          {timeStep.data ? (
            <Event
              event={timeStep.data.event}
              cellCount={timeStep.data.cellsCount}
            />
          ) : (
            <button type="button" className="schedule__event-add">
              <div className="schedule__event-add-icon">
                <PlusIcon />
              </div>
            </button>
          )}
        </div>
      );
    };

    return (
      <div
        className="schedule__row"
        style={{ gridTemplateColumns: "28px 124px repeat(77, 52px)" }}
      >
        <div className="schedule__avatar">
          <div className="avatar">
            <img src="#" alt="ava" />
          </div>
        </div>
        <div className="schedule__info-cell">
          <div className="name">{schedule.agent.name}</div>
          <div className="work-time">{`${startWork} - ${endWork}`}</div>
        </div>
        {schedule.scheduleSteps.map(getEventCell)}
      </div>
    );
  };

  return (
    <div className="schedule">
      <div
        className="schedule__head"
        style={{
          gridTemplateColumns: `152px repeat(${scheduleTimes.length}, 52px)`,
        }}
      >
        <div className="schedule__title">
          <AgentsIcon />
          Agents
          <span>({agents.length})</span>
        </div>
        {scheduleTimes.map(getTimeCell)}
      </div>

      {/* <div className="schedule__row">
        <div className="schedule__avatar">
          <div className="avatar">
            <img src="#" alt="ava" />
          </div>
        </div>
        <div className="schedule__info-cell">
          <div className="name">Cristiano Ronaldo</div>
          <div className="work-time">7am - 9pm</div>
        </div>

        <div className="schedule__event-cell">
          <button type="button" className="schedule__event-add">
            <div className="schedule__event-add-icon">
              <PlusIcon />
            </div>
          </button>
        </div>
        <div className="schedule__event-cell">
          <button type="button" className="schedule__event-add">
            <div className="schedule__event-add-icon">
              <PlusIcon />
            </div>
          </button>
        </div>
      </div> */}

      {scheduleData.map(getSchedule)}
    </div>
  );
};

export default Schedule;
