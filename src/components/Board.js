import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

const Board = () => {
  const allCards = (cards) => {
    
    let cardsList = [];

    for(const card of cards) {
      cardsList.push(<Card text={card.text} emojiText={card.emoji}/>);
    }
    return cardsList;
  }

  return (
    <div className = 'board'>
      {allCards(CARD_DATA.cards)}
    </div>
  )
};
Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
