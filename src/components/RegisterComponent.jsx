import React, { useState } from 'react'

const RegisterComponent = ({ changeState, signUp }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // tránh reload trang
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    signUp(username, email, password)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-green-950">
      <div className="bg-black/70 w-[460px] rounded-2xl p-8 shadow-[0_0_25px_#22c55e,0_0_50px_#22c55e,0_0_100px_#22c55e] flex flex-col items-center border border-green-600/40 backdrop-blur-md">

        <h1 
          className="text-4xl font-extrabold text-green-400 tracking-wider drop-shadow-[0_0_15px_#22c55e]" 
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          REGISTER
        </h1>
        <div className="w-2/3 h-1 mt-3 rounded-full bg-gradient-to-r from-green-400 via-green-600 to-green-800 shadow-[0_0_15px_#22c55e]" />

        <form onSubmit={handleSubmit} className="w-full mt-8 flex flex-col items-center">
          <div className="w-full flex flex-col items-start mb-6">
            <label className="text-green-400 text-sm font-mono mb-1 ml-1">Username</label>
            <input 
              className="w-full px-4 py-2 rounded-lg bg-black/60 border border-green-500/60 text-green-100 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-green-700" 
              type="text" 
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col items-start mb-6">
            <label className="text-green-400 text-sm font-mono mb-1 ml-1">Email</label>
            <input 
              className="w-full px-4 py-2 rounded-lg bg-black/60 border border-green-500/60 text-green-100 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-green-700" 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col items-start mb-6">
            <label className="text-green-400 text-sm font-mono mb-1 ml-1">Password</label>
            <input 
              className="w-full px-4 py-2 rounded-lg bg-black/60 border border-green-500/60 text-green-100 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-green-700" 
              type="password" 
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col items-start mb-6">
            <label className="text-green-400 text-sm font-mono mb-1 ml-1">Confirm Password</label>
            <input 
              className="w-full px-4 py-2 rounded-lg bg-black/60 border border-green-500/60 text-green-100 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-green-700" 
              type="password" 
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-green-700 rounded-lg 
            font-bold text-black shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e] 
            hover:scale-105 transform transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          Already have an account? 
          <button 
            className="text-green-400 hover:underline cursor-pointer ml-1"
            onClick={changeState}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}

export default RegisterComponent
