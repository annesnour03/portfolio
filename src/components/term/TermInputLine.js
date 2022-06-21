import React, { useEffect, useRef, useState } from 'react'
import TermHistory from './TermHistory'
import run from './TermExecute'

const ALL_INPUT = [
    "help",
    "welcome",
    "clear",
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
]

function TermInputLine(props) {
    props = props.params
    const [val, setVal] = useState("")
    const [currentHistoryIndex, setcurrentHistoryIndex] = useState(props.history?.length)
    const [outputMessage, setOutputMessage] = useState("")
    const [readOnly, setReadOnly] = useState(false)



    function prevHistory() {
        document.getElementById("input-line").focus()

        if (currentHistoryIndex > 0) {
            setcurrentHistoryIndex(currentHistoryIndex - 1)
            setVal(props.history[currentHistoryIndex - 1])
        }
    }

    function nextHistory() {
        document.getElementById("input-line").focus()
        if (currentHistoryIndex < props.history.length - 1) {
            setVal(props.history[currentHistoryIndex + 1])
            setcurrentHistoryIndex(currentHistoryIndex + 1)

        }
        else if (currentHistoryIndex == props.history.length - 1) {
            setVal("")
            setcurrentHistoryIndex(currentHistoryIndex + 1)
        }
    }

    const validateInput = (input) => {
        const inputString = input.target.value;
        const trimmedInputString = inputString.trim();

        // Handle case of history.
        const historyHandler = {
            'ArrowUp': prevHistory,
            'ArrowDown': nextHistory
        }[input.key]
        historyHandler?.()


        // Case of empty input, or all spaces --> caret white.
        if (!(ALL_INPUT.includes(trimmedInputString.split(' ')[0])) && trimmedInputString) {
            input.target.style = "color:red;"
            return false
        }

        input.target.style = "color:white;"
        if (input.key == 'Enter') {
            run(props, trimmedInputString.split(' '), setReadOnly, setOutputMessage)
            props.addHistory(inputString)
        }

        return true
    }


    // Make cursor not go to the start or end.
    window.addEventListener("keydown", function (e) {
        if (["ArrowUp", "ArrowDown",].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);


    return (
        <>
            <span className='signle-input'>

                <span className="static">
                    <span className="term-initial unselectable">annes</span>
                    <span className="term-initial unselectable" id="term-machine">@annes-Aspire-A715-74G</span>
                    <span className="unselectable" >:</span>
                    <span className="term-cwd unselectable" >/</span>
                    <span className="unselectable dollar" >$</span>
                </span>
                <span className='input-line'>
                    <input onBlur={({ target }) => target.focus()} onChange={e => setVal(e.target.value)} value={val} id="input-line" disabled={readOnly} type="text" className="term-input" autoComplete='off' autoCapitalize='off' spellCheck='false' autoCorrect='off' onChangeCapture={validateInput} onKeyDown={validateInput} autoFocus />
                </span>
            </span>
            <div className='margin-0 selectable'>
                {outputMessage}
            </div>
        </>
    )
}
export default TermInputLine
