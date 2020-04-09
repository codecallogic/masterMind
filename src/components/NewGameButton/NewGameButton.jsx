import React from 'react';

const NewGameButton = (props) => (
  <button 
    className="btn btn-light w-100" 
    onClick={props.handleNewGameClick}
  >
    New Game
  </button>
);

export default NewGameButton;
