import React from 'react'
import unfilledStar from '../../assets/star_unfilled.svg'
import filledStar from '../../assets/star_filled.svg'
function Card(props) {
    const { msg } = props
    return (
        <>
            <div className="single-card">
                <img src={require('../../assets/prev_spin.png')} alt="" className="preview" />
                <hr></hr>

                <div className="title-container">
                    <p className='card-title'>Spin the wheel! {msg}</p>

                    <img src={unfilledStar}
                     className="star" />
                </div>
            </div>
        </>
    )
}

export default Card