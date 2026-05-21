import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Create from './Create';
import Checked from './Checked';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [trashTasks, setTrashTasks] = useState([]);

  const presentDate = new Date().toLocaleDateString(
      "en-US",
      {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          weekday:'short'
      }
  );
  
  const undoneTasks = tasks.filter(task => task.done === false);
  const undoneNotOverdueTasks = undoneTasks.filter(task => task.daysLeft >= 0);
  const doneTasks = tasks.filter(task => task.done === true)
  const todayTasks = undoneTasks.filter(task => task.realDate === presentDate);
  const upcomingTasks = undoneTasks.filter(task => task.daysLeft > 0 && task.daysLeft < 7);
  const overdueTasks = undoneTasks.filter(task => task.diff < 0);

  const mostPressingTask = undoneNotOverdueTasks
  .slice()
  .sort((a, b) => new Date(a.due) - new Date(b.due))[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task => {

          if (!task.due) return task;

          const now = new Date();
          const diff = new Date(task.due) - now;

          const totalSeconds = Math.floor(diff / 1000);

          return {
            ...task,
            diff: diff,
            daysLeft: Math.floor(totalSeconds / (3600 * 24)),
            hoursLeft: Math.floor((totalSeconds % (3600 * 24)) / 3600),
            minutesLeft: Math.floor((totalSeconds % 3600) / 60),
            secondsLeft: totalSeconds % 60
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (doneTasks.length > 1000) {
      const excessTasks = doneTasks.slice(0, doneTasks.length - 1000);
      setTrashTasks(excessTasks);
      setTasks(prevTasks => prevTasks.filter(task => !excessTasks.includes(task)));
    }
  }, [doneTasks])

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} todayTasks={todayTasks} mostPressingTask={mostPressingTask} undoneTasks={undoneTasks} upcomingTasks={upcomingTasks} overdueTasks={overdueTasks} />} />

        <Route path="/create" element={<Create tasks={tasks} setTasks={setTasks} />} />

        <Route path="/checked" element={<Checked undoneTasks={undoneTasks} doneTasks={doneTasks} setTasks={setTasks} />} />
      </Routes>
    </Router>
  );
}

export default App;