import React, { useState, useEffect } from "react"

import LongSelect from "./LongSelect"
import LongSelectOption from "./LongSelectOption"
import styles from "../styles/ProjectBar.module.css"

const ProjectBar = ({ projectTokens }) => {
    // Project Token
    const [selectedProjectToken, setSelectedProjectToken] = useState(undefined)
    const [projectTokenOptions, setProjectTokenOptions] = useState([])

    useEffect(() => {
        let projectTokenTemp = []
        if (projectTokens) {
            projectTokens.forEach((projectToken, i) => {
                projectTokenTemp.push(
                    <LongSelectOption
                        key={projectToken.token_address}
                        option_id={projectToken.token_address}
                        option_name={projectToken.token_name}
                    />
                )
            })
            setProjectTokenOptions(projectTokenTemp)
        }
    }, [projectTokens])

    return (
        <div className={styles.project_bar}>
            <div className={styles.element}>
                <h2>Token armory</h2>
            </div>
            <div className={styles.element}>
                <div className={styles.collection_select}>
                    <LongSelect
                        setSelectedOption={setSelectedProjectToken}
                        name="projectTokenSelect"
                    >
                        {projectTokenOptions}
                    </LongSelect>
                </div>
            </div>
        </div>
    )
}

export default ProjectBar
