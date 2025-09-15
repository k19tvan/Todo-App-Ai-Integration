import React from 'react';

const InputChat = () => {
  return (
    <input
      type="text"
      placeholder="Schedule your day with AI..."
      className="flex-1 h-10 px-4 rounded-lg border-2 border-gray-400 bg-gray-800 text-white focus:border-green-500 focus:outline-none placeholder-gray-400"
    />
  );
};

export default InputChat;
