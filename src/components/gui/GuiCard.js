import React from 'react'

function Card(props) {
    const { msg } = props
    return (
        <>
            <div className="single-card">
                <img src={require('../../assets/prev_spin.png')} alt="" className="preview" />
                <hr></hr>

                <div className="title-container">
                    <p className='card-title'>Spin the wheel! {msg}</p>

                    <img src={require('../../assets/star_unfilled.png')}
                     className="star" />
                </div>
            </div>
        </>
    )
}

export default Card