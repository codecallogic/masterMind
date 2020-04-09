import React from 'react';
import styles from './ScoreButton.module.css'

const ScoreButton = (props) => (
  <button 
    className={`${styles.button} btn btn-outline-secondary`}
    disabled={props.disabled}
    onClick={props.handleScoreClick}
  >
    ✔
  </button>
);

export default ScoreButton;