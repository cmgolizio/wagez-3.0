"use client";
import React, { useState, createContext, useEffect, useMemo } from "react";

export const AppContext = createContext();

const initialShiftTimes = {
  startTime: "",
  endTime: "",
};

const initialBreakTimes = {
  breakStart: "",
  breakEnd: "",
};

const initialTime = {
  hours: 0,
  minutes: 0,
};

const initialDiff = {
  shiftTimeLength: initialTime,
  breakTimeLength: initialTime,
  shiftMinusBreak: initialTime,
  earnings: 0,
};

const initialDisplay = {
  shiftTime: initialTime,
  breakTime: initialTime,
  totalTime: initialTime,
  earned: 0,
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AppProvider = ({ children }) => {
  const [shiftTimes, setShiftTimes] = useState(initialShiftTimes);
  const [breakTime, setBreakTime] = useState(initialBreakTimes);
  const [timeDiff, setTimeDiff] = useState(initialDiff);
  const [hourlyRate, setHourlyRate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [week, setWeek] = useState({});
  const [displayData, setDisplayData] = useState(initialDisplay);

  const values = useMemo(() => {
    return {
      times: {
        value: shiftTimes,
        setter: setShiftTimes,
      },
      breakTimes: {
        value: breakTime,
        setter: setBreakTime,
      },
      diff: {
        value: timeDiff,
        setter: setTimeDiff,
      },
      hourly: {
        value: hourlyRate,
        setter: setHourlyRate,
      },
      day: {
        value: dayOfWeek,
        setter: setDayOfWeek,
      },
      week: {
        value: week,
        setter: setWeek,
      },
      display: {
        value: displayData,
        setter: setDisplayData,
      },
    };
  }, [
    breakTime,
    dayOfWeek,
    displayData,
    hourlyRate,
    shiftTimes,
    timeDiff,
    week,
  ]);

  // useEffect(() => {
  //   console.log("SHIFT TIMES: ", times);
  // }, [times]);

  // useEffect(() => {
  //   console.log("BREAK TIMES: ", breakTimes);
  // }, [breakTimes]);

  // useEffect(() => {
  //   console.log(hourly.value);
  // }, [hourly.value]);

  // useEffect(() => {
  //   console.log(diff.value);
  // }, [diff.value]);

  useEffect(() => {
    console.log("VALUES - APP CONTEXT: ", values);
  }, [values]);

  return (
    <AppContext.Provider value={{ values }}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
