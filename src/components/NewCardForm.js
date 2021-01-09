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

    // for drop-down emoji options
    
    const emojiList = (emojis) => {
        let emojiSelect = []

        for( const emojiText of emojis) {
            emojiSelect.push(<option value = {emojiText}> {emojiText}</option>);
        }

        return emojiSelect;
    }

        // for drop-down board options
    
    const boardList = (boards) => {
        let boardSelect = []
    
        for( const item of boards) {
            // add own board to top of list
            if (item.board.name !== props.boardName) {
                boardSelect.push(<option value = {item.board.name}> {item.board.name}</option>);
            }
        }
        
        boardSelect.unshift(props.boardName);

        return boardSelect;
    }
    
    // for submit button 
    const onSubmit = (event) => {
        event.preventDefault();

        props.addCard(formData);

        updateFormData({text: '', emoji: '', boardName: props.boardName});
    }

    return (
        <section className = 'new-card-form' onSubmit = {onSubmit}>
            <h2 className = 'new-card-form__header'>add a card</h2>
            <form className = 'new-card-form__form'>

                <label className = 'new-card-form__form-label'>text</label>
                <textarea id = 'text'
                        name = 'text' 
                        value = {formData.text}
                        className = 'new-card-form__form-textarea' 
                        onChange = {onFieldChange}></textarea>

                <label className = 'new-card-form__form-label'>emoji {emoji ? emoji.getUnicode(formData.emoji) : ''}</label>
                <select id = 'emoji'
                        name = 'emoji' 
                        value = {formData.emoji}
                        className = 'new-card-form__form-select' 
                        onSelect = {onFieldChange}> {emojiList(EMOJI_LIST)} </select>

                <label className = 'new-card-form__form-label'>board</label>
                <select id = 'boardName'
                        name = 'boardName'
                        value = {formData.boardName}
                        className = 'new-card-form__form-select'
                        onSelect = {onFieldChange}> {boardList(props.boards)} </select>

                <input type='submit' value = 'submit card' className = 'new-card-form__form-button' />
            </form>
        </section>
    );
}

export default NewCardForm;