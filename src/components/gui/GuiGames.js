import React from 'react'
import Gui from './Gui'
import Sidenav from './GuiSidenav'


import Icon from '../../assets/searchIcon.png'
export default function Games() {
  return (
    <>
      <div className="search">
        <div className="search-bar-wrapper">

          <input className='search-input' placeholder='Search for a utility' />

          {/* TODO make the searchicon white instead of black */}
          <img src={Icon} className="search-icon" alt="" />
        </div>
      </div>

      <div className="all-cards">


        <div className="card">
          <p>hi im a card</p>
        </div>


      </div>
    </>
  )
}
