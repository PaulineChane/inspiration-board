import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

const Card = (props) => {
  const removeCard = () => {
    props.deleteCard(props.id);
  }

  return (
    <div className="card">
      <button className = "card__delete" onClick = {removeCard}> delete</button>
      <section className = "card__content">
        <h2 className = "card__content-text">{props.text}</h2>
        <p className = "card__content-emoji">{props.emojiText ? emoji.getUnicode(props.emojiText) : ''}</p>
      </section>
    </div>
  )
}

Card.propTypes = {
  text: PropTypes.string, 
  emoji: PropTypes.string,
  deleteCard: PropTypes.func.isRequired,
};

export default Card;
