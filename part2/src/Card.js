import React from 'react'

const Card = ({ image, value, suit, rotate}) => {
    return <img src={image} alt={`${value} of ${suit}`} style={{rotate, position: 'absolute', top: '100px', left: '100px'}}/>
}

export default Card;