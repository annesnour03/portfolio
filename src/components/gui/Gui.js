import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidenav from './GuiSidenav'
import Games from './GuiGames'
import Settings from './GuiSettings';

export default function Gui() {
    const [open, setOpen] = useState(true)
    const resizePX = 1600
    function collapseNav() {
        const sidenav = document.getElementById("sidenav")
        const home = document.getElementById("home")
        const allText = document.querySelectorAll(".sidenav p,h1")
        const container = document.getElementById("container")
        for (const elem of allText) {
            elem.style.display = "none"
        }
        sidenav.style.width = "auto"
        home.style.marginTop = "10vh"
        container.style.marginLeft = sidenav.offsetWidth + "px"


    }

    function openNav() {
        const sidenav = document.getElementById("sidenav")
        const home = document.getElementById("home")
        const allText = document.querySelectorAll(".sidenav p,h1")
        const container = document.getElementById("container")
        for (const elem of allText) {
            elem.style.display = "block"
        }
        sidenav.style.width = "15vw"
        home.style.marginTop = "20px"
        container.style.marginLeft = sidenav.offsetWidth + "px"
    }

    function changeNav() {
        if (open) {
            collapseNav()
            setOpen(false)
        }
        else if (window.innerWidth > resizePX) {
            openNav()
            setOpen(true)
        }
        const sidenav = document.getElementById("sidenav")
        const container = document.getElementById("container")
        container.style.marginLeft = sidenav.offsetWidth + "px"
    }


    const checkWidth = () => {


        if (window.innerWidth <= resizePX) {
            setOpen(false)
            collapseNav()
        }
        // ! Maybe enable in the future, depends on likings.
        // else{
        //     setOpen(true)
        //     openNav()
        // }3
        const sidenav = document.getElementById("sidenav")
        const container = document.getElementById("container")
        container.style.marginLeft = sidenav.offsetWidth + "px"
        console.log("resize", sidenav.offsetWidth + " " + container.style.marginLeft)
    }
    useEffect(() => {
        window.addEventListener('resize', checkWidth);

        console.log("first", open)
        // if (open)
        // localStorage.setItem("sidenav", 1)
        // else
        // localStorage.setItem("sidenav", 0)
        checkWidth()
        // openNav()
        // setOpen(true)


        // return () => window.removeEventListener('resize', checkWidth);

    }, [])

    return (
        <>
            <Sidenav change={changeNav} />
            <div className="container" id='container'>
                <Routes>
                    <Route exact path='/games' element={<Games />}></Route>
                    <Route exact path='/settings' element={<Settings />}></Route>
                </Routes>
            </div>
        </>
    )
}
