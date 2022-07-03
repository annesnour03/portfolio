import React from 'react'

function Card(props) {
    const {msg} =props
    return (
        <>
            <div className="single-card">
                {msg}
            </div>
        </>
    )
}

export default Card