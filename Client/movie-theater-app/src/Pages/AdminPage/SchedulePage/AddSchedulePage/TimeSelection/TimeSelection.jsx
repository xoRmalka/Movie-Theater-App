import React from "react";
import { TimePicker } from "antd";
import formatDate from "../../../../../Utils/dateUtils";

export default function TimeSelection({ schedule, handleTimeChange }) {
  return (
    <>
      {schedule.movie_id && (
        <label>
          Time:{" "}
          <TimePicker
            name="date_time"
            onChange={handleTimeChange}
            format={"HH:mm"}
            minuteStep={10}
            hideDisabledOptions
            inputReadOnly
            disabledTime={() => {
              const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
              return {
                disabledHours,
              };
            }}
          />
        </label>
      )}
      <br />
      <br />
      {schedule.end_date && (
        <label>End time: {formatDate.formatDate(schedule.end_date)}</label>
      )}{" "}
      <br />
      <br />
    </>
  );
}
