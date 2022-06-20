import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
function GameofLife() {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const canvasRef = useRef(null)
    const outlineRef = useRef(null)
    
    const params = {
       width,
       height
        
    }
    useEffect(()=>{
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = 1
        ctx.fillStyle = '#000'
        
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    
        ctx.moveTo(0, 0);
        ctx.lineTo(10, 10);
        ctx.stroke();

    },[])

    useEffect(()=>{
        const handleResize = () =>{

            setWidth(outlineRef.current.clientWidth)
            setHeight(outlineRef.current.clientHeight)
        }
        window.addEventListener("resize", handleResize);

        
    })
    
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <div ref={outlineRef} className="term-outline unselectable" id="outline" style={{"padding-top" : "0"}}>
                        <canvas ref={canvasRef} {...params}></canvas>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default GameofLife