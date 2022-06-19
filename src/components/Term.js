import { useEffect, useState } from 'react';
import { asciiAnnes } from '../assets/jsxElements';
import './../index.css';
import FloatGui from './FloatGui';
import TermInputLine from './TermInputLine';

const FORWARDS = 1
const BACKWARDS = -1
var key = 0
function Term() {
	const [historyIndex, setHistoryIndex] = useState(0)
	const [history, setHistory] = useState([])

	useEffect(() => {
		if (key) {
			key += 1
			appendInput()
		}
	}, [history])

	var params = {
		clear: clearHistory,
		addHistory: addHistory,
		setHistoryIndex: changeHistoryIndex,
		"history": history,

	}
	const [input, setInput] = useState([<TermInputLine params={params} key={key} />])

	// Used after enter has been pressed (valid command neeeded).
	function appendInput() {

		setInput(input => [...input, <TermInputLine params={params} key={key} />])
	}

	// Used for the "clear" command
	function clearHistory() {
		setInput([])

	}

	// Adds command it to a invisible history
	function addHistory(command) {
		if (!command) {
			appendInput()
		} else {
			if (history.at(-1) != command)
				setHistory(history => [...history, command])
			else
				appendInput()
		}
		key += 1

	}

	function changeHistoryIndex(direction) {
		if (direction == FORWARDS) {
			if (historyIndex != history.length)
				setHistoryIndex(historyIndex + 1)
		}
		else if (direction == BACKWARDS) {
			if (historyIndex > 0)
				setHistoryIndex(historyIndex - 1)
		}

	}




	return (
		<div >
			<div className="App">
				<header className="App-header">
					<div className="term-outline unselectable" id="outline">
						{/* <FloatGui linkto="/gui" /> */}
						<span className='signle-input'>

							<span className="static">
								<span className="term-initial unselectable">annes</span>
								<span className="term-initial unselectable" id="term-machine">@annes-Aspire-A715-74G</span>
								<span className="unselectable" >:</span>
								<span className="term-cwd unselectable" >/</span>
								<span className="unselectable dollar" >$</span>
							</span>
							<span className='input-line'>
								<input disabled={true} value={"welcome"} type="text" className="term-input" autoComplete='off' autoCapitalize='off' spellCheck='false' autoCorrect='off' autoFocus />
							</span>
						</span>
						<div className='margin-0 selectable' >
							{asciiAnnes}
							<br></br>
							<p>
								Hello my name is <a style={{ color: "#88f0fd" }}>Annes Negmel-Din</a> and this is my interactive portfolio.
							</p>
							<p>
								If you want to switch to GUI mode, enter "gui" or click on the floating button.
							</p>
							<p>
								To see all the commands, try "help"!
							</p>
						</div>
						{input}

					</div>
				</header>
			</div>
		</div>
	);

}

export default Term;
