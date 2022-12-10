import React, { useEffect, useState } from "react"
import apexchart from "apexcharts"
import dynamic from "next/dynamic"

import styles from "../styles/Chart.module.css"

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false })

const Chart = ({ chartData }) => {
    const [chartState, setChartState] = useState<any>(undefined)

    // Chart settings
    const [chartShowLegend, setChartShowLegend] = useState<boolean>(true)
    const [chartWidth, setChartWidth] = useState<string>("600")

    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window
        if (width > 600) {
            setChartWidth("600")
            setChartShowLegend(true)
        } else {
            setChartWidth(width.toString())
            setChartShowLegend(false)
        }

        if (chartData.chardId) {
            let tempChartState = {
                series: [],
                options: {
                    chart: {
                        id: chartData.chartId,
                    },
                    labels: [],
                    colors: [
                        "#5C4B51",
                        "#8C4F75",
                        "#40100C",
                        "#6A84A6",
                        "#F06060",
                        "#223857",
                        "#4F4D8C",
                        "#456F74",
                        "#EB5937",
                        "#8C4F75",
                        "#BF2E21",
                        "#6D88A4",
                    ],
                    stroke: {
                        show: false,
                    },
                    legend: {
                        show: chartShowLegend,
                        position: "right",
                        fontSize: "16px",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 400,
                        labels: {
                            colors: "#fff",
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: "12px",
                            fontFamily: "Space Grotesk, sans-serif",
                            fontWeight: 400,
                        },
                    },
                    tooltip: {
                        style: {
                            fontSize: "16px",
                            fontFamily: "Space Grotesk, sans-serif",
                        },
                    },
                },
            }
            for (const key in chartData.occurrences) {
                tempChartState.series.push(chartData.occurrences[key])
                tempChartState.options.labels.push(key)
            }

            setChartState(tempChartState)
        } else {
            setChartState(undefined)
        }
    }, [chartData])

    return (
        <div className={styles.container_chart}>
            {chartState ? (
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <ApexCharts
                                options={chartState.options}
                                series={chartState.series}
                                type="donut"
                                width={chartWidth}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Please select an attribute to render the chart..</p>
            )}
        </div>
    )
}

export default Chart
