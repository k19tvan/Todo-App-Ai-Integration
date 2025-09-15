import React, { useState } from 'react'

const AddNewTodo = ({ addTodo, isStartAfterEnd }) => {
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const resetForm = () => {
    setValue("");
    setStartTime("");
    setEndTime("");
    setIsInput(false);
  };

  const handleAdd = () => {
    if (!startTime || !endTime || !value.trim()) {
      alert("Please fill in all fields!");
      return;
    }
    if (isStartAfterEnd(startTime, endTime)) {
      alert("Start time must be before End Time");
      return;
    }
    addTodo(value, startTime, endTime);
    resetForm();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
    else if (e.key === "Escape") resetForm();
  };

  const handleStartChange = (time) => {
    setStartTime(time);
    // Auto set end = start + 1h nếu chưa có end
    if (!endTime) {
      const [h, m] = time.split(":").map(Number);
      const newHour = (h + 1) % 24;
      const formatted = `${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      setEndTime(formatted);
    }
  };

  return (
    <div className="px-6 sm:px-16 md:px-32 lg:px-40 mt-12">
      {!isInput ? (
        <button
          onClick={() => setIsInput(true)}
          className="w-full py-4 font-bold text-white bg-gradient-to-r 
                     from-green-600 via-emerald-500 to-teal-400 
                     rounded-2xl shadow-lg hover:shadow-2xl 
                     hover:scale-[1.02] transition-all ease-in-out"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          + Add new task
        </button>
      ) : (
        <div className="flex gap-3 items-end" onKeyDown={handleKeyDown}>
          {/* Start */}
          <div className="flex flex-col w-[20%]">
            <label className="text-xs text-gray-400 mb-1">Start</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => handleStartChange(e.target.value)}
              className="input-task py-2 px-3 font-semibold border border-green-500 rounded-lg 
                         bg-black/40 backdrop-blur text-white focus:outline-none 
                         focus:border-emerald-400 transition-all duration-300 
                         [color-scheme:dark]"
              autoFocus
            />
          </div>

          {/* End */}
          <div className="flex flex-col w-[20%]">
            <label className="text-xs text-gray-400 mb-1">End</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input-task py-2 px-3 font-semibold border border-green-500 rounded-lg 
                         bg-black/40 backdrop-blur text-white focus:outline-none 
                         focus:border-emerald-400 transition-all duration-300 
                         [color-scheme:dark]"
            />
          </div>

          {/* Task */}
          <div className="flex flex-col flex-1">
            <label className="text-xs text-gray-400 mb-1">Task</label>
            <input
              type="text"
              placeholder="Add new todo..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input-task w-full py-2 px-3 font-semibold border border-green-500 rounded-lg 
                         bg-black/40 backdrop-blur text-white placeholder:text-gray-400 
                         focus:outline-none focus:border-emerald-400 transition-all duration-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="py-2 px-5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 
                         rounded-xl text-white font-bold shadow hover:shadow-lg 
                         transition-all duration-300"
            >
              Add
            </button>
            <button
              onClick={resetForm}
              className="py-2 px-4 bg-gray-600 rounded-xl text-white font-bold shadow hover:shadow-lg 
                         transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewTodo;
