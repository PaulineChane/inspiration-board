import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = emoji.names;

const NewCardForm = (props) => {

    const [formData, updateFormData] = useState({text: '', emoji: '', boardName: props.boardName})

}

export default NewCardForm;