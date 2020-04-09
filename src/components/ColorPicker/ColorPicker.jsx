import React from 'react'
import styles from './ColorPicker.module.css'

const ColorPicker = (props) => (
    <div className={styles.ColorPicker}>
        {props.colors.map((color, idx) => 
            <button 
            style={{
                backgroundColor: props.selColorIdx === idx ? 'white': color, 
                borderColor: color
            }} 
            className={`${styles.button}`} 
            key={color}
            onClick={() => props.handleColorSelection(idx)}
            >
            </button>
        )}
    </div>
)


export default ColorPicker