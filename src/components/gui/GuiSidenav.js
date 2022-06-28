import React from 'react'
import { Link } from 'react-router-dom'

import './gui.css'
export default function Sidenav(props) {

    return (
        <div className="sidenav" id='sidenav'>
            <div className="name"><p>annes</p></div>
            <div className="collapse" onClick={props.change}>
                <span style={{ "display": "block" }}>
                    <i className='bx bx-menu-alt-right'></i>
                </span>
            </div>

            <Link to='/gui'>
                <span style={{ "display": "block" }}>
                    <div className="option" id='home'>
                        <i className='bx bx-home-alt-2' ></i>
                        <p>Homepage</p>
                    </div>
                </span>
            </Link>
            <Link to='/'>
                <span style={{ "display": "block" }}>
                    <div className="option">
                        <i className='bx bx-terminal' ></i>
                        <p>Terminal</p>
                    </div>
                </span>
            </Link>
            <Link to='/games'>
                <span style={{ "display": "block" }}>
                    <div className="option">
                        <i className='bx bxs-invader'></i>
                        <p>Minigames</p>
                    </div>
                </span>
            </Link>

            <Link to='/settings'>
                <span style={{ "display": "block" }}>
                    <div className="option" id='contact'>
                        <i className='bx bx-cog'></i>
                        <p>Settings</p>
                    </div>
                </span>
            </Link>

        </div>
    )
}