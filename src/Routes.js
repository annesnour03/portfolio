import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


/**
 * Import all page components here
 */
import Term from './components/term/Term';
import Gui from './components/Gui';
import GameofLife from './components/gameoflife/GameofLife';
function Paths() {
    return (
        <div>
        <Router>
            <Routes>
                <Route exact path='/' element={<Term/>}></Route>
                <Route exact path='/gui' element={<Gui/>}></Route>
                    <Route exact path='/gol' element={<GameofLife/>}></Route>
            </Routes>
        </Router>
        </div>
    );
    
}
/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default Paths