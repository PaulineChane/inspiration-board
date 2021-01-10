import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BoardList.css';

const BoardList = (props) => {

    const onBoardChange = (event) => {
        props.changeCurrentBoard(event.target.value);
    }

    const boardSelect = (boards) => {

        let boardOptions = []
    
        for( const item of boards) {
            if(item.board.name !== props.currentBoard) {
                boardOptions.push(<option key = {item.board.name} value = {item.board.name}>{item.board.name}</option>);
            }
        }

        boardOptions.unshift(<option key = {props.currentBoard} value = {props.currentBoard}>{props.currentBoard} (current board)</option>)
        
        return(<select id = 'boardName'
                    name = 'boardName'
                    value = {props.currentBoard}
                    className = 'board-list__div-select' 
                    onChange = {onBoardChange}> {boardOptions} </select>);
    }
return (
    <div className = 'board-list'>
        <h2 className = 'board-list__header'>view board</h2>
        <div className = 'board-list__div'>
            {boardSelect(props.boards)}
        </div>
    </div>
);
}

BoardList.propTypes = {
    currentBoard: PropTypes.string.isRequired,
    changeCurrentBoard: PropTypes.func.isRequired,
    boards: PropTypes.arrayOf(PropTypes.shape({board: PropTypes.shape(
        {id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired}
    )})).isRequired
};

export default BoardList;