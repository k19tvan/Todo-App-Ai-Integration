import React, { useState, useEffect, use } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import CalendarComponent from "./CalendarComponent";
import InputChat from "./InputChat";

const TimeShowing = ({ selectedDate, setSelectedDate, getResponse }) => {
  const [now, setNow] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);  
    setShowCalendar(false);
  };

  const onClickChat = () => {
    setIsInput(!isInput);
    onClickChatApp();
  }

  return (
    <div className="px-40 mt-3 flex flex-col items-start gap-3 relative w-full">
      <div className="flex items-center gap-3 w-full">
        <time dateTime={now.toISOString()} className="text-white border-2 px-4 h-10 flex items-center rounded"> 
          {now.toLocaleString()}
        </time>

        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="p-2 border rounded hover:bg-gray-700 "
          >
          <CalendarIcon className="h-6 w-6 text-white" />
        </button>

        <input
          type="text"
          placeholder="Schedule your day with AI..."
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onKeyDown={(e) => {
            switch(e.key) {
              case 'Enter':
                getResponse(value);
            }
          }}
          className="flex-1 h-10 px-4 rounded-lg border-2 border-gray-400 bg-gray-800 text-white focus:border-green-500 focus:outline-none placeholder-gray-400"
        />

      </div>

      {showCalendar && (
        <div className="absolute top-16 left-40 z-50">
          <CalendarComponent
            getSelectedDate={handleDateSelect}
            selectedDate={selectedDate}  
          />
        </div>
      )}
    </div>
  );
};

export default TimeShowing;
