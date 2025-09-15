import React from 'react';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';

const StatusItem = ({ icon: Icon, status_text, count }) => {
    return (
        <div className="relative w-full flex flex-col rounded-2xl overflow-hidden 
                        bg-gradient-to-b from-green-900/30 to-green-700/10 
                        border border-green-400/40 shadow-[0_0_15px_#00ff88aa] 
                        backdrop-blur-md p-4 hover:scale-105 transition-transform">
            <div className="flex items-center text-green-100">
                <Icon className="w-8 h-8 text-green-300 drop-shadow-[0_0_6px_#00ff88]" />
                <div className="flex flex-col ml-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    <p className="text-sm italic text-green-200">{status_text}</p>
                    <p className="text-2xl font-bold text-green-100 drop-shadow-[0_0_6px_#00ff88]">{count}</p>
                </div>
            </div>
        </div>
    )
}          

const StatusBar = ({ countCompleted, countPending, countOverdue, calCompletedRate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4 sm:px-8 md:px-12 lg:px-40">
      <StatusItem status_text={"Complete"} icon={CheckCircleIcon} count={countCompleted}/>
      <StatusItem status_text={"Pending"} icon={ClockIcon} count={countPending}/>
      <StatusItem status_text={"Overdue"} icon={XCircleIcon} count={countOverdue}/>
      <StatusItem status_text={"Complete Rate"} icon={ArrowPathIcon} count={`${(calCompletedRate * 100).toFixed(1)}%`}/>
    </div>
  )
}

export default StatusBar;
