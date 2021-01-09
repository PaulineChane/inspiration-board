import React from 'react';
import './App.css';
import Board from './components/Board';

const App = () => {
  return (
    <section>
      <header className="header">
        <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
      </header>
      <Board
        url="https://inspiration-board.herokuapp.com/boards/"
        boardName={`pchane-reaction`}
      />
    </section>
  );
};

export default App;
