import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './gui.css'
export default function Sidenav() {
    const [open, setOpen] = useState(true)
    const resizePX = 1600
    function collapseNav() {
        const sidenav = document.getElementById("sidenav")
        const home = document.getElementById("home")
        const allText = document.querySelectorAll(".sidenav p,h1")
        for (const elem of allText) {
            elem.style.display = "none"
        }
        sidenav.style.width = "auto"
        home.style.marginTop = "10vh"
        // TODO Add local storage here
    }

    function openNav() {
        const sidenav = document.getElementById("sidenav")
        const home = document.getElementById("home")
        const allText = document.querySelectorAll(".sidenav p,h1")
        for (const elem of allText) {
            elem.style.display = "block"
        }
        sidenav.style.width = "15vw"
        home.style.marginTop = "20px"
    }

    function changeNav() {
        if (open) {
            collapseNav()
            setOpen(false)
        }
        else if (window.innerWidth > resizePX)  {
            openNav()
            setOpen(true)
        }
    }
    

    const checkWidth = () => {
        if (window.innerWidth <= resizePX){
            setOpen(false)
            collapseNav()
        }
        // ! Maybe enable in the future, depends on likings.
        // else{
            // setOpen(true)
            // openNav()
        // }
    }
    useEffect(() => {
        window.addEventListener('resize', checkWidth);

        if (open) {
            localStorage.setItem("sidenav", 1)
        }
        else {
            localStorage.setItem("sidenav", 0)
        }

        return () => window.removeEventListener('resize', checkWidth);

    }, [open])


    return (
        <div className="sidenav" id='sidenav'>
            <div className="name"><p>annes</p></div>
            <div className="collapse" onClick={changeNav}>
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