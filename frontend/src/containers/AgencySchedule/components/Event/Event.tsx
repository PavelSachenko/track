// import { IEvent } from "../../../../interfaces/interfaces";
import "./Event.scss";
// import { fakeIventType } from "../Schedule/Schedule";
import { IAgency } from "../../../../interfaces/interfaces";

// const IS_HOUR_12 = true;

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
}

const Event = (props: IEventProps) => {
  const { event, cellCount } = props;

  const classNames: string[] = ["event"];
  classNames.push(`event--${EventTypes[event.type]}`);

  if (event.type === 1) {
    const startWork = new Date(`${event.from}`)
      .toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toLowerCase()
      .split(" ")
      .join("");

    const endWork = new Date(`${event.to}`)
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
        {cellCount > 1 ? <span>{`${startWork} - ${endWork}`}</span> : ""}
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
