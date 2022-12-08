import React, { useEffect } from "react"

import styles from "../styles/LongInput.module.css"

const LongInput = ({ input, setInput, ...rest }) => {
    useEffect(() => {}, [])
    return (
        <div className={styles.container_input}>
            <input
                value={input || ""}
                onChange={(event) => setInput(event.target.value)}
                placeholder={rest.placeholder}
            />
        </div>
    )
}

export default LongInput
