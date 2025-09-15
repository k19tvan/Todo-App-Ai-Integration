import React, { useState } from 'react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const EditTask = ({ key, id, editTask, originalTask}) => {
    const [value, setValue] = useState("");

    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        editTask(id, value)
    } else if (e.key === "Escape") {
        setIsInput(false);
    }
    };

    const handleBlur = () => {
      editTask(id, originalTask);
    };

  return (
    <div className='px-40 mt-3'>
      <div className="flex items-center w-full p-4 bg-green-700 border rounded-lg border-white">
        <input 
            type="text" 
            placeholder="Edit task..." 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
            className='flex-grow font-semibold text-white'
        />
      </div>
    </div>
  );
};

export default EditTask;
