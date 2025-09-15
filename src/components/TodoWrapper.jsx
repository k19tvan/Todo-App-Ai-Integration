import React, { useEffect, useState, useCallback, useMemo } from 'react'
import AddNewTodo from './AddNewTodo'
import Task from './Task'
import TodayTask from './TodayTask';
import EditTask from './EditTask';
import StatusBar from './StatusBar';
import { supabase } from './client'; 

const TodoWrapper = ({ selectedDate, user, aiSuggestedTasks, onTasksProcessed }) => {
  const [todos, setTodos] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const userId = useMemo(() => user?.id, [user?.id]);

  useEffect(() => {
    const fetchTodos = async() => {
      if (!userId) return;
      
      console.time("Fetch Todos");
      const {data, error} = await supabase.from('todos').select('*').eq('user_id', userId)
      console.timeEnd("Fetch Todos");
      
      if (error){
        console.error('Error fetching todos:', error);
        return;
      }
      if (data) setTodos(data);
    }

    fetchTodos();
  }, [userId]);

  const normalizeDate = useCallback((date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); 
    const day = ('0' + d.getDate()).slice(-2);      
    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    if (!aiSuggestedTasks || aiSuggestedTasks.length === 0 || isProcessing || !userId) {
      return;
    }

    const handleNewSchedule = async () => {
      console.time("AI Schedule Processing");
      setIsProcessing(true);

      try {
        const dateString = normalizeDate(selectedDate);
        console.log("Processing AI schedule for date:", dateString);

        const { error: deleteError } = await supabase
          .from('todos')
          .delete()
          .eq('user_id', userId)
          .eq('date', dateString);

        if (deleteError) {
          console.error('Error deleting todos for date:', deleteError.message);
          return;
        }

        console.log("Successfully deleted existing tasks");

        const todosToInsert = aiSuggestedTasks.map(todo => ({
          user_id: userId,
          text: todo.text,
          date: selectedDate,
          start_time: todo.start_time,
          end_time: todo.end_time,
          is_completed: false,
          is_editing: false
        }));

        console.time("Bulk Insert");
        const { data: newTodos, error: insertError } = await supabase
          .from('todos')
          .insert(todosToInsert)
          .select();
        console.timeEnd("Bulk Insert");

        if (insertError) {
          console.error('Error adding multiple todos:', insertError.message);
          return;
        }

        console.log(`Successfully inserted ${newTodos.length} new tasks`);

        setTodos(prev => {
          const otherDaysTodos = prev.filter(todo => 
            normalizeDate(todo.date) !== dateString
          );
          return [...otherDaysTodos, ...newTodos];
        });

      } catch (error) {
        console.error('Error in handleNewSchedule:', error);
      } finally {
        console.timeEnd("AI Schedule Processing");
        setIsProcessing(false);
        onTasksProcessed();
      }
    };

    handleNewSchedule();
  }, [aiSuggestedTasks, selectedDate, userId, normalizeDate, onTasksProcessed, isProcessing]);

  const todosForSelectedDate = useMemo(() => {
    if (!Array.isArray(todos)) return [];
    const selectedDateStr = normalizeDate(selectedDate);
    return todos.filter(todo => normalizeDate(todo.date) === selectedDateStr);
  }, [todos, selectedDate, normalizeDate]);

  const getTodosForSelectedDate = useCallback(() => {
    return todosForSelectedDate;
  }, [todosForSelectedDate]);

  const addTodo = useCallback(async (text, startTime, endTime) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    console.time("Add Single Todo");
    
    const {data, error} = await supabase.from('todos').insert([
      {
        user_id: userId,
        text: text,
        date: selectedDate,
        start_time: startTime,
        end_time: endTime,
        is_completed: false,
        is_editing: false
      }
    ]).select();

    console.timeEnd("Add Single Todo");

    if (error) {
      console.error('Error adding todo:', error.message);
      return;
    }

    if (data && data.length > 0) {
      setTodos(prev => [...prev, ...data]);
    }
  }, [userId, selectedDate]);

  const toggleComplete = useCallback(async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    console.time("Toggle Complete");
    const {data, error} = await supabase
      .from('todos')
      .update({is_completed: !todo.is_completed})
      .eq('id', id)
      .select();
    console.timeEnd("Toggle Complete");
      
    if (error) {
      console.error('Error toggling complete:', error.message);
      return;
    }
    
    if (data && data.length > 0) {
      setTodos(prev => prev.map(t => t.id === id ? data[0] : t));
    } else {
      setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, is_completed: !t.is_completed } : t
      ));
    }
  }, [todos]);
  
  const deleteTask = useCallback(async (id) => {
    console.time("Delete Task");
    const {error} = await supabase.from('todos').delete().eq('id', id);
    console.timeEnd("Delete Task");
    
    if (error) {
      console.error('Error deleting task:', error.message);
      return;
    }
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTask = useCallback(async (id, newTask) => {
    console.time("Edit Task");
    const {data, error} = await supabase
      .from('todos')
      .update({text: newTask})
      .eq('id', id)
      .select();
    console.timeEnd("Edit Task");
      
    if (error) {
      console.error('Error editing task:', error.message);
      return;
    }
    
    if (data && data.length > 0) {
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...data[0], is_editing: false } : todo
      ));
    } else {
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, text: newTask, is_editing: false } : todo
      ));
    }
  }, []);

  const updateIsEditing = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, is_editing: !todo.is_editing } : todo
    ));
  }, []);

  const countCompleted = useCallback(() => 
    getTodosForSelectedDate().filter(todo => todo.is_completed).length, 
    [getTodosForSelectedDate]
  );

  const countPending = useCallback(() => {
    return getTodosForSelectedDate().filter(todo => !todo.is_completed).length;
  }, [getTodosForSelectedDate]);


  const getTotalTasksForRate = useCallback(() => {
    return getTodosForSelectedDate().length;
  }, [getTodosForSelectedDate]);

  const calCompletedRate = useCallback(() => {
    const completed = countCompleted();
    const total = getTotalTasksForRate();
    return total > 0 ? completed / total : 0;
  }, [countCompleted, getTotalTasksForRate]);
  
  const parseTime = useCallback((timeString) => {
    if (!timeString) return new Date(8640000000000000); 
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }, []);

  const countOverdue = useCallback(() => {
    const now = new Date();
    const currentDate = normalizeDate(now);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return getTodosForSelectedDate().filter(todo => {
      if (todo.is_completed) return false; 
      const todoDate = normalizeDate(todo.date);
      if (todoDate < currentDate) return true;
      if (todoDate > currentDate) return false;
      if (!todo.end_time) return false;
      const [hours, minutes] = todo.end_time.split(":").map(Number);
      const taskEndTime = hours * 60 + minutes;
      return taskEndTime < currentMinutes;
    }).length;
  }, [getTodosForSelectedDate, normalizeDate]);
  
  const isStartAfterEnd = useCallback((start, end) => {
    if (!start || !end) return false;
    const startParseTime = parseTime(start);
    const endParseTime = parseTime(end);
    return startParseTime > endParseTime;
  }, [parseTime]);
  
  const sortTodos = useCallback((todos) => {
    return [...todos].sort((a, b) => {
      if (!a.start_time && !b.start_time) {
        return parseTime(a.end_time) - parseTime(b.end_time);
      }
      if (!a.start_time) return 1;
      if (!b.start_time) return -1;
      const startDiff = parseTime(a.start_time) - parseTime(b.start_time);
      if (startDiff !== 0) return startDiff;
      return parseTime(a.end_time) - parseTime(b.end_time);
    });
  }, [parseTime]);

  const sortedTodos = useMemo(() => {
    return sortTodos(getTodosForSelectedDate());
  }, [sortTodos, getTodosForSelectedDate]);

  return (
    <div>
      {isProcessing && (
        <div className="text-center py-2 text-blue-600 bg-blue-50 rounded-lg mx-4 mb-4">
          🤖 AI đang tạo lịch trình mới...
        </div>
      )}
                                                                                                         
      <StatusBar
        countCompleted={countCompleted()}
        countPending={countPending()}
        calCompletedRate={calCompletedRate()}
        countOverdue={countOverdue()}
      />

      <AddNewTodo addTodo={addTodo} isStartAfterEnd={isStartAfterEnd} />
      <TodayTask />
      {
        sortedTodos.map(task =>
          !task.is_editing ? (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              startTime={task.start_time}
              endTime={task.end_time}
              isCompleted={task.is_completed}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={updateIsEditing}
            />
          ) : (
            <EditTask
              key={task.id}
              id={task.id}
              editTask={editTask}
              originalTask={task.text}
              updateIsEditing={updateIsEditing} 
            />
          )
        )
      }
    </div>
  );
};

export default TodoWrapper;