
// ===== App.js =====
import './App.css'
import TodoWrapper from './components/TodoWrapper'
import Header from './components/Header'
import TimeShowing from './components/TimeShowing'
import React, { useState, useCallback } from 'react';
import Authentication from './components/Authentication';
import LandingPage from './components/LandingPage';
import { GoogleGenAI } from "@google/genai";

const aiAssistant = new GoogleGenAI({
  apiKey: "AIzaSyAfrv_kb_XLT9MTHgC1ZtcAgTva-O4OeFY"
});

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inLoginPage, setInLoginPage] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [inLandingPage, setInLandingPage] = useState(true);
  const [aiTasks, setAiTasks] = useState(null);

  const getResponse = useCallback(async (value) => {
    if (!value) return;

    console.log("Description:", value);
    console.time("AI Request");
    
    try {
      const response = await aiAssistant.models.generateContent({
        model: "gemini-2.5-pro",
        contents: `Create a schedule for this day based on this description in english (Not create new tasks): ${value}.
                Format your response as a JSON array with objects having these fields:
                - text: Task description
                - start_time: Start time in 24-hour format (HH:MM)
                - end_time: End time in 24-hour format (HH:MM)
                Example: [{"text":"Morning exercise","start_time":"07:00","end_time":"07:30"},{"text":"Breakfast","start_time":"07:45","end_time":"08:15"}]`,
        config: {
          thinkingConfig: {
            thinkingBudget: 128
          }
        }
      });

      console.timeEnd("AI Request");
      
      let responseText = response.text;
      console.log("Raw response from AI:", responseText);

      const jsonMatch = responseText.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        const parsedTasks = JSON.parse(jsonMatch[0]);
        setAiTasks(parsedTasks);
        return;
      }

      if (responseText.startsWith("```json")) {
        responseText = responseText.slice(7, -3);
      } else if (responseText.startsWith("```")) {
        responseText = responseText.slice(3, -3);
      }

      responseText = responseText.trim();
      const parsedTasks = JSON.parse(responseText);
      setAiTasks(parsedTasks);

    } catch (error) {
      console.error("Error fetching AI response or parsing JSON:", error);
    }
  }, []);

  const handleAiTasksProcessed = useCallback(() => {
    setAiTasks(null);
  }, []);

  const changeStateApp = useCallback((user) => {
    setCurrentUser(user);
    setInLoginPage(!inLoginPage);
  }, [inLoginPage]);

  const onLoginClick = useCallback(() => {
    setInLandingPage(!inLandingPage);
  }, [inLandingPage]);

  return (
    <div className='h-screen w-screen'>
      {inLandingPage ? (
        <LandingPage onLoginClick={onLoginClick}/>
      ) : inLoginPage ? (
        <Authentication changeStateApp={changeStateApp}/>
      ) : (
        <>
          <TimeShowing
            className="mt-6"
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            getResponse={getResponse}
          />
          <Header />
          <TodoWrapper
            selectedDate={selectedDate}
            user={currentUser}
            aiSuggestedTasks={aiTasks}
            onTasksProcessed={handleAiTasksProcessed}
          />
        </>
      )}
    </div>
  );
}

export default App;