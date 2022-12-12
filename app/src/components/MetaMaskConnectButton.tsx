import React, { useState } from "react"

import styles from "../styles/MetaMaskConnectButton.module.css"

const MetaMaskConnectButton = ({ text, onClick, ...rest }) => {
    return (
        <button onClick={onClick} className={styles.button} {...rest}>
            {text}
        </button>
    )
}

export default MetaMaskConnectButton
