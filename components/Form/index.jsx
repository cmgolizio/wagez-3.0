"use client";
import React, { useContext, useEffect, useState, useMemo } from "react";

import { AppContext } from "@/context/AppContext";
import getTimeDiff from "@/utils/getTimeDiff";
import parseTime from "@/utils/parseTime";

const Form = ({ setShowDisplay }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [addBreak, setAddBreak] = useState(false);
  const [addShift, setAddShift] = useState(false);
  const { values } = useContext(AppContext);
  const { times, breakTimes, diff, hourly, day, week, display } = values;

  const handleToggleBreakTime = () => {
    return setAddBreak((prev) => {
      if (!prev) {
        return true;
      } else {
        breakTimes.breakTimesSetter({ breakStart: "", breakEnd: "" });
        return false;
      }
    });
  };

  const handleToggleAddShift = (e) => {
    e.preventDefault();

    return setAddShift((prev) => {
      if (!prev) {
        return true;
      } else {
        breakTimes.breakTimesSetter({ breakStart: "", breakEnd: "" });
        return false;
      }
    });
  };

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
    console.log("DAY OF SHIFT - FROM FORM: ", values.day.value);
  }, [values.day.value]);

  useEffect(() => {
    console.log("WEEK - FROM FORM: ", values.week.value);
  }, [values.week.value]);

  // useEffect(() => {
  //   console.log("VALUES - FROM FORM: ", values);
  // }, [values]);

  const handleCalculations = async (e) => {
    e.preventDefault();

    const calculatedDataObj = await getTimeDiff(values);
    const {
      shiftTimeLength,
      breakTimeLength,
      shiftMinusBreak,
      hourlyEarnings,
    } = calculatedDataObj;

    const newDiff = {
      shiftTimeLength: shiftTimeLength,
      breakTimeLength: breakTimeLength,
      shiftMinusBreak: shiftMinusBreak,
      earnings: hourlyEarnings,
    };

    const newDisplay = {
      shiftTime: parseTime(newDiff.shiftTimeLength),
      breakTime: parseTime(newDiff.breakTimeLength),
      totalTime: parseTime(newDiff.shiftMinusBreak),
      earned: hourlyEarnings,
    };

    display.displaySetter(newDisplay);
    setShowDisplay(true);
    return await diff.diffSetter(newDiff);
  };

  useEffect(() => {
    week.weekSetter({
      ...week.value,
      [day.value]: {
        data: diff?.value,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff.value]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <form
      className='text-gray-800 w-full flex flex-col justify-center items-center'
      onSubmit={(e) => handleCalculations(e)}
    >
      {/* Shift start and end times */}
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='w-full flex flex-row items-center justify-center'>
          <label htmlFor='start-time' className='text-[#f8f8f8] text-xl pr-3'>
            in:
          </label>
          <input
            className='rounded-xl pl-3 pr-2 py-2 opacity-90 ml-2 bg-[#b7ffc9]'
            // type='datetime-local'
            type='time'
            name='start-time'
            id='start-time'
            onChange={(e) =>
              times.timesSetter({
                ...times.value,
                startTime: e.target.value,
              })
            }
            value={times?.value?.startTime}
          />
        </div>
        <div className='w-full flex flex-row items-center justify-center mt-3'>
          <label htmlFor='end-time' className='text-[#f8f8f8] text-xl pr-2'>
            out:
          </label>
          <input
            className='rounded-xl pl-3 pr-2 py-2 opacity-90 bg-[#b7ffc9]'
            // type='datetime-local'
            type='time'
            name='end-time'
            id='end-time'
            onChange={(e) =>
              times.timesSetter({
                ...times.value,
                endTime: e.target.value,
              })
            }
            value={times?.value?.endTime}
          />
        </div>
        <div className='w-full flex flex-row items-center justify-center mt-3'>
          <label htmlFor='hourly-rate' className='text-[#f8f8f8] text-xl pr-2'>
            $/hour:
          </label>
          <input
            className='rounded-xl px-2 py-1 opacity-90 w-20 bg-[#b7ffc9]'
            name='hourly-rate'
            id='hourly-rate'
            type='number'
            onChange={(e) => hourly.hourlySetter(e.target.value)}
            value={hourly?.value}
            placeholder='$0'
          />
        </div>
      </div>

      {/* Break start and stop times */}
      {/* <div className='w-full flex flex-row justify-center justify-items-center content-center items-center scale-85 self-center mt-4'> */}
      <div className='w-full flex flex-row items-center justify-center mt-4'>
        <button
          className='text-md bg-[#34a56c] text-[#f8f8ff] rounded-full border border-gray-600 px-1.5 py-1 hover:scale-105 active:scale-100 w-fit mr-2'
          onClick={handleToggleBreakTime}
          name='break-toggle'
        >
          {addBreak ? "no break" : "+break"}
        </button>
        <button
          className='text-md ml-2 bg-[#34a56c] text-[#f8f8f8] rounded-full border border-gray-600 px-1.5 py-1 hover:scale-105 active:scale-100'
          name='shift-toggle'
          onClick={(e) => handleToggleAddShift(e)}
        >
          {addShift ? "no shifts" : "+shift"}
        </button>
      </div>
      {addBreak && (
        <div className='w-full flex flex-col justify-center items-center scale-85 self-center mt-4'>
          <div className='w-full flex flex-row items-center justify-center'>
            <label
              htmlFor='break-start'
              className='text-[#f8f8f8] text-xl pr-2'
            >
              start:
            </label>
            <input
              className='rounded-xl px-1 py-1 opacity-90 bg-[#b7ffc9]'
              name='break-start'
              id='break-start'
              type='time'
              onChange={(e) =>
                breakTimes.breakTimesSetter({
                  ...breakTimes.value,
                  breakStart: e.target.value,
                })
              }
              value={breakTimes?.value?.breakStart}
            />
          </div>
          <div className='w-full flex flex-row items-center justify-center mt-3'>
            <label htmlFor='break-end' className='text-[#f8f8f8] text-xl pr-2'>
              stop:
            </label>
            <input
              className='rounded-xl px-1 py-1 opacity-90 bg-[#b7ffc9]'
              name='break-end'
              id='break-end'
              type='time'
              onChange={(e) =>
                breakTimes.breakTimesSetter({
                  ...breakTimes.value,
                  breakEnd: e.target.value,
                })
              }
              value={breakTimes?.value?.breakEnd}
            />
          </div>
        </div>
      )}
      {addShift && (
        <div className='w-full flex flex-row items-center justify-center mt-3'>
          <input
            type='date'
            className='rounded-xl opacity-90 py-1 px-2 bg-[#b7ffc9]'
            onChange={(e) => day.daySetter(e.target.value)}
            value={day?.value}
          />
        </div>
      )}
      <button
        className='w-36 bg-[#43FFA1] rounded-lg my-4 py-2 hover:scale-110 active:scale-100 opacity-90 active:opacity-100'
        type='submit'
      >
        Do Math.
      </button>
    </form>
  );
};

export default Form;
