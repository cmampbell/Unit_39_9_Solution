import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import Card from './Card'

const CardPile = () => {
    const [deckID, setDeckID] = useState('');
    const [cards, setCards] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false)
    const timerId = useRef()

    if(cards.length === 52 && isDrawing) {
        setIsDrawing(() => false)
        alert('No more cards in the deck!')
    }

    useEffect(() => {
        async function getDeckID() {
            try {
                const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
                setDeckID(resp.data.deck_id)
            } catch (e) {
                throw new Error('There was a problem requesting a new deck')
            }
        }
        getDeckID()
    }, [])

    const drawCard = async () => {
            try {
                const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
                const { image, value, suit } = resp.data.cards[0]
                const rotate = `${Math.random() * 180}deg`
                setCards((cards) => [...cards, { image, value, suit, rotate }])
            } catch (e) {
                throw new Error('There was a problem requesting the next card')
            }
        }

    useEffect(() => {
        if (isDrawing) timerId.current = setInterval(() => drawCard(), 1000)

        return function () {
            clearInterval(timerId.current)
        }
    }, [isDrawing])

    return <div>
        {isDrawing ? <button onClick={() => setIsDrawing(false)}> Stop Drawing</button> : <button onClick={() => setIsDrawing(true)}>Start drawing</button>}
        {cards.map(({ image, value, suit, rotate }) => <Card key={uuid()} image={image} value={value} suit={suit} rotate={rotate} />)}
    </div>
}

export default CardPile;