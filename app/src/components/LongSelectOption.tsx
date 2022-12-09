import React, { useEffect } from "react"

import styles from "../styles/LongSelectOption.module.css"

const LongSelectOption = ({ option_id, option_name, ...rest }) => {
    return (
        <option value={option_id} {...rest} className={styles.container_option}>
            {option_name}
        </option>
    )
}

export default LongSelectOption
