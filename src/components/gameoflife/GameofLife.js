import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../../index.css'

// https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
function useWasSeen() {
    // to prevents runtime crash in IE, let's mark it true right away
    const [wasSeen, setWasSeen] = React.useState(
        typeof IntersectionObserver !== "function"
    )

    const ref = React.useRef(null)
    React.useEffect(() => {
        if (ref.current && !wasSeen) {
            const observer = new IntersectionObserver(
                ([entry]) => entry.isIntersecting && setWasSeen(true)
            );
            observer.observe(ref.current)
            return () => {
                observer.disconnect()
            }
        }
    }, [wasSeen])
    return [wasSeen, ref]
}

function GameofLife() {
    const [dimensions, setDimensions] = useState({})
    const canvasRef = useRef(null)
    const [wasSeen, outlineRef] = useWasSeen()

    const topLeft = { x: 0, y: 0 };  // holds top left of canvas in world coords.


    const STEP = 20

    const params = {
        width: dimensions.width,
        height: dimensions.height,
    }


    useEffect(() => {
        const resize = () => {
            setDimensions({ width: outlineRef.current.clientWidth, height: outlineRef.current.clientHeight })
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousedown", mouseEvents)
        // window.addEventListener("mousemove", mouseEvents)
        // ["mousedown", "mouseup", "mousemove"].forEach(name => window.addEventListener(name, mouseEvents));

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousedown", mouseEvents)
            window.removeEventListener("mousemove", mouseEvents)
        }
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
    function mouseEvents(e) {
        console.log(e);
        offset += 10
        draw()
    }
    var offset = 0
    function draw() {

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const panZoom = {
            x: 0,
            y: 0,
            scale: 1,
            apply() { ctx.setTransform(this.scale, 0, 0, this.scale, this.x, this.y) },
            scaleAt(x, y, sc) {  // x & y are screen coords, not world
                this.scale *= sc;
                this.x = x - (x - this.x) * sc;
                this.y = y - (y - this.y) * sc;
            },
            toWorld(x, y, point = {}) {   // converts from screen coords to world coords
                const inv = 1 / this.scale;
                point.x = (x - this.x) * inv;
                point.y = (y - this.y) * inv;
                return point;
            },
        }
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);


        ctx.beginPath()

        var gridScale = 25;
        var size = Math.max(dimensions.width, dimensions.height) / panZoom.scale + gridScale * 2;
        panZoom.toWorld(0, 0, topLeft);
        var x = Math.floor(topLeft.x / gridScale) * gridScale;
        var y = Math.floor(topLeft.y / gridScale) * gridScale;
        panZoom.apply();

        // Create the vertical lines.
        for (let i = 0; i < size; i += gridScale) {
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i, y + size);
            ctx.moveTo(x, y + i);
            ctx.lineTo(x + size, y + i);
        }
        ctx.lineWidth = 1
        ctx.fillStyle = '#000'
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.stroke()


    }


    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <div ref={outlineRef} className="term-outline unselectable" id="outline" style={{ "paddingTop": "0" }}>
                        <canvas id="canvas" ref={canvasRef} {...params}></canvas>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default GameofLife