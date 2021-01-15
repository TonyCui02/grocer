import React from 'react';
import styles from './Button.module.css'

export default function Button(props) {
    return (
        <button type="button" className={`${styles.button} ${props.className}`} onClick={props.onClick}>
            <span className={styles.text}>
                {props.text}
            </span>
        </button>
    )
}