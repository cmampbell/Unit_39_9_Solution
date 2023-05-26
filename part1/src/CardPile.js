import React, {useState, useEffect} from 'react'
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import Card from './Card'

const CardPile = () => {
    const [deckID, setDeckID] = useState('');
    const [cards, setCard] = useState([]);

    useEffect(()=> {
        async function getDeckID(){
            try{
            const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeckID(resp.data.deck_id)
            } catch(e){
                throw new Error('There was a problem requesting a new deck')
            }
        }
        getDeckID()
    }, [])

    const drawCard = async () => {
        if (cards.length === 52){
            alert('Error: no cards remaining!')
        } else {
            try{
                const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
                const { image, value, suit} = resp.data.cards[0]
                const rotate = `${Math.random() * 180}deg`
                setCard([...cards, {image, value, suit, rotate}])
            } catch (e){
                throw new Error('There was a problem requesting the next card')
            }
        }
    }

    return <div>
        <button onClick={drawCard}>Draw a card</button>
        {cards.map(({image, value, suit, rotate}) => <Card key={uuid()} image={image}  value={value} suit={suit} rotate={rotate}/>)}
    </div>
}

export default CardPile