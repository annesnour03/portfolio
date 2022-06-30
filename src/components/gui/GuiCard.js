import React from 'react'

function Card(props) {
    return (
        <>
            <div className="single-card">
                {props.msg}
            </div>
        </>
    )
}

export default Card