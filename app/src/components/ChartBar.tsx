import React, { useState, useEffect } from "react"

import Chart from "../components/Chart"
import LongSelect from "./LongSelect"
import LongSelectOption from "./LongSelectOption"
import styles from "../styles/ChartBar.module.css"
import { EMPTY_CHART_ATTR_PLACEHOLDER } from "../settings"

const ChartBar = ({
    fetchedData,
    columnHeaders,
    dataTokensLength,
    numOfFlatRows,
}) => {
    // Column options
    const [selectedColumnHeader, setSelectedColumnHeader] = useState(undefined)
    const [columnChartOptions, setColumnChartOptions] = useState([])

    const [chartData, setChartData] = useState({})

    useEffect(() => {
        let columnHeadersTemp = [
            <LongSelectOption
                key={"undefined"}
                option_id={undefined}
                option_name={EMPTY_CHART_ATTR_PLACEHOLDER}
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
        if (fetchedData) {
            let occurrences = {}

            fetchedData.forEach((token) => {
                for (const key in token) {
                    if (key == selectedColumnHeader) {
                        occurrences[token[key]] = occurrences[token[key]]
                            ? occurrences[token[key]] + 1
                            : 1
                    }
                }
            })

            setChartData({
                chardId:
                    selectedColumnHeader == EMPTY_CHART_ATTR_PLACEHOLDER
                        ? undefined
                        : selectedColumnHeader,
                occurrences: occurrences,
            })
        }
    }, [selectedColumnHeader, columnChartOptions])

    return (
        <div className={styles.container_charts}>
            <h2>Chart and stats</h2>
            <div className={styles.topbar_row}>
                <div className={styles.element}>
                    <div className={styles.inner_input}>
                        <LongSelect
                            setSelectedOption={(event) => {
                                setSelectedColumnHeader(
                                    event.target.options[
                                        event.target.selectedIndex
                                    ].value
                                )
                            }}
                            name="columnsChartSelect"
                        >
                            {columnChartOptions}
                        </LongSelect>
                    </div>
                    <div className={styles.inner_chart}>
                        <Chart chartData={chartData} />
                    </div>
                </div>
                <div className={styles.element}>
                    <div className={styles.stats}>
                        <div className={styles.element_column}>
                            <p>
                                <strong>{dataTokensLength}</strong>
                            </p>
                            <p>
                                <strong>{numOfFlatRows}</strong>
                            </p>
                        </div>
                        <div className={styles.element_column}>
                            <p>Total number of tokens</p>
                            <p>Showed number of tokens</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartBar
