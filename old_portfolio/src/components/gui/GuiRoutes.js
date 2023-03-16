import React from 'react'
import Gui from './Gui'
import Games from './GuiGames'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Handler() {
  return (
    <>
          <Routes>
              <Route exact path='*' element={<Gui />}></Route>
          </Routes>

    </>
  )
}

export default Handler