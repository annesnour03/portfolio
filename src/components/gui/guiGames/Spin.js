import React, { useEffect, useReducer, useState } from 'react'
import { Wheel } from 'react-custom-roulette'


let beginData = [
]
export default () => {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [data, setData] = useState(beginData);
	// const [backgroundColor, setBackgroundColor] = useState(["white","grey"]);

	useEffect(() => {
		const textArea = document.getElementById("textarea-wheel")
		textArea.value = "yes\nno"
		setData([{ option: "yes" }, { option: "no" }])

	}, [])

	const handleSpinClick = () => {
		const newPrizeNumber = Math.floor(Math.random() * beginData.length)
		setPrizeNumber(newPrizeNumber)
		setMustSpin(true)
	}


	const reassignWheel = (e) => {
		// Get the values, filter out all the ''.
		const allValues = e.target.value.split("\n").filter((input) => input)
		var clean = []

		allValues.forEach(value => {
			clean.push({ option: value })
		});
		setData([...clean])
	}
	return (
		<>

			<div className="wheel-container">

				<div className="wheel" onClick={handleSpinClick}>
					<h1>Press on the wheel to spin!</h1>
					<Wheel
						mustStartSpinning={mustSpin}
						prizeNumber={prizeNumber}
						data={data}
						perpendicularText={true}
						spinDuration={0.4}
						// backgroundColors={backgroundColor}

						outerBorderColor={"#88f0fd"}
						radiusLineColor={"#6fc3ce"}

						onStopSpinning={() => {
							setMustSpin(false);
						}}
					/>
				</div>

				{/* <p>Winning : {prizeNumber}</p> */}
			</div>
			<div className="wheel-input-container">

				<div className="wheel-input">
					<h1>Enter your items here, seperated by a newline.</h1>
					<textarea id="textarea-wheel" type="text" placeholder='Enter your options here!' onKeyUp={reassignWheel} onChange={reassignWheel} />
					<button className="submit-options" >Save to history (no worky yet)</button>
				</div>
			</div>

		</>
	)
}