import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidenav from './GuiSidenav'
import Games from './GuiGames'

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
        container.style.marginLeft = "100px"

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
        container.style.marginLeft = "15vw"
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
        // }
    }
    useEffect(() => {
        window.addEventListener('resize', checkWidth);

        if (open)
            localStorage.setItem("sidenav", 1)
        else
            localStorage.setItem("sidenav", 0)


        return () => window.removeEventListener('resize', checkWidth);

    }, [open])

    return (
        <>
            <Sidenav change={changeNav} />
            <div className="container" id='container'>
                <Routes>
                    <Route exact path='/games' element={<Games />}></Route>
                </Routes>

            </div>
            {/* <FloatGui linkto="/"/> */}
        </>
    )
}
