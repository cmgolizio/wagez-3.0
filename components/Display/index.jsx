"use client";
import React, { useState, useEffect, useContext } from "react";

import { AppContext } from "@/context/AppContext";
import parseTime from "@/utils/parseTime";

const Display = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { values } = useContext(AppContext);
  const { display } = values;
  const { value } = display;
  const { shiftTime, breakTime, totalTime, earned } = value;

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
      <h1 className='justify-self-end col-start-1 row-start-1 text-[#16161D] mr-3'>
        {"Worked: "}
      </h1>
      <h1 className='justify-self-end col-start-1 row-start-2 text-[#16161D] mr-3'>
        {"Earned: "}
      </h1>
      {breakTime && (
        <h1 className='justify-self-end col-start-1 row-start-3 text-[#16161D] mr-3'>
          {"Shift: "}
        </h1>
      )}
      {breakTime && (
        <h1 className='justify-self-end col-start-1 row-start-4 text-[#16161D] mr-3'>
          {"Break: "}
        </h1>
      )}

      <h1 className='col-start-2 row-start-1 text-[#6cf58e]'>{totalTime}</h1>
      <h1 className='col-start-2 row-start-2 text-[#6cf58e]'>{`$${earned}`}</h1>
      {breakTime && (
        <h1 className='col-start-2 row-start-3 text-[#6cf58e]'>{shiftTime}</h1>
      )}
      <h1 className='col-start-2 row-start-4 text-[#6cf58e]'>{breakTime}</h1>
    </div>
  );
};

export default Display;
