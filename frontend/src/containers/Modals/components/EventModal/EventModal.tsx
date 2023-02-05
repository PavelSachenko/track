import { useState, useMemo }  from 'react';
import { connect } from 'react-redux';
// import AsyncSelect from 'react-select/async';
import Select, { IndicatorProps } from 'react-select';

import API from '../../../../api/api';
import { EventTypes } from '../../../AgentSchedule/components/Event/Event';
import { addEvent, updateEvent } from '../../../../redux/ducks/agentSchedule';
import { useToggle, useDidMount } from '../../../../hooks';
import { MODAL_TYPES, openModal } from '../../../../redux/ducks/activeWindows';
import { /* IAnyObject, IEvent, */ IAgency, ReactSelectOption } from '../../../../interfaces/interfaces';

import './EventModal.scss';
import { ReactComponent as TrashIcon } from '../../../../icons/trash.svg';
import { ReactComponent as ClockIcon } from '../../../../icons/clock.svg';
import { ReactComponent as CalendarIcon } from '../../../../icons/calendar.svg';
import Toggle from '../../../../components/Toggle/Toggle';
import AsyncBtn from '../../../../components/AsyncBtn/AsyncBtn';

const IS_HOUR_12 = true;
const MAX_MENU_HEIGHT = 200;
const ONE_HOUR_MS = 3600000;

const defaultAgency = { value: 0, label: 'None' };

// interface IEventModalProps {
//   event: IEvent;
//   pending: boolean;
//   isEditMode: boolean;
//   selectedData: number;
//   addEvent: (event: IEvent) => void;
//   updateEvent: (event: IEvent) => void;
//   openModal: (type: string, params: IAnyObject) => void;
//   closeModal: () => void;
//   setPending: (pending: boolean) => void;
// }

