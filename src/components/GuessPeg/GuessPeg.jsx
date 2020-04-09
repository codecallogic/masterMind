import React from 'react';
import styles from './GuessPeg.module.css'

const GuessPeg = (props) => (
  <div 
    className={`${styles.button}`}
    style={{
      backgroundColor: props.color,
      border: props.color ? `1px solid ${props.color}`: `1px dashed grey`, 
      cursor: props.currentGuess && 'pointer',
    }}
    onClick={props.currentGuess ? props.handlePegClick : null}
  >
  </div>
);

export default GuessPeg