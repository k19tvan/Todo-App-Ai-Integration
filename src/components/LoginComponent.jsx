import React, { useState } from 'react'

const LoginComponent = ({ changeState, signIn }) => {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault() 
    signIn(identifier, password) 
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-green-950">
      <div className="bg-black/70 w-[420px] rounded-2xl p-8 shadow-[0_0_25px_#22c55e,0_0_50px_#22c55e,0_0_100px_#22c55e] flex flex-col items-center border border-green-600/40 backdrop-blur-md">
        
        <h1 
          className="text-4xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_#22c55e]" 
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          LOGIN
        </h1>
        <div className="w-2/3 h-1 mt-3 rounded-full bg-gradient-to-r from-green-400 via-green-600 to-green-800 shadow-[0_0_15px_#22c55e]" />

        <form onSubmit={handleSubmit} className="mt-8 w-full flex flex-col">
          <label className="text-white text-sm font-mono mb-1 ml-1">Username / Email</label>
          <input 
            className="w-full px-4 py-2 rounded-lg bg-black/60 border border-green-500/60 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-green-700" 
            type="text" 
            placeholder="Enter your username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <label className="text-white text-sm font-mono mb-1 ml-1 mt-6">Password</label>
          <input 
            className="w-full px-4 py-2 rounded-lg bg-black/60 border border-green-500/60 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-green-700" 
            type="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
            type="submit"
            className="mt-8 w-full py-3 bg-gradient-to-r from-green-400 to-green-600 rounded-lg font-bold text-white shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          Don’t have an account? 
          <button 
            className="text-green-400 hover:underline cursor-pointer ml-1"
            onClick={changeState}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginComponent
