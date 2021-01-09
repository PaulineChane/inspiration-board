import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <button className = "card__delete"> delete</button>
      <section className = "card__content">
        <h2 className = "card__content-text">{props.text}</h2>
        <p className = "card__content-emoji">{props.emojiText ? emoji.getUnicode(props.emojiText) : ''}</p>
      </section>
    </div>
  )
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emojiText: PropTypes.string.isRequired
};

export default Card;
