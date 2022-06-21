import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../index.css'

// https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
function useWasSeen() {
    // to prevents runtime crash in IE, let's mark it true right away
    const [wasSeen, setWasSeen] = React.useState(
        typeof IntersectionObserver !== "function"
    );

    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current && !wasSeen) {
            const observer = new IntersectionObserver(
                ([entry]) => entry.isIntersecting && setWasSeen(true)
            );
            observer.observe(ref.current);
            return () => {
                observer.disconnect();
            };
        }
    }, [wasSeen]);
    return [wasSeen, ref];
}

function GameofLife() {
    const [dimensions, setDimensions] = useState({})
    const canvasRef = useRef(null)
    const [wasSeen, outlineRef] = useWasSeen()
    const STEP = 20

    const params = {
        width: dimensions.width,
        height: dimensions.height,

    }


    useEffect(() => {
        const resize = () => {
            setDimensions({ width: outlineRef.current.clientWidth, height: outlineRef.current.clientHeight })
        }

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    })

    useEffect(() => {
        setDimensions({
            width: outlineRef.current.clientWidth,
            height: outlineRef.current.clientHeight
        })
    }, [wasSeen])


    useEffect(() => {
        draw()
    }, [dimensions])

    function draw() {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')


        ctx.beginPath()
        // Create the vertical lines.
        for (let x = 0; x <= dimensions.width; x += STEP) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, dimensions.height);
        }
        ctx.lineWidth = 1
        ctx.fillStyle = '#000'
        ctx.stroke();

        // Create horizontal lines.

        for (let y = 0; y < dimensions.height; y += STEP) {
            ctx.moveTo(0,y)
            ctx.lineTo(dimensions.width,y)
            
        }
        ctx.lineWidth = 1
        ctx.fillStyle = '#000'
        ctx.stroke();


    }


    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <div ref={outlineRef} className="term-outline unselectable" id="outline" style={{ "paddingTop": "0" }}>
                        <canvas ref={canvasRef} {...params}></canvas>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default GameofLife