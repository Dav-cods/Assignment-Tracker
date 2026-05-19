import { useState } from 'react';
import { useEffect } from 'react';
import './CSS Files/Create.css';

function Create ({tasks, setTasks,}) {

    const [difficulty, setDifficulty] = useState('');
    const [name, setName] = useState('');
    const [date,setDate] = useState('');
    const [time, setTime] = useState('');
    const [details, setDetails] = useState('');
    const [error, setError] = useState('');

    const [created, setCreated] = useState(false);

    function AddTask () {
        if (name && difficulty && date && time) {

            const id = crypto.randomUUID();
            const due = new Date(`${date}T${time}`);
            const now = new Date();
            const diff = due - now;
            const totalSeconds = Math.floor(diff / 1000);
            const daysLeft = Math.floor(totalSeconds / (3600 * 24));
            const hoursLeft = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
            const secondsLeft = totalSeconds % 60;
            const realTime = new Date(`${date}T${time}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const realDate = new Date(`${date}T${time}`).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric', weekday:'short'});

            setTasks([...tasks, {id: id, name: name, difficulty: difficulty, date: date, time: time, realTime: realTime, realDate: realDate, details: details, due: due, diff: diff, daysLeft: daysLeft, hoursLeft: hoursLeft, minutesLeft: minutesLeft, secondsLeft: secondsLeft, done: false}]);
            setName('');
            setDifficulty('');
            setDate('');
            setTime('');
            setDetails('');

            setCreated(true);
            setTimeout(() => {
                setCreated(false);
            }, 2000);
        } else {
            setError('Please ensure you filled properly!');
            setTimeout(() => {
                setError('');
            }, 3000)
        }
    }

    return (
        <div className="create">
            <div className="card">
                <header>
                    <h1>Create New Assignment</h1>
                    <p>Fill in the details for your assignment</p>
                </header>

                <div className="input-div">
                    <p>Assignment Name</p>
                    <input type="text" placeholder='e.g., Data Structures Final Project' value={name}
                    onChange={(event) => {setName(event.target.value)}} />
                </div>
                <div className="time-div">
                    <div className="input-div">
                        <p>Due Date</p>
                        <input type="date" value={date} onChange={(event) => {setDate(event.target.value)}} />
                    </div>
                    <div className="input-div">
                        <p>Due Time</p>
                        <input type="time" value={time} onChange={(event) => {setTime(event.target.value)}} />
                    </div>
                </div>

                <p className='choose'>Choose assignment difficulty:</p>

                <div className="difficulty-div">
                    <button className={`green ${difficulty === 'easy' ? 'active' : ''}`}
                    onClick={() => {
                        if (difficulty === 'easy') {
                            setDifficulty('');
                        } else {
                            setDifficulty('easy');
                        }
                    }} type='button'>
                        <span>.</span><br />Easy
                    </button>

                    <button className={`yellow ${difficulty === 'medium' ? 'active' : ''}`}
                    onClick={() => {
                        if (difficulty === 'medium') {
                            setDifficulty('');
                        } else {
                            setDifficulty('medium');
                        }
                    }} type='button'>
                        <span>.</span><br />Medium
                    </button>

                    <button className={`red ${difficulty === 'hard' ? 'active' : ''}`}
                    onClick={() => {
                        if (difficulty === 'hard') {
                            setDifficulty('');
                        } else {
                            setDifficulty('hard')
                        }
                    }} type='button'>
                        <span>.</span><br />Hard
                    </button>
                </div>

                <div className="input-div">
                    <p>Assignment Explanation (optional)</p>
                    <textarea
                     placeholder='Describe the assignment details, requirements, and any important notes...' value={details} onChange={(event) => {setDetails(event.target.value)}}></textarea>
                    <span className="help">
                        Provide clear details to help you remember what needs to be done 
                    </span>
                </div>

                <div className="create-btn-div">
                    <button onClick={AddTask} className="create-btn" type='button'>
                        {created ? 'Created!' : 'Create Assignment'}
                    </button>
                </div>

                {error && (
                    <p className="error">{error}</p>
                )}

                <p className="track">
                    Track your assignments and stay organized throughout the semester ✔
                </p>

            </div>
        </div>
    )
}

export default Create;