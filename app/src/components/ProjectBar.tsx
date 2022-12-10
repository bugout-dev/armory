import React, { useState, useEffect } from "react"

import LongSelect from "./LongSelect"
import LongSelectOption from "./LongSelectOption"
import styles from "../styles/ProjectBar.module.css"
import { EMPTY_PROJECT_PLACEHOLDER } from "../settings"

const ProjectBar = ({
    projectTokenMaps,
    setSelectedProjectToken,
    setSelectedProjectTokenDataUrl,
}) => {
    const [projectTokenOptions, setProjectTokenOptions] = useState([])

    useEffect(() => {
        // Generate list of project tokens
        let projectTokenTemp = [
            <LongSelectOption
                key={"undefined-project"}
                option_id={undefined}
                option_name={EMPTY_PROJECT_PLACEHOLDER}
            />,
        ]
        if (projectTokenMaps) {
            projectTokenMaps.forEach((projectTokenMap, i) => {
                projectTokenTemp.push(
                    <LongSelectOption
                        key={projectTokenMap.address}
                        option_id={projectTokenMap.address}
                        option_name={projectTokenMap.name}
                    />
                )
            })
            setProjectTokenOptions(projectTokenTemp)
        }
    }, [projectTokenMaps])

    return (
        <div className={styles.project_bar}>
            <div className={styles.element}>
                <h2>Token armory</h2>
            </div>
            <div className={styles.element}>
                <div className={styles.collection_select}>
                    <LongSelect
                        setSelectedOption={(event) => {
                            const selectedAddress =
                                event.target.options[event.target.selectedIndex]
                                    .value
                            // Find selected project token to be able to extract s3 data url
                            const tokenProjectMap = projectTokenMaps.find(
                                (obj) => obj.address == selectedAddress
                            )
                            setSelectedProjectTokenDataUrl(
                                tokenProjectMap
                                    ? tokenProjectMap.s3_data_url
                                    : undefined
                            )
                            setSelectedProjectToken(
                                event.target.options[event.target.selectedIndex]
                                    .value
                            )
                        }}
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
