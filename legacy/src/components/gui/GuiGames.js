import React from 'react'


import Icon from '../../assets/searchIcon.png'
import Card from './GuiCard'
import spin from "../../assets/prev_spin.png"
export default function Games() {
	const ALL_UTILITY = [
		{
			title: "Spin the wheel",
			img: spin,
			link: "/gui/games/spin"
		}, {
			title: "Fillerboy 1",
			img: spin,
			link: "/gui/games/spin"
		}, {
			title: "Fillerboy 2",
			img: spin,
			link: "/gui/games/spin"
		}, {
			title: "Fillerboy 3",
			img: spin,
			link: "/gui/games/spin"
		}, {
			title: "Fillerboy 4",
			img: spin,
			link: "/gui/games/spin"
		}, {
			title: "Fillerboy 5",
			img: spin,
			link: "/gui/games/spin"
		},
	]

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
				{ALL_UTILITY.map((i, idx) => <Card {...i} id={idx + 1} />)}
			</div>
		</>
	)
}
