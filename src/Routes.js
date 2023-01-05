import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


/**
 * Import all page components here
 */
import Term from './components/term/Term';
import GameofLife from './components/gameoflife/GameofLife';
import Handler from './components/gui/GuiRoutes';
import Birthday from './components/onepagers/Birthday';
import RouteExpo from './components/onepagers/RouteExpo';

function Paths() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/gui/*' element={<Handler />}></Route>
                    <Route exact path='/gol' element={<GameofLife />}></Route>
                    <Route exact path='/verjaardag' element={<Birthday />}></Route>
                    <Route exact path='/expo' element={<RouteExpo platform="android"/>}></Route>
                    <Route exact path='/expoios' element={<RouteExpo platform="ios"/>}></Route>
                    <Route exact path='/' element={<Term />}></Route>
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