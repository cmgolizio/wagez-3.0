"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";

import { AppContext } from "@/context/AppContext";

const Display = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { values } = useContext(AppContext);
  const { display } = values;
  const { value } = display;
  const { shiftTime, breakTime, totalTime, earned } = value;

  const setDataId = (dataTitle) => {
    if (!breakTime) {
      switch (dataTitle) {
        case "worked":
          return "first";
        case "earned":
          return "second";
        default:
          return "";
      }
    } else {
      switch (dataTitle) {
        case "total":
          return "first";
        case "break":
          return "second";
        case "worked":
          return "third";
        case "earned":
          return "fourth";
        default:
          return "";
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    console.log("VALUES FROM Display >>>>>>>>>> ", display);
  }, [display]);

  if (!isMounted) {
    return null;
  }
  return (
    <div className='h-full w-full grid grid-cols-2 grid-rows-4 content-center justify-start text-[#16161D] text-3xl pt-20 pl-4'>
      {breakTime && (
        <h1
          className='justify-self-end col-start-1 row-start-1 text-[#16161D] mr-3'
          id={setDataId("total")}
        >
          {"Shift: "}
        </h1>
      )}
      {breakTime && (
        <h1
          className='justify-self-end col-start-1 row-start-2 text-[#16161D] mr-3'
          id={setDataId("break")}
        >
          {"Break: "}
        </h1>
      )}
      <h1
        className='justify-self-end col-start-1 row-start-3 text-[#16161D] mr-3'
        id={setDataId("worked")}
      >
        {"Worked: "}
      </h1>
      <h1
        className='justify-self-end col-start-1 row-start-4 text-[#16161D] mr-3'
        id={setDataId("earned")}
      >
        {"Earned: "}
      </h1>

      {breakTime && (
        <h1
          className='col-start-2 row-start-1 text-[#6cf58e]'
          id={setDataId("total")}
        >
          {shiftTime}
        </h1>
      )}
      <h1
        className='col-start-2 row-start-2 text-[#6cf58e]'
        id={setDataId("break")}
      >
        {breakTime}
      </h1>
      <h1
        className='col-start-2 row-start-3 text-[#6cf58e]'
        id={setDataId("worked")}
      >
        {totalTime}
      </h1>
      <h1
        className='col-start-2 row-start-4 text-[#6cf58e]'
        id={setDataId("earned")}
      >{`$${earned}`}</h1>
    </div>
  );
};

export default Display;
