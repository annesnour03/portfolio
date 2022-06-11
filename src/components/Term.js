import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import logo from '../assets/logo.svg';
import './../index.css';
import FloatGui from './FloatGui';
import TermInputLine from './TermInputLine';


const ALL_INPUT = [
	"help",
	"src",
	"ls",
	"cd",
	"whoami",
	"r6",
	"gui",
	"chess",
	"gol",
	"resume",
	"contact",
	"yassine",
	"easter-egg",
	"touch"
]

var key = 0
function Term() {
	const [input, setInput] = useState([<TermInputLine change={wrapper} key={key} />])
	function wrapper() {
		key+=1
		setInput(input => [...input, <TermInputLine change={wrapper} key={key} />])
	}

	return (
		<div >
			<div className="App">
				<header className="App-header">
					<div className="term-outline unselectable" id="outline">
						<FloatGui linkto="/gui" />
						{input}
					</div>
				</header>
			</div>
		</div>
	);

}

export default Term;
