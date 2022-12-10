import React, { useEffect } from "react"

import styles from "../styles/LongInput.module.css"

const LongInput = ({ input, setInput, ...rest }) => {
    return (
        <input
            className={styles.container_input}
            value={input || ""}
            onChange={(event) => setInput(event.target.value)}
            placeholder={rest.placeholder}
            {...rest}
        />
    )
}

export default LongInput