const EventModal = (props: any) => {
  const {
    event,
    pending,
    isEditMode,
    filterDate,
    selectedData,
    addEvent,
    updateEvent,
    openModal,
    closeModal,
    setPending,
  } = props;

  const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>({});
  const [agenciesList, setAgenciesList] = useState<ReactSelectOption[]>([]);
  const [description, setDescription] = useState<string>(event?.description || '');
  const [agency, setAgency] = useState<ReactSelectOption>(event?.agency
    ? { value: event.agency.id, label: event.agency.name }
    : defaultAgency
  );
  const [timeRange, setTimeRange] = useState(event ? {
    from:  +new Date(event.work_start) + new Date().getTimezoneOffset() * (-1) * 60000, //If editing event set UTC date from string
    to: +new Date(event.work_end) + new Date().getTimezoneOffset() * (-1) * 60000
  }:{
    from: +new Date(selectedData).setUTCMinutes(0, 0, 0), // Else get time range from selected cell
    to: +new Date(selectedData).setUTCMinutes(60, 0, 0)
  });

  const [isAvailable, toggleIsAvailable] = useToggle(event?.type !== EventTypes.rest);

  useDidMount(() => {
    API.getAgencies(undefined, 10)
      .then(({ data }) => {
        setAgenciesList(data.map((agency: IAgency) => ({ value: agency.id, label: agency.name })));
      })
      .catch(console.error);
  })

  //Generate time options for select
  const timeOptions = useMemo(() => {
    let dateStart = new Date(filterDate).setUTCHours(0, 0, 0, 0);
    let dateEnd = new Date(filterDate).setUTCHours(24, 0, 0, 0);
    let timeOptions: ReactSelectOption[] = [];

    let stepDate = dateStart;

    while (stepDate < dateEnd) {
      const labelTime = new Date(stepDate)
        .toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: IS_HOUR_12, timeZone: 'UTC' });

      timeOptions.push({ value: stepDate, label: labelTime });

      stepDate += ONE_HOUR_MS;
    }

    timeOptions.push({ value: dateEnd, label: 'Midnight' });

    return timeOptions;
  }, [])
  
  const onSubmit = () => {
    const config = {
      id: isEditMode ? event.id : null,
      end: timeRange.to,
      start: timeRange.from,
      type: isAvailable ? 'work' : 'rest',
      agencyId: agency.value,
      description
    }

    setPending(true);

    if (isEditMode) {
      return API.addEvent(config, 'update')
        .then(({ data }) => {
          updateEvent(data.event, data.date);
          closeModal();
        })
        .catch((err) => {
          setServerErrors(err.response.data);
          console.error(err);
        })
        .finally(() => setPending(false));
    } else {
      return API.addEvent(config)
        .then(({ data }) => {
          addEvent(data.event, data.date);
          closeModal();
        })
        .catch((err) => {
          setServerErrors(err.response.data);
          console.error(err);
        })
        .finally(() => setPending(false));
    }
  }

  const onChangeTimeHandler = (value: number, type: 'from' | 'to') => {
    if (timeRange[type] === value) return;

    const getValues = (timeRange: { from: number, to: number }, type: 'from' | 'to') => {
      if (type === 'to') {
        return { ...timeRange, to: value };
      }
      else {
        // If "from" time is more than "to" - set "to" time one hour more than "from"
        if (value >= timeRange.to) {
          return { from: value, to: value + ONE_HOUR_MS };
        }
        else {
          return { ...timeRange, from: value };
        }
      }
    }

    setTimeRange((prev) => getValues(prev, type))
  }

  const handleDeleteBtnClick = () => {
    openModal(MODAL_TYPES.deleteEventModal, { 
      eventId: event.id,
      closeEventModal: closeModal,
    });
  }

  const getIsOptionDisabled = ({ value: toValue, label }: ReactSelectOption) => {
    return (timeRange.from >= toValue) && label !== '24:00';
  }

  const getSelectValue = (timeOptions: ReactSelectOption[], value: number) => {
    return timeOptions.find((option: ReactSelectOption) => option.value === value);
  };

  // const loadOptions = (query: string) => {
  //   return query
  //     ? API.getAgencies()
  //     : API.getAgencies(undefined, undefined, query);
  // }

  const CustomDropdownIndicator = (props: IndicatorProps<ReactSelectOption, false>) => (
    <div {...props.innerProps} className="time-select__indicator time-select__dropdown-indicator">
      <ClockIcon />
    </div>
  )

  const getDateToShow = () => {
    return new Date(filterDate).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      weekday: 'short',
      day: 'numeric'
    })
  }
 
  return (
    <div className="event-modal modal-wrap">
      <h2 className="event-modal__title">Add Event</h2>

      <div className="event-modal__date">
        <CalendarIcon className="event-modal__date-icon" />

        <span>{getDateToShow()}</span>
      </div>

      <div className="event-modal__field event-modal__field--event-time">
        <div className="event-modal__event-time-wrap">
          <div className="event-modal__event-time">
            <label className="label label--required">Start at</label>

            <Select
              isSearchable={false}
              options={timeOptions.slice(0, timeOptions.length - 1)}
              defaultValue={timeOptions[8]}
              maxMenuHeight={MAX_MENU_HEIGHT}
              value={getSelectValue(timeOptions, timeRange.from)}
              onChange={(value) => value && onChangeTimeHandler(value.value, 'from')}
              components={{
                IndicatorSeparator: null,
                DropdownIndicator: CustomDropdownIndicator,
              }}
              className="time-select"
              classNamePrefix="time-select"
            />
          </div>

          <div className="event-modal__event-time">
            <label className="label label--required">Ends at</label>

            <Select
              isSearchable={false}
              options={timeOptions.slice(1)}
              defaultValue={timeOptions[17]}
              maxMenuHeight={MAX_MENU_HEIGHT}
              value={getSelectValue(timeOptions, timeRange.to)}
              isOptionDisabled={(option) => getIsOptionDisabled(option)}
              onChange={(value) => value && onChangeTimeHandler(value.value, 'to')}
              components={{
                IndicatorSeparator: null,
                DropdownIndicator: CustomDropdownIndicator
              }}
              className="time-select"
              classNamePrefix="time-select"
            />
          </div>
        </div>

        {(serverErrors.start || serverErrors.end) &&
          <div className="event-modal__error-wrap">
            <div className="event-modal__error event-modal__error--event-time">
              {serverErrors.start ? serverErrors.start : serverErrors.end}
            </div>
          </div>
        }
      </div>

      <div className="event-modal__field event-modal__field--unavailable">
        <span>Unavailable</span>

        <Toggle
          name="unavailable"
          active={!isAvailable}
          onToggle={toggleIsAvailable}
        />
      </div>

      <div className="event-modal__field event-modal__field--agency">
        <label className="label label--optional">Choose agency</label>

        <Select
          value={agency}
          defaultValue={defaultAgency}
          maxMenuHeight={MAX_MENU_HEIGHT}
          options={[defaultAgency, ...agenciesList]}
          onChange={(value) => value && setAgency(value)}
          components={{
            IndicatorSeparator: null,
          }}
          className="agency-select"
          classNamePrefix="agency-select"
        />
      </div>

      <div className="event-modal__field event-modal__field--description">
        <label className="label label--optional">Description</label>

        <textarea 
          className="event-modal__textarea textarea input"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {serverErrors.general &&
        <div className="event-modal__error-wrap">
          <div className="event-modal__error event-modal__error--general">
            {serverErrors.general}
          </div>
        </div>
      }

      <div className="event-modal__btns">
        {event &&
          <button
            type="button"
            className="event-modal__delete-btn"
            onClick={handleDeleteBtnClick}
          >
            <TrashIcon className="event-modal__delete-icon" />
          </button>
        }

        <button
          type="button"
          className="event-modal__cancel-btn btn btn--cancel"
          onClick={() => {
            !props.pending && props.closeModal();
          }}
        >
          Cancel
        </button>

        <AsyncBtn
          type="button"
          className="event-modal__save-btn btn btn--success"
          spinnerSize="18px"
          onClick={onSubmit}
          pending={pending}
        >
          Save
        </AsyncBtn>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  openModal,
  addEvent,
  updateEvent,
}

export default connect(null, mapDispatchToProps)(EventModal);
