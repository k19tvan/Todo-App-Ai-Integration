import React from 'react';

const LandingPage = ({ onLoginClick }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-green-950 text-white">
      <div className="text-center flex flex-col items-center p-8">
        <h1 
          className="text-6xl md:text-8xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_#22c55e]" 
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          TODO APP
        </h1>

        <div className="w-2/3 h-1 mt-6 rounded-full bg-gradient-to-r from-green-400 via-green-600 to-green-800 shadow-[0_0_15px_#22c55e]" />
        <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl font-mono">
          Organize your digital life with the ultimate command-line inspired todo list. Stay productive, stay focused. 
        </p>

        <button 
          onClick={onLoginClick}
          className="mt-12 px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg font-bold text-white text-xl shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          LogIn To Start
        </button>

      </div>
    </div>
  );
}

export default LandingPage;