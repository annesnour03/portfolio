import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Routes } from "react-router-dom";


/**
 * Import all page components here
 */
import Term from './components/term/Term';
import Gui from './components/gui/Gui';
import Games from './components/gui/Games';
import GameofLife from './components/gameoflife/GameofLife';
function Paths() {
    return (
        <div>
            <HashRouter basename='/porfolio'>
                
        <Router>
            <Routes>
                <Route exact path='/' element={<Term/>}></Route>
                <Route exact path='/gui' element={<Gui/>}></Route>
                <Route exact path='/gol' element={<GameofLife/>}></Route>
                <Route exact path='/games' element={<Games/>}></Route>
            </Routes>
        </Router>
            </HashRouter>

        </div>
    );
    
}
/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default Paths