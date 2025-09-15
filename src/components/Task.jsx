import React from 'react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const Task = ({ id, text, isCompleted, toggleComplete, deleteTask, editTask, startTime, endTime }) => {
  return (
    <div className="px-6 sm:px-16 md:px-32 lg:px-40 mt-4">
      <div className="text-sm text-gray-300 mb-1" style={{ fontFamily: "sans-serif" }}>
        {startTime} - {endTime}
      </div>
      <div
        className={`flex items-center w-full p-4 rounded-2xl shadow-md backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.01] 
        ${!isCompleted
            ? 'bg-gradient-to-r from-green-600 to-emerald-500 border border-green-400'
            : 'bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600'
        }`}
      >
        <p
          onClick={() => toggleComplete(id)}
          className={`flex-grow font-semibold break-words min-w-0 cursor-pointer select-none transition-colors duration-300 
          ${isCompleted ? 'line-through text-gray-400' : 'text-white'}`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {text}
        </p>

        <ArchiveBoxXMarkIcon
          className="w-7 h-7 text-white/90 cursor-pointer mx-2 hover:text-red-400 transition-colors duration-300"
          onClick={() => deleteTask(id)}
        />
        <PencilSquareIcon
          className="w-7 h-7 text-white/90 cursor-pointer hover:text-yellow-300 transition-colors duration-300"
          onClick={() => editTask(id)}
        />
      </div>
    </div>
  );
};

export default Task;
