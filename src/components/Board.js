import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import BoardList from './BoardList';
// import CARD_DATA from '../data/card-data.json';

const Board = (props) => {

  const [cardsList, setCardsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentBoard, updateBoard] = useState(props.boardName);

  const BASE_URL = props.url;
  const CARDS_URL = props.url.replace('boards', 'cards')

  // jest really didn't like when i wrapped this in useEffect, so i'm pulling board info here
  const [allBoards, updateBoards] = useState([]);
  
  useEffect(() => {
    axios.get(BASE_URL)
      .then( (response) => {
        // get list of boards
        updateBoards(response.data);
      })
      .catch( (error) => {
        setErrorMessage(['Failed to retrieve boards.']);
        console.log(error.message);
      });

      return (()=>{})
  }, [currentBoard, BASE_URL])

  // useEffect to get cards
  useEffect(() => {
    axios.get(`${BASE_URL}${currentBoard}/cards`)
      .then( (response) => {
        // get list of cards
        const apiCardsList = response.data;
        setCardsList(apiCardsList);
      })
      .catch( (error) => {
        setErrorMessage(['Failed to retrieve cards.']);
        console.log(error.message);
      });

    return (()=>{});
  },[currentBoard, BASE_URL]);

  // add a card to cardsList 
  const addCard = (card) => {
    const newCardList  = [...cardsList];
    const post = {text: card.text, emoji: card.emoji}
    axios.post(`${BASE_URL}${card.boardName}/cards`, post)
    .then( (response) => {
      // only add card to board if the post is for this particular board
      if(card.boardName === currentBoard) {
        const newId = response.data.card.id;
    
        newCardList.push({
          card: {
            id: newId,
            text: card.text, 
            emoji: card.emoji,
          }  
        })
      }
      setCardsList(newCardList);
    })
    .catch( (error) => {
      setErrorMessage(['Failed to add card.']);
      console.log(error.message);
    });


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

  // if currentBoard changed

  const changeCurrentBoard = (boardName) => {  
    updateBoard(boardName);
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
      <BoardList currentBoard ={currentBoard} boards = {allBoards} changeCurrentBoard = {changeCurrentBoard}/>
      <NewCardForm url = {CARDS_URL} boardName = {currentBoard} addCard = {addCard} boards = {allBoards}/>
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
