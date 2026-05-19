import './CSS Files/Dashboard.css';

function Dashboard ({tasks, todayTasks, mostPressingTask, undoneTasks, upcomingTasks, overdueTasks}) {

    const easyTasks = undoneTasks.filter(task => task.difficulty === 'easy');
    const mediumTasks = undoneTasks.filter(task => task.difficulty === 'medium');
    const hardTasks = undoneTasks.filter(task => task.difficulty === 'hard');

    const date = new Date().toLocaleDateString(
        "en-US",
        {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            weekday:'long'
        }
    );

    const presentDate = new Date().toLocaleDateString(
        "en-US",
        {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            weekday:'short'
        }
    );

    return (
        <div className="dash">
            <h1>Assignment Dashboard</h1>
            <p className="date">{date}</p>

            <div className="today">
                <h2>📅 What's Due Today❓</h2>

               {
                todayTasks.length > 0 ? (
                    todayTasks.map((task) => {
                        return (
                            <div className='today-task' key={task.id}>
                                <div className="details">
                                    <p className='name'>{task.name}</p>
                                    <p className="time">🕗       {task.realTime}</p>
                                </div>
                                <p className={`difficulty ${task.difficulty}`}>{task.difficulty}</p>
                            </div>
                        )
                    })
                ) : (
                    <div>
                        <p className='circle-tick'>✅</p>
                        <p className='no-tasks'>No tasks due today.</p>
                    </div>
                )
               }
            </div>

            <div className="pressing">
               <h2>❕ Most Pressing Assignment</h2>
               <p className='name'>{mostPressingTask?.name}</p>
               <div className="details">
                    <p>📅 {mostPressingTask?.realDate}</p>
                   <p>🕗 {mostPressingTask?.realTime}</p>
                   <p className={`difficulty ${mostPressingTask?.difficulty}`}>{mostPressingTask?.difficulty}</p>
               </div>
               <p style={{ width: '40%', textAlign: 'center', fontFamily: 'monospace' }}>"{mostPressingTask?.details}"</p>
               <div className="time-remaining-div">
                   <p>Time Remaining</p>
                   <div className="clock">
                    <div className="unit">
                        <p className="value">{mostPressingTask?.daysLeft}</p>
                        <p className="label">Days</p>
                    </div>
                    <div className="unit">
                        <p className="value">{mostPressingTask?.hoursLeft}</p>
                        <p className="label">Hours</p>
                    </div>
                    <div className="unit">
                        <p className="value">{mostPressingTask?.minutesLeft}</p>
                        <p className="label">Minutes</p>
                    </div>
                    <div className="unit">
                        <p className="value">{mostPressingTask?.secondsLeft}</p>
                        <p className="label">Seconds</p>
                    </div>
                   </div>
               </div>
            </div>

            {upcomingTasks.length > 0 && (
                <div className="upcoming">
                    <h2>Upcoming Assignments</h2>
                    {upcomingTasks.map((task) => {
                        return(
                            <div className="task-div" key={task.id}>
                                <p className="name">⚪ {task.name}</p>
                                <p className="date">{task.realDate}</p>
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="overview">
                <h2>Tasks Overview</h2>
                <div className="total overview-item">
                    <p className='label'>Total Tasks</p>
                    <p className="value">{undoneTasks.length}</p>
                </div>
                <div className="easy overview-item">
                    <p className="label">Easy</p>
                    <p className="value">{easyTasks.length}</p>
                </div>
                <div className="medium overview-item">
                    <p className="label">Medium</p>
                    <p className="value">{mediumTasks.length}</p>
                </div>
                <div className="hard overview-item">
                    <p className="label">Hard</p>
                    <p className="value">{hardTasks.length}</p>
                </div>

                <hr />
                <div className="due-div">
                    <p className='due-label'>Due Today</p>
                    <p className='due-value'>{todayTasks.length}</p>
                </div>
            </div>

            <div className="overdue">
                <h2><span style={{color: 'red'}}>⚠</span> Overdue Tasks</h2>
                {overdueTasks.length > 0 ? (
                    overdueTasks.map((task) => {
                        return (
                            <div className="overdue-item" key={task.id}>
                                <p className='name'>{task.name}</p>
                                <p className='days-overdue'>{
                                        task.realDate === presentDate ? 'Recently overdue' : `${(task.daysLeft) * -1} day(s) overdue`
                                    }</p>
                            </div>
                        )
                    })
                ) : (
                    <p>No overdue tasks</p>
                )}
            </div>

        </div>
    )
}

export default Dashboard;