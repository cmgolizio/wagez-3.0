"use client";
import { useState } from "react";

import AppProvider from "@/context/AppContext";
import Form from "@/components/Form";
import Display from "@/components/Display";

export default function Home() {
  const [showDisplay, setShowDisplay] = useState(false);
  return (
    <main className='flex h-screen flex-col items-center justify-between py-12 px-12 overflow-hidden'>
      <AppProvider>
        {/* <div className='z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex'>
        HOME PAGE
      </div> */}

        {/* FORM CONTAINER */}
        {/* <div> */}
        <Form setShowDisplay={setShowDisplay} />
        {/* </div> */}
        {/* DISPLAY CONTAINER */}
        {/* <div> */}
        {showDisplay && <Display />}
        {/* </div> */}
      </AppProvider>
    </main>
  );
}
