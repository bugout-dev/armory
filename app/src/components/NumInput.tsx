import React, { useEffect } from "react"

import styles from "../styles/LongInput.module.css"

const NumInput = ({ input, setInput, ...rest }) => {
    return (
        <div className={styles.container_input}>
            <input
                value={input || ""}
                onChange={(event) => setInput(event.target.value)}
                placeholder={rest.placeholder}
                type="number"
            />
        </div>
    )
}

export default NumInput
