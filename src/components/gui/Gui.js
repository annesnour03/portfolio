import React, { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";

import Sidenav from './GuiSidenav'
import GuiGamesRoutes from './guiGames/GuiGamesRoutes'
import Settings from './GuiSettings';

export default function Gui() {
    const [open, setOpen] = useState(true)
    const resizePX = 1600

    function collapseNav() {
        const sidenav = document.getElementById("sidenav")
        const home = document.getElementById("home")
        const allText = document.querySelectorAll(".sidenav p, .sidenav h1")
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
        const allText = document.querySelectorAll(".sidenav p, .sidenav h1")
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
    }
    useEffect(() => {
        window.addEventListener('resize', checkWidth);
        checkWidth()
        return () => window.removeEventListener('resize', checkWidth);

    }, [])

    window.onload = () => {
        const sidenav = document.getElementById("sidenav")
        const container = document.getElementById("container")
        container.style.marginLeft = sidenav.offsetWidth + "px"
    }
    return (
        <>
            <Sidenav change={changeNav} />
            <div className="container" id='container'>
                <Routes>
                    <Route exact path='/games/*' element={<GuiGamesRoutes />}></Route>
                    <Route exact path='/settings' element={<Settings />}></Route>
                </Routes>
            </div>
        </>
    )
}
