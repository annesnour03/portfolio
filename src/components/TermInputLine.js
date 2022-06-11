import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { TermExecute, validateInput } from './TermExecute'

const ALL_INPUT = [
    "help",
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
    const [outputMessage, setOutputMessage] = useState("")
    const [readOnly, setReadOnly] = useState(false)


    const validateInput = (input) => {
        const inputString = input.target.value;
        const trimmedInputString = inputString.trim();
        console.log(inputString);

        // Case of empty input, or all spaces --> caret white.

        if (!(ALL_INPUT.includes(trimmedInputString.split(' ')[0])) && trimmedInputString) {
            input.target.style = "color:red;"
            return false
        }

        input.target.style = "color:white;"
        if (input.key == 'Enter') {
            run(trimmedInputString.split(' '))
        }
        return true
    }

    const run = (args) => {
        const command = args[0]
        switch (command) {
            case "help":
                console.log("help");
                props.change()
                setReadOnly(true)
                setOutputMessage(<p>{"This is the help message"}</p>)
                break

            // Simply enter or spaces.
            case "":
                props.change()
                break
        }
    }
    function output() {
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
                        <input disabled={readOnly} type="text" className="term-input" autoComplete='off' autoCapitalize='off' spellCheck='false' autoCorrect='off' onChangeCapture={validateInput} onKeyDown={validateInput} autoFocus />
                    </span>
                </span>
                <div className='margin-0 selectable'>
                    {outputMessage}

                </div>
            </>
        )
    }
    return output()
}
export default TermInputLine
