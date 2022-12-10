import React, { useEffect } from "react"

import styles from "../styles/LongSelect.module.css"

const LongSelect = ({ setSelectedOption, ...rest }) => {
    return (
        <select
            onChange={setSelectedOption}
            className={styles.container_select}
            {...rest}
        />
    )
}

export default LongSelect
