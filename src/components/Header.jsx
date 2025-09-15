import React from 'react'

const Header = () => {
  return (
    <header className="flex flex-col items-center mt-10 space-y-2">
      <h1
        className="text-5xl font-extrabold tracking-wide"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: "white",
          textShadow: `
            -2px 2px 4px #16a34a, 
            2px -2px 4px #16a34a, 
            0 0 10px #22c55e,      
            0 0 20px #22c55e, 
            0 0 40px #22c55e`
        }}
      >
        TODO APP
      </h1>
      <p className="text-lg text-white italic opacity-80">
        Manage your time efficiently
      </p>
      <div className="w-20 h-1 bg-green-500 rounded-full mt-2 shadow-lg shadow-green-500/50"></div>
    </header>
  )
}

export default Header
