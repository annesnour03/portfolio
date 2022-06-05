import React, { useEffect, useRef } from 'react'

function TermInputLine() {
    const name = useRef(null)
    const device = useRef(null)
    const cwd = useRef(null)
    const input = useRef(null)

    useEffect(() => {
        const nameLength = name.current.innerHTML.length
        const deviceLength = device.current.innerHTML.length
        const cwdLength = cwd.current.innerHTML.length
        input.current.style.width = `${8 * (nameLength + deviceLength + cwdLength + 2)}px;`
        console.log(input.current.style.width)
    })
    return (
        <>
        <span  className='signle-input'>

            <span className="static">
                <span ref={name} className="term-initial unselectable">adawdwdwdwdawds</span>
                <span ref={device} className="term-initial unselectable" id="term-machine">@ACER</span>
                <span className="unselectable" >:</span>
                <span ref={cwd} className="term-cwd unselectable" >/</span>
            </span>
            <span className='input-line'>
                <input ref={input} type="text" className="term-input" autoFocus />
            </span>
        </span>
            <br></br>
        </>
    )
}
export default TermInputLine
