// import { IEvent } from "../../../../interfaces/interfaces";
import "./Event.scss";
// import { fakeIventType } from "../Schedule/Schedule";
import { IAgency } from "../../../../interfaces/interfaces";

export enum EventTypes {
  work = 1,
  rest = 2,
  request = 3,
}

interface IEventProps {
  event: {
    id?: number;
    type: number;
    agency?: null | IAgency;
    bound_user_id?: number;
    user_id?: number;
    to?: string;
    from?: string;
    created_at?: string;
    updated_at?: string;
    description?: null | string;
  };
  cellCount: number;
  currentTime?: Date;
}

const Event = (props: IEventProps) => {
  const { event, cellCount } = props;

  const classNames: string[] = ["event"];
  classNames.push(`event--${EventTypes[event.type]}`);

  if (event.type === 1) {
    const startEvent = new Date(`${event.from}`);
    const endEvent = new Date(`${event.to}`);
    const currentTime = new Date();
    let isActive = false;

    if (currentTime >= startEvent && currentTime < endEvent) {
      isActive = true;
    }

    if (isActive) {
      classNames.push("active");
    }

    const from = new Date(startEvent)
      .toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toLowerCase()
      .split(" ")
      .join("");

    const to = new Date(endEvent)
      .toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toLowerCase()
      .split(" ")
      .join("");

    return (
      <div className={classNames.join(" ")}>
        {cellCount > 1 ? <span>{`${from} - ${to}`}</span> : ""}
        {isActive ? (
          <span className="event__process">(In proccesing)</span>
        ) : (
          ""
        )}
      </div>
    );
  }

  if (event.type === 2) {
    return (
      <div className={classNames.join(" ")}>
        {cellCount > 1 ? <span>Unavailable</span> : ""}
      </div>
    );
  }

  return <div className={classNames.join(" ")}>Request</div>;
};

export default Event;
