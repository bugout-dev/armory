import React, { useState } from "react"

import styles from "../styles/PopUp.module.css"

const PopUp = ({ message }) => {
    return (
        <div className={styles.container_popup}>
            <p>{message}</p>
        </div>
    )
}

export default PopUp
