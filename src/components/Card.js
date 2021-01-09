import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <article className = "card__content">
        <h2 className = "card__content-text">{props.text}</h2>
        <p className = "card__content-emoji">{props.emoji ? emoji.getUnicode(props.emoji) : ''}</p>
      </article>
      <button className = "card__delete"> delete</button>
    </div>
  )
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired
};

export default Card;
