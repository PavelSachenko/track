import { useState, useRef, MutableRefObject, useMemo } from "react";
import Select, { IndicatorProps } from "react-select";

import API from "../../api/api";
import { ReactSelectOption, IAnyObject } from "../../interfaces/interfaces";
import { useDidMount } from "../../hooks";

import "./SettingsSchedule.scss";
import {
  IDay,
  IData,
  ModeType,
  modeOptions,
  DAYS_OF_WEEK,
} from "./SettingsSchedule.types";
import ReturnBtn from "../../components/ReturnBtn/ReturnBtn";
import Spinner from "../../components/Spinner/Spinner";
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";

const IS_HOUR_12 = true;
const MAX_MENU_HEIGHT = 200;
const ONE_HOUR_MS = 3600000;

const SettingsSchedule = () => {
  const fieldsRef = useRef({}) as MutableRefObject<IAnyObject>;

  const [pending, setPending] = useState(true);
  const [data, setData] = useState<IData>({
    mode: "every_day",
    timeData: {
      everydayWeekdays: [],
      custom: [],
    },
  });

  useDidMount(() => {
    API.getWorkTime()
      .then(({ data }) => {
        setData({
          mode: data.current_mode,
          timeData: {
            everydayWeekdays: [data.every_day_times],
            custom: data.custom_times,
          },
        });

        setPending(false);
      })
      .catch(console.error);
  });

  const timeOptions = useMemo(() => {
    let date = new Date().setHours(0, 0, 0, 0);
    let timeOptions: ReactSelectOption[] = [{ value: "None", label: "None" }];

    for (let i = 0; i < 24; i++) {
      const valueTime = new Date(date).toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const labelTime = new Date(date).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: IS_HOUR_12,
      });

      timeOptions.push({
        value: valueTime,
        label: labelTime,
      });

      date += 3600000;
    }

    timeOptions.push({ value: "24:00", label: "Midnight" });

    return timeOptions;
  }, []);

  const getIsOptionDisabled = (
    { value: toValue, label }: ReactSelectOption,
    index: number
  ) => {
    const fromValue = (
      data.mode === "custom"
        ? data.timeData.custom
        : data.timeData.everydayWeekdays
    )[index].from;

    const fromTimestamp = new Date().setHours(
      +fromValue.slice(0, 2),
      +fromValue.slice(3),
      0,
      0
    );
    const toTimestamp = new Date().setHours(
      +toValue.slice(0, 2),
      +toValue.slice(3),
      0,
      0
    );

    return fromTimestamp >= toTimestamp && label !== "24:00";
  };

  const onChangeModeHandler = (value: ModeType) => {
    if (data.mode === value) return;

    setData((prev) => ({ ...prev, mode: value }));

    const config = {
      mode: value,
      times:
        value === "custom"
          ? data.timeData.custom
          : data.timeData.everydayWeekdays[0],
    };

    API.setWorkTime(config)
      .then(({ data }) => {
        setData({
          mode: data.mode,
          timeData: {
            everydayWeekdays: [data.times_for_mode.everyday],
            custom: data.times_for_mode.custom,
          },
        });
      })
      .catch(console.error);
  };

  const onChangeTimeHandler = (
    value: string,
    index: number,
    type: "from" | "to"
  ) => {
    if (
      (data.mode === "custom"
        ? data.timeData.custom
        : data.timeData.everydayWeekdays)[index][type] === value
    )
      return;

    const getValues = (dayWorkTime: IDay, type: "from" | "to") => {
      if (type === "to") {
        return { ...dayWorkTime, to: value };
      } else {
        const fromTimestamp = new Date().setHours(
          +value.slice(0, 2),
          +value.slice(3),
          0,
          0
        );
        const toTimestamp = new Date().setHours(
          +dayWorkTime.to.slice(0, 2),
          +dayWorkTime.to.slice(3),
          0,
          0
        );

        // If "from" time is more than "to" - set "to" time one hour more than "from"
        if (fromTimestamp >= toTimestamp) {
          return {
            ...dayWorkTime,
            from: value,
            to: new Date(fromTimestamp + ONE_HOUR_MS).toLocaleString("us-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          };
        } else {
          return { ...dayWorkTime, from: value };
        }
      }
    };

    setData((prev) => {
      const updatedTimeData = { ...prev };

      const modeTimeData =
        data.mode === "custom"
          ? updatedTimeData.timeData.custom
          : updatedTimeData.timeData.everydayWeekdays;

      modeTimeData[index] = getValues(modeTimeData[index], type);

      return updatedTimeData;
    });

    const config = {
      mode: data.mode,
      times:
        data.mode === "custom"
          ? data.timeData.custom
          : data.timeData.everydayWeekdays[0],
    };

    API.setWorkTime(config)
      .then(({ data }) => {
        setData({
          mode: data.mode,
          timeData: {
            everydayWeekdays: [data.times_for_mode.everyday],
            custom: data.times_for_mode.custom,
          },
        });
      })
      .catch(console.error);
  };

  const isOpenMenuUp = (elem: HTMLDivElement) => {
    const windowHeight = window.innerHeight;
    const menuOffset = elem.getBoundingClientRect().bottom + MAX_MENU_HEIGHT;

    return menuOffset >= windowHeight - 95;
  };

  const getTimeSelectMenuStyle = (index: number) => ({
    menu: (provided: IAnyObject) => {
      const isMenuUp = isOpenMenuUp(fieldsRef.current[index]);

      return {
        ...provided,
        top: isMenuUp ? "auto" : provided.top,
        bottom: isMenuUp ? "100%" : provided.bottom,
      };
    },
  });

  const CustomDropdownIndicator = (
    props: IndicatorProps<ReactSelectOption, false>
  ) => (
    <div
      {...props.innerProps}
      className="time-select__indicator time-select__dropdown-indicator"
    >
      <ClockIcon />
    </div>
  );

  const getSelectValue = (timeOptions: ReactSelectOption[], value: string) => {
    return timeOptions.find(
      (option: ReactSelectOption) => option.value === value
    );
  };

  if (pending) {
    return (
      <div className="settings-schedule__spinner">
        <Spinner size="150px" />
      </div>
    );
  }

  return (
    <div className="settings-schedule">
      <div className="settings-schedule__header">
        <ReturnBtn route="/settings" />

        <h2 className="settings-schedule__title">Schedule</h2>
      </div>

      <div className="settings-schedule__main">
        <div className="settings-schedule__mode">
          <label className="label">Choose mode</label>

          <Select
            className="mode-select"
            classNamePrefix="mode-select"
            isSearchable={false}
            value={modeOptions[data.mode]}
            defaultValue={modeOptions.custom}
            options={Object.values(modeOptions)}
            onChange={(value) =>
              value && onChangeModeHandler(value.value as ModeType)
            }
            components={{
              IndicatorSeparator: null,
            }}
          />
        </div>

        <div className="settings-schedule__fields">
          {(data.mode === "custom"
            ? data.timeData.custom
            : data.timeData.everydayWeekdays
          ).map((day: IDay, index: number) => (
            <div
              key={day.day}
              className="settings-schedule__field"
              ref={(inst) => (fieldsRef.current[index] = inst)}
            >
              <div className="settings-schedule__field-wrap">
                <label className="label">
                  {data.mode !== "custom" ? "Start at" : DAYS_OF_WEEK[index]}
                </label>

                <Select
                  className="time-select"
                  classNamePrefix="time-select"
                  isSearchable={false}
                  options={timeOptions.slice(0, timeOptions.length - 1)}
                  defaultValue={timeOptions[17]}
                  maxMenuHeight={MAX_MENU_HEIGHT}
                  styles={getTimeSelectMenuStyle(index)}
                  value={getSelectValue(timeOptions, day.from)}
                  onChange={(value) =>
                    value && onChangeTimeHandler(value.value, index, "from")
                  }
                  components={{
                    IndicatorSeparator: null,
                    DropdownIndicator: CustomDropdownIndicator,
                  }}
                />
              </div>

              {(data.mode === "custom"
                ? data.timeData.custom
                : data.timeData.everydayWeekdays)[index].from !== "None" && (
                <>
                  <span className="settings-schedule__time-divider"></span>

                  <div className="settings-schedule__field-wrap">
                    {data.mode !== "custom" && (
                      <label className="label">Ends at</label>
                    )}

                    <Select
                      className="time-select"
                      classNamePrefix="time-select"
                      isSearchable={false}
                      options={timeOptions.slice(2)}
                      defaultValue={timeOptions[33]}
                      maxMenuHeight={MAX_MENU_HEIGHT}
                      styles={getTimeSelectMenuStyle(index)}
                      value={getSelectValue(timeOptions, day.to)}
                      onChange={(value) =>
                        value && onChangeTimeHandler(value.value, index, "to")
                      }
                      isOptionDisabled={(option) =>
                        getIsOptionDisabled(option, index)
                      }
                      components={{
                        IndicatorSeparator: null,
                        DropdownIndicator: CustomDropdownIndicator,
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSchedule;
