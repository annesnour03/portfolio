import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


/**
 * Import all page components here
 */
import App from './components/Term';
import Gui from './components/Gui';

function Paths() {
    return (
        <div>
        <Router>
            <Routes>
                <Route exact path='/' element={<App/>}></Route>
                <Route exact path='/gui' element={<Gui/>}></Route>
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