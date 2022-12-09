import React, { useEffect } from "react"

import styles from "../styles/LongSelect.module.css"

const LongSelect = ({ setSelectedOption, ...rest }) => {
    const selectChange = (e) => {
        setSelectedOption(e.target.options[e.target.selectedIndex].value)
    }

    return (
        <select
            onChange={selectChange}
            className={styles.container_select}
            {...rest}
        />
    )
}

export default LongSelect
