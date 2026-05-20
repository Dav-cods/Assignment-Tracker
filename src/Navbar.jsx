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
                    <li onClick={() => {setIsOpen(false)}}><Link to="/">Dashboard</Link></li>
                    <li onClick={() => {setIsOpen(false)}}><Link to="/create">New Assignment</Link></li>
                    <li onClick={() => {setIsOpen(false)}}><Link to="/checked">Completed Tasks✅❓</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;