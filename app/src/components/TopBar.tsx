import React, { useState } from "react"

import LongInput from "./LongInput"
import styles from "../styles/TopBar.module.css"

const TopBar = ({ allColumns }) => {
    const [goToTokenIdInput, setGoToTokenIdInput] = useState()
    const [selectCollectionInput, setSelectCollectionInput] = useState()

    return (
        <div className={styles.container_topbar}>
            <div className={styles.filter_owners}>
                <h2>Token armory</h2>
                <div className={styles.input_short}>
                    <LongInput
                        input={goToTokenIdInput}
                        setInput={setGoToTokenIdInput}
                        placeholder="Go to token number"
                    />
                </div>
                <div className={styles.input_long}>
                    <LongInput
                        input={selectCollectionInput}
                        setInput={setSelectCollectionInput}
                        placeholder="Select collection to filter"
                    />
                </div>
            </div>
        </div>
    )
}

export default TopBar
