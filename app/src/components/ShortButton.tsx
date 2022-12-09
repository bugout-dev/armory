import React, { useState } from "react"

import styles from "../styles/ShortButton.module.css"

const ShortButton = ({ text, onClick, ...rest }) => {
    return (
        <button onClick={onClick} className={styles.button} {...rest}>
            {text}
        </button>
    )
}

export default ShortButton
