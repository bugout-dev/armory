import React, { useState, useEffect } from "react"

import Chart from "../components/Chart"
import LongSelect from "./LongSelect"
import LongSelectOption from "./LongSelectOption"
import styles from "../styles/ChartBar.module.css"

const ChartBar = ({ dataTokens, columnHeaders }) => {
    // Column options
    const [selectedColumnHeader, setSelectedColumnHeader] = useState(undefined)
    const [columnChartOptions, setColumnChartOptions] = useState([])

    const [chartData, setChartData] = useState({})

    useEffect(() => {
        let columnHeadersTemp = [
            <LongSelectOption
                key={"undefined"}
                option_id={undefined}
                option_name={undefined}
            />,
        ]
        if (columnHeaders) {
            columnHeaders.map((headerGroup) => {
                headerGroup.headers.map((column) => {
                    if (
                        column.Header != "token id" &&
                        column.Header != "token uri" &&
                        column.Header != "current owner" &&
                        column.Header != "name"
                    ) {
                        columnHeadersTemp.push(
                            <LongSelectOption
                                key={column.Header}
                                option_id={column.Header}
                                option_name={column.Header}
                            />
                        )
                    }
                })
            })
        }
        setColumnChartOptions(columnHeadersTemp)
    }, [columnHeaders])

    useEffect(() => {
        if (dataTokens) {
            let occurrences = {}

            dataTokens.forEach((token) => {
                for (const key in token) {
                    if (key == selectedColumnHeader) {
                        occurrences[token[key]] = occurrences[token[key]]
                            ? occurrences[token[key]] + 1
                            : 1
                    }
                }
            })

            setChartData({
                chardId: selectedColumnHeader,
                occurrences: occurrences,
            })
        }
    }, [selectedColumnHeader])

    return (
        <div className={styles.container_charts}>
            <h2>Attributes chart</h2>
            <div className={styles.topbar_row}>
                <div className={styles.element}>
                    <div className={styles.inner_input}>
                        <LongSelect
                            setSelectedOption={setSelectedColumnHeader}
                            name="columnsChartSelect"
                        >
                            {columnChartOptions}
                        </LongSelect>
                    </div>
                    <div className={styles.inner_chart}>
                        <Chart chartData={chartData} />
                    </div>
                </div>
                <div className={styles.element}></div>
            </div>
        </div>
    )
}

export default ChartBar
