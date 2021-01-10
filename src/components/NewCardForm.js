import React, { Component, useState} from 'react';
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
            emojiSelect.push(<option key = {emojiText} value = {emojiText}> {emojiText}</option>);
        }

        emojiSelect.unshift(<option key = 'empty' value = ''> NONE </option>);
        return (<select id = 'emoji'
                name = 'emoji' 
                value = {formData.emoji}
                className = 'new-card-form__form-select' 
                onChange = {onFieldChange}> {emojiSelect} </select>);
    }

        // for drop-down board options
    
    const boardList = (boards) => {
        let boardSelect = []
    
        for( const item of boards) {
            // add own board to top of list
            if (item.board.name !== props.boardName) {
                boardSelect.push(<option key = {item.board.name} value = {item.board.name}>{item.board.name} {item.board.name === formData.boardName ? '(selected board)' : ''}</option>);
            }
        }
        
        boardSelect.unshift(<option key = {props.boardName} value = {props.boardName}> {props.boardName} (current board)</option>);

        return(<select id = 'boardName'
                    name = 'boardName'
                    value = {formData.boardName}
                    className = 'new-card-form__form-select'
                    onChange = {onFieldChange}> {boardSelect} </select>);
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
                        placeholder = "inspire your board or someone else's!"
                        className = 'new-card-form__form-textarea' 
                        onChange = {onFieldChange}></textarea>

                <label className = 'new-card-form__form-label'>{emoji ? emoji.getUnicode(formData.emoji) : ''} emoji</label>
                {emojiList(EMOJI_LIST)}

                <label className = 'new-card-form__form-label'>board</label>
                {boardList(props.boards)}

                <input type='submit' value = 'submit card' className = 'new-card-form__form-button' />
            </form>
        </section>
    );
}

NewCardForm.propTypes = {
    url: PropTypes.string.isRequired,
    boardName: PropTypes.string.isRequired,
    addCard: PropTypes.func.isRequired,
    boards: PropTypes.arrayOf(PropTypes.shape({board: PropTypes.shape(
        {id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired}
    )})).isRequired
};

export default NewCardForm;