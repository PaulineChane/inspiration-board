import React, { Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = emoji.names;

const NewCardForm = (props) => {

    const [formData, updateFormData] = useState({text: '', emoji: '', boardName: props.boardName})

    // lifting this from exquisite react for responsive text area
    const onFieldChange = (event) => {
        const newFormData = {...formData};
        newFormData[event.target.name] = event.target.value;
        updateFormData(newFormData);
    }

    // for submit button 
    const onSubmit = (event) => {
        event.preventDefault();

        props.addCard(formData);

        updateFormData({text: '', emoji: '', boardName: props.boardName});
    }

    return (
        <section className = 'new-card-form'>
            <h2 className = 'new-card-form__header'>add a card</h2>
            <form className = 'new-card-form__form'>

                <label className = 'new-card-form__form-label'>text</label>
                <textarea className = 'new-card-form__form-textarea'></textarea>

                <label className = 'new-card-form__form-label'>emoji</label>
                <select className = 'new-card-form__form-select'></select>

                <label className = 'new-card-form__form-label'>board</label>
                <select className = 'new-card-form__form-select'></select>
                <button className = 'new-card-form__form-button'> submit card</button>
            </form>
        </section>
    );
}

export default NewCardForm;