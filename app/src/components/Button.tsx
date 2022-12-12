import React, { useState } from "react"

import styles from "../styles/Button.module.css"

const Button = ({ text, onClick, ...rest }) => {
    return (
        <button onClick={onClick} className={styles.button} {...rest}>
            {text}
        </button>
    )
}

export default Button
