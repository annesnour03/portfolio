import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import JSConfetti from 'js-confetti'

let beginData = []

export default () => {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [data, setData] = useState(beginData);
	const jsConfetti = new JSConfetti()

	useEffect(() => {
		const textArea = document.getElementById("textarea-wheel")
		textArea.value = "yes\nno"
		setData([{ option: "yes" }, { option: "no" }])

	}, [])

	const handleSpinClick = () => {
		const newPrizeNumber = Math.floor(Math.random() * data.length)
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

			<div className="spin-wrapper">
				{/* History tab */}
				<div className="spin-history">
					<h1 className='spin-title'>History</h1>
					<div className="spin-history-item">
						<div>
							item1
						</div>
						<span>
							item1
						</span>
						<span>
							item1
						</span>

					</div>

				</div>
				<div className="spin-center-container">
					{/* Spinner */}
					<div className="wheel-container">
						<div className="wheel" onClick={handleSpinClick}>
							<h1 className='spin-title'>Press on the wheel to spin!</h1>
							<Wheel
								mustStartSpinning={mustSpin}
								prizeNumber={prizeNumber}
								data={data}
								perpendicularText={true}
								spinDuration={0.4}

								outerBorderColor={"#88f0fd"}
								radiusLineColor={"#6fc3ce"}

								onStopSpinning={() => {
									jsConfetti.addConfetti({
										emojis: [data[prizeNumber].option],
										emojiSize: 100,
									})
									document.title = "Portfolio - " + data[prizeNumber].option
									setMustSpin(false)
								}}
							/>

						</div>
					</div>
					{/* Text box */}
					<div className="wheel-input-container">

						<div className="wheel-input">
							<h1 className='spin-title'>Enter your items here, seperated by a newline {prizeNumber}.</h1>
							<textarea id="textarea-wheel" type="text" placeholder='Enter your options here!' onKeyUp={reassignWheel} onChange={reassignWheel} />
							<button className="submit-options" >Save to history (no worky yet)</button>
						</div>
					</div>
				</div>

				{/* Settings */}
				<div className="spin-parameters">
					<h1 className='spin-title'>Parameters</h1>
				</div>
			</div>
			{/* History */}


			{/* <button onClick={()=>{
				const a=  document.getElementById("textarea-wheel")
				var event = new Event('keydown', { bubbles: true });
				a.value = "hi hi hi h ih ih ih\nhi\n"
				a.dispatchEvent(event)

				const allValues = a.value.split("\n").filter((input) => input)

				var clean = []

				allValues.forEach(value => {
					clean.push({ option: value })
				});
				setData([...clean])
			}}>testr</button> */}

		</>
	)
}