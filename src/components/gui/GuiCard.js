import React from 'react'
import unfilledStar from '../../assets/star_unfilled.svg'
import filledStar from '../../assets/star_filled.svg'
import { useState } from 'react'
import { useEffect } from 'react'
function removeAllInstances(arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] === item) arr.splice(i, 1);
    }
}
function Card(props) {
    const { msg, id } = props

    var change = false
    var storage = JSON.parse(localStorage.getItem("fav")) || 0
    if (storage) {
        if (storage.includes(id)) {
            change = true
        }
    }
    console.log(change, id);
    const [fav, setFav] = useState(change)
    const addFav = () => {
        var storage = JSON.parse(localStorage.getItem("fav")) || 0

        // There already exists a entry for favorites.
        if (storage) {
            if (!storage.includes(id))
                storage.push(id)
            localStorage.setItem("fav", JSON.stringify(storage))

        }
        else {
            localStorage.setItem("fav", JSON.stringify([id]))
        }
    }

    const removeFav = () => {
        var storage = JSON.parse(localStorage.getItem("fav")) || 0
        if (storage) {
            if (storage.includes(id))
                removeAllInstances(storage, id)
            localStorage.setItem("fav", JSON.stringify(storage))

        }
    }

    const alterFav = () => {
        console.log(fav);
        if (fav) {
            removeFav()
            setFav(false)

        }
        else {
            addFav()
            setFav(true)
        }
    }

    return (
        <>
            <div className="single-card" id="card" style={{ order: fav ? -1 : "initial" }}>
                <img src={require('../../assets/prev_spin.png')} alt="" className="preview" />
                <hr></hr>

                <div className="title-container">
                    <p className='card-title'>Spin the wheel! {msg}</p>
                    <a onClick={alterFav} >
                        <img src={fav ? filledStar : unfilledStar} className="star" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Card