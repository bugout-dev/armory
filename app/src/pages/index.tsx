import React, { useState, useEffect, useMemo } from "react"
import { useTable, useSortBy, useGlobalFilter } from "react-table"

import Layout from "../components/Layout"
import TopBar from "../components/TopBar"
import TableData from "../components/TableData"
import useTokenData from "../hooks/useTokenData"
import styles from "../styles/Index.module.css"

const Index = () => {
    const [data, setData] = useState([])

    const columns = useMemo(
        () => [
            {
                Header: "Token ID",
                accessor: "token_id",
                maxWidth: 50,
                minWidth: 50,
                width: 50,
            },
            {
                Header: "Owner",
                accessor: "current_owner",
                maxWidth: 150,
                minWidth: 100,
                width: 150,
            },
            {
                Header: "Name",
                accessor: "name",
                maxWidth: 150,
                minWidth: 100,
                width: 150,
            },
        ],
        []
    )

    const onSuccess = () => {}
    const onError = (error) => {
        console.log(error?.message)
    }
    const { isLoading: isLoadingTokens, data: dataTokens } = useTokenData(
        onSuccess,
        onError
    )

    useEffect(() => {
        if (dataTokens) {
            setData(dataTokens)
        }
    }, [dataTokens, setData])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns: columns,
            data: data,
        },
        useGlobalFilter,
        useSortBy
    )
    const { globalFilter } = state

    return (
        <Layout>
            <div className={styles.container_index}>
                <div className={styles.top_bar}>
                    <TopBar
                        allColumns={allColumns}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </div>

                <div className={styles.table_data}>
                    <TableData
                        getTableProps={getTableProps}
                        getTableBodyProps={getTableBodyProps}
                        headerGroups={headerGroups}
                        rows={rows}
                        prepareRow={prepareRow}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Index
