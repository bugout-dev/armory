import React, { useEffect } from "react"

import styles from "../styles/NumInput.module.css"

const NumInput = ({ input, onChange, ...rest }) => {
    return (
        <input
            className={styles.container_input}
            value={input || ""}
            onChange={onChange}
            placeholder={rest.placeholder}
            type="number"
        />
    )
}

export default NumInput
