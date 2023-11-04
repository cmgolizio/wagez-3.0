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
        timesSetter(times) {
          return setShiftTimes(times);
        },
      },
      breakTimes: {
        value: breakTime,
        breakTimesSetter(times) {
          return setBreakTime(times);
        },
      },
      diff: {
        value: timeDiff,
        diffSetter(times) {
          return setTimeDiff(times);
        },
      },
      hourly: {
        value: hourlyRate,
        hourlySetter(rate) {
          return setHourlyRate(rate);
        },
      },
      day: {
        value: dayOfWeek,
        daySetter(day) {
          return setDayOfWeek(day);
        },
      },
      week: {
        value: week,
        weekSetter(week) {
          return setDayOfWeek(week);
        },
      },
      display: {
        value: displayData,
        displaySetter(data) {
          return setDisplayData(data);
        },
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
