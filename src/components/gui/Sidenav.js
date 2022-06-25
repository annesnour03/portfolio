import React from 'react'
import { Link } from 'react-router-dom'

import './gui.css'
export default function Sidenav() {
    return (
        <div className="sidenav">
            <div className="name"><p>Portfolio</p></div>

            <i class='bx bx-menu-alt-right'></i>

            <Link to='/gui'>
                <span style={{ "display": "block" }}>
                    <div className="option">
                        <i class='bx bx-home-alt-2' ></i>
                        <p>Homepage</p>
                    </div>
                </span>
            </Link>
            <Link to='/'>
                <span style={{ "display": "block" }}>
                    <div className="option" link>
                        <i class='bx bx-terminal' ></i>
                        <p>Terminal</p>
                    </div>
                </span>
            </Link>
            <Link to='/games'>
                <span style={{ "display": "block" }}>
                    <div className="option">
                        <i class='bx bxs-invader'></i>
                        <p>Minigames/utilities</p>
                    </div>
                </span>
            </Link>

        </div>
    )
}
