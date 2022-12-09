import React, { useEffect } from "react"

import styles from "../styles/Checkbox.module.css"

const Checkbox = ({ column, ...rest }) => {
    return (
        <label className={styles.container_checkbox}>
            <input type="checkbox" {...column.getToggleHiddenProps()} />
            <p>{column.Header}</p>
        </label>
    )
}

export default Checkbox
