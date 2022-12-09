import React, { useState, useEffect, useMemo } from "react"
import { useTable } from "react-table"

import Layout from "../components/Layout"
import TopBar from "../components/TopBar"
import TableData from "../components/TableData"
import useTokenData from "../hooks/useTokenData"
import styles from "../styles/Index.module.css"

const Index = () => {
    const onSuccess = () => {}
    const onError = (error) => {
        console.log(error?.message)
    }
    const { isLoading: isLoadingTokens, data: dataTokens } = useTokenData(
        onSuccess,
        onError
    )

    const columns = useMemo(() => {
        let columnHeaders = []
        if (dataTokens) {
            for (const key in dataTokens[0]) {
                let keyName = key.replace("_", " ")
                let maxWidth = 150
                let minWidth = 140
                let width = 140
                if (key === "token_uri" || key == "current_owner") {
                    maxWidth = 600
                    minWidth = 400
                    width = 500
                }
                columnHeaders.push({
                    Header: keyName,
                    accessor: key,
                    maxWidth: maxWidth,
                    minWidth: minWidth,
                    width: width,
                })
            }
        }

        return columnHeaders
    }, [dataTokens])

    const data = useMemo(() => {
        return dataTokens
    }, [dataTokens])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
    } = useTable({
        columns: columns,
        data: data,
    })

    return (
        <Layout>
            <div className={styles.container_index}>
                <div className={styles.top_bar}>
                    <TopBar allColumns={allColumns} />
                </div>

                <div className={styles.table_data}>
                    {!isLoadingTokens && (
                        <TableData
                            getTableProps={getTableProps}
                            getTableBodyProps={getTableBodyProps}
                            headerGroups={headerGroups}
                            rows={rows}
                            prepareRow={prepareRow}
                        />
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Index
