import React from 'react'
import Gui from './Gui'
import Sidenav from './GuiSidenav'


import Icon from '../../assets/searchIcon.png'
import Card from './GuiCard'
export default function Games() {
	const ALL_CARDS = [1,2,3,4,5,6,7,8,9,10,11,12]
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

{ALL_CARDS.map((i) => <Card msg={i}/>)}


			</div>
		</>
	)
}
