import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { TermExecute, validateInput } from './TermExecute'
var inputs = []
function TermInputLine(props) {
    const name = useRef(null)
    const device = useRef(null)
    const cwd = useRef(null)
    const input = useRef(null)



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
    ]

    const validateInput = (input) => {
        const inputString = input.target.value;
        const trimmedInputString = inputString.trim();

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
                console.log(props);

                break
        }
    }
    function output() {
        return (
            <>
                <span className='signle-input'>

                    <span className="static">
                        <span ref={name} className="term-initial unselectable">adawdwdwdwdawds</span>
                        <span ref={device} className="term-initial unselectable" id="term-machine">@ACER</span>
                        <span className="unselectable" >:</span>
                        <span ref={cwd} className="term-cwd unselectable" >/</span>
                    </span>
                    <span className='input-line'>
                        <input type="text" className="term-input" autoComplete='off' autoCapitalize='off' spellCheck='false' autoCorrect='off' onKeyUp={validateInput} autoFocus />
                    </span>
                </span>
                <br></br>
            </>
        )
    }
    return output()
}
export default TermInputLine
