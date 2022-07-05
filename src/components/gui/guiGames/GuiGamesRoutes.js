import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Games from '../GuiGames'
import Spin from './Spin'

// https://HOST/gui/games/*
function GuiGamesRoutes() {
  return (
    <Routes>
      <Route exact path='/' element={<Games />}></Route>
      <Route exact path='/spin' element={<Spin />}></Route>
    </Routes>)
}

export default GuiGamesRoutes