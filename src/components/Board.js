import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

const Board = (props) => {

  const [cardsList, setCardsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const BASE_URL = props.url;
  const CARDS_URL = props.url.replace('boards', 'cards')
  // useEffect to get cards
  useEffect(() => {
    axios.get(`${BASE_URL}${props.boardName}/cards`)
      .then( (response) => {
        // get list of cards
        const apiCardsList = response.data;
        setCardsList(apiCardsList);
      })
      .catch( (error) => {
        setErrorMessage(error.message);
        console.log(error.message);
      });
  },[]);

  // add a card to cardsList 
  const addCard = () => {

  }

  // delete a card from cardsList
  const deleteCard = (id) => {
    let newCardsList = [];
    for (const item of cardsList) {
      // cardsList is pulled from the API, meaning anything in cardsList should ideally have a matching id
      if(id === item.card.id) {
        axios.delete(`${CARDS_URL}/${id}`)
          // if successful, deleted, send confirmation to console
          .then((response) => {
            console.log(`Card ${id} successfully deleted`);
          })
          .catch((error) => {
            // don't add the card back in -- likely this card was deleted from the api after components mounted
            setErrorMessage([`Could not delete card ${id}.`]);
          });
      } else {
        newCardsList.push(item);
      }
    }

    setCardsList(newCardsList);
  }

  // for API data ONLY 
  const allCards = (cards, deleteCard) => {
    
    let cardsList = [];

    for(const item of cards) {
      cardsList.push(<Card id = {item.card.id} text={item.card.text} emojiText={item.card.emoji} deleteCard = {deleteCard}/>);
    }
    return cardsList;
  }

  // for error message
  const allErrors = (errorData) => {
    const errors = [];
    for(const error of errorData) {
      errors.push(<li>{error}</li>);
    }

    return errors;
  }

  return (
    <div>
      <article className = 'validation-errors-display'>
        <ul className = 'validation-errors-display__list'>
            {errorMessage ? allErrors(errorMessage) : ''}
        </ul>
      </article> 
      <NewCardForm url = {CARDS_URL} boardName = {props.boardName} addCard = {addCard}/>
      <section className = 'board'>
        {allCards(cardsList, deleteCard)}
      </section>
    </div>
  )
};
Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
