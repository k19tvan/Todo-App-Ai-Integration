import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarComponent = ({ getSelectedDate, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(
    selectedDate || new Date() 
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleSelect = (day) => {
    if (!day) return;
    const newSelectedDate = new Date(year, month, day);
    getSelectedDate(newSelectedDate);
  };

  return (
    <div className="bg-black text-white rounded-lg p-4 shadow-lg border border-green-500 w-80">
      {/* header */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-700 rounded">
          ‹
        </button>
        <span className="text-lg font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-700 rounded">
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-green-400 mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
          <div key={day} className="font-semibold">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, idx) => {
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

          const isSelected =
            selectedDate &&
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();

          return (
            <div
              key={idx}
              onClick={() => handleSelect(day)}
              className={`p-2 rounded cursor-pointer transition
                ${day ? "hover:bg-green-600 hover:text-white" : "opacity-0 cursor-default"}
                ${isToday ? "border border-green-400" : ""}
                ${isSelected ? "bg-green-500 text-black font-bold" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarComponent;
