import './CSS Files/checked.css';

function Checked ({undoneTasks, doneTasks, setTasks}) {
    return (
        <div className="checked">
            <h2 className="heading">Check completed tasks ✔</h2>

            <div className="uncompleted">
                <div className="todo-head">
                    <p className="undone">UNDONE</p>
                    <p className="undone-remaining">{undoneTasks.length} remaining</p>
                </div>
                {undoneTasks.length > 0 ? (
                    undoneTasks.map((task) => {
                        return (
                            <div className="undone-task" key={task.id}>
                                <p className="name">{task.name}</p>
                                <p className="date">{task.realDate}</p>
                                <button className="done" onClick={() => {
                                    setTasks(prevTasks => 
                                        prevTasks.map(t => 
                                            t === task ? {...t, done: true} : t
                                        )
                                    );
                                }}>Done</button>
                            </div>
                        )
                    })
                ) : (
                    <p className="all-done">All caught up!</p>
                )}
            </div>

            <hr />

            {doneTasks.length > 0 && (
                <div className="completed">
                    <button className="clear-completed" onClick={() => {
                        setTasks(prevTasks => prevTasks.filter(task => !doneTasks.some(doneTask => doneTask.id === task.id)));
                    }}>
                        Clear Completed Tasks
                    </button>
                    <div className="completed-head">
                        <p className="label">COMPLETED</p>
                        <p className="value">{doneTasks.length} done</p>
                    </div>

                    {doneTasks.map((task) => {
                        return (
                            <div className="done-task" key={task.id}>
                                <p className="name">{task.name}</p>
                                <p className="date">{task.realDate}</p>
                                <button className="undo" onClick={() => {
                                    setTasks(prevTasks => 
                                        prevTasks.map(t => 
                                            t === task ? {...t, done: false} : t
                                        )
                                    );
                                }}>Undo</button>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    );
}

export default Checked;