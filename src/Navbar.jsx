import { useState } from "react";
import { Link } from "react-router-dom"
import './CSS Files/Navbar.css'

function Navbar () {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className="menu-btn" onClick={() => setIsOpen(true)}>
                ☰ 
            </button>
            <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                <div className="logo-div">
                    <p className="logo">Tracker</p>
                    <button onClick={() => {setIsOpen(false)}} className="close-btn">X</button>
                </div>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/create">New Assignment</Link></li>
                    <li><Link to="/checked">Completed Tasks✅❓</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;