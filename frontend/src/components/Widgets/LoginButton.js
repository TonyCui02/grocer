import React from 'react';
import styles from './LoginButton.module.css'

export default function LoginButton(props) {
    return (
        <button type="button" className={`${styles.button} ${props.className}`} onClick={props.onClick}>
            <div className={styles.content}>
                <img className={styles.image} alt="sign in" src={props.img}/>
                <span className={styles.text}>{props.text}</span>
            </div>
        </button>
    )
}