import { useDispatch } from 'react-redux';

import { IEvent } from '../../../../interfaces/interfaces';
import { MODAL_TYPES, openModal } from '../../../../redux/ducks/activeWindows';
import { getContactAvatar, classModifier } from '../../../../utils';

import './Event.scss';
import LazyLoadImage from '../../../../components/LazyLoadImage/LazyLoadImage';
import { ReactComponent as EditIcon } from '../../../../icons/edit.svg';

const IS_HOUR_12 = true;

export enum EventTypes {
  work = 1,
  rest = 2,
  request = 3,
}

interface IEventProps {
  item: IEvent;
  filterDate: number;
}

const Event = ({ item, filterDate }: IEventProps) => {
  const dispatch = useDispatch();

  const timeConversion = (duration: number) => {
    const result: string[] = [];

    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      result.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }

    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      result.push(minutes + ' min');
    }

    return result.join(' ');
  }

  const handleEditBtnClick = () => {
    dispatch(openModal(MODAL_TYPES.eventModal, {
      filterDate,
      event: item, 
      isEditMode: true 
    }));
  }

  const getTimeRange = (startDate: string, endDate: string) => {
    const startTime = new Date(startDate)
      .toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: IS_HOUR_12 })
      .toLowerCase();

    const endTime = new Date(endDate)
      .toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: IS_HOUR_12 })
      .toLowerCase();

    return startTime + ' - ' + endTime;
  }

  const eventDuration = timeConversion(+new Date(item.work_end) - +new Date(item.work_start));

  return (
    <div className={classModifier('event', [
      item.type === EventTypes.request && 'request',
      item.type === EventTypes.rest && 'unavailable',
    ])}>
      {item.type === EventTypes.rest
        ? <p>Unavailable</p>
        : (<>
          <div className="event__avatar">
            <LazyLoadImage src={getContactAvatar(item.agency || { img: null, type: 2 })} />
          </div>

          <div className="event__info">
            {item.agency &&
              <div className="event__name">
                {item.agency.name}
              </div>
            }

            <div className="event__time">
              {getTimeRange(item.work_start, item.work_end)}
            </div>
          </div>
        </>)
      }

      <button 
        className="event__edit-btn" 
        type="button"
        onClick={handleEditBtnClick}
      >
        <EditIcon />
      </button>

      <span className="event__duration">
        {eventDuration}
      </span>
    </div>
  )
}

export default Event;
