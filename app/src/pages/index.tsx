import React, { useState, useEffect, useMemo } from "react"
import { useTable, usePagination, useGlobalFilter } from "react-table"

import Layout from "../components/Layout"
import ProjectBar from "../components/ProjectBar"
import TopBar from "../components/TopBar"
import TableData from "../components/TableData"
import ChartBar from "../components/ChartBar"
import useProjectTokenMaps from "../hooks/useProjectTokenMaps"
import useTokenData from "../hooks/useTokenData"
import {
    PAGE_SIZE,
    EMPTY_PROJECT_PLACEHOLDER,
    FUN_EMPTY_PLACEHOLDER,
    FUN_LOADING_PLACEHOLDER,
} from "../settings"
import styles from "../styles/Index.module.css"

const Index = () => {
    // Table and data states
    const [fetchedData, setFetchedData] = useState(undefined)
    const [dataTokensLength, setDataTokensLength] = useState<number>(0)
    const [goToTokenId, setGoToTokenId] = useState<number>()
    const [activeTopbarRef, setActiveTopbarRef] = useState(null)

    // Selected project token to render
    const [selectedProjectToken, setSelectedProjectToken] = useState(
        EMPTY_PROJECT_PLACEHOLDER
    )
    const [selectedProjectTokenDataUrl, setSelectedProjectTokenDataUrl] =
        useState(undefined)

    const onSuccess = () => {}
    const onError = (error) => {
        console.log(error?.message)
    }
    const { isLoading: isLoadingProjectTokenMaps, data: projectTokenMaps } =
        useProjectTokenMaps(onSuccess, onError)
    const {
        isLoading: isLoadingDataTokens,
        data: dataTokens,
        isFetching: isFetchingDataTokens,
        refetch: dataTokensRefetch,
    } = useTokenData(
        onSuccess,
        onError,
        selectedProjectTokenDataUrl,
        selectedProjectToken
    )

    useEffect(() => {
        if (dataTokens) {
            setFetchedData(dataTokens)
        }
    }, [dataTokens, isLoadingDataTokens])

    useEffect(() => {
        console.log(
            0,
            selectedProjectTokenDataUrl,
            selectedProjectToken,
            EMPTY_PROJECT_PLACEHOLDER
        )
        // Handle project token selector
        if (
            selectedProjectTokenDataUrl &&
            selectedProjectToken &&
            selectedProjectToken != EMPTY_PROJECT_PLACEHOLDER
        ) {
            console.log("refetch")
            dataTokensRefetch()
        }
    }, [selectedProjectToken])

    const columns = useMemo(() => {
        // columns - must be memorized
        let columnHeaders = []
        if (fetchedData) {
            for (const key in fetchedData[0]) {
                let keyName = key.replace("_", " ")
                if (key === "token_uri" || key == "current_owner") {
                    columnHeaders.push({
                        Header: keyName,
                        accessor: key,
                        maxWidth: 600,
                        minWidth: 400,
                        width: 500,
                    })
                } else {
                    columnHeaders.push({
                        Header: keyName,
                        accessor: key,
                        maxWidth: 150,
                        minWidth: 140,
                        width: 140,
                    })
                }
            }
        }

        return columnHeaders
    }, [fetchedData])

    const data = useMemo(() => {
        // data - must be memorized
        if (fetchedData) {
            setDataTokensLength(fetchedData.length)
        }
        return fetchedData
    }, [fetchedData])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        setGlobalFilter,
        prepareRow,
        allColumns,
        flatRows,
    } = useTable(
        {
            columns: columns,
            data: data,
            initialState: { pageSize: PAGE_SIZE },
        },
        useGlobalFilter,
        usePagination
    )
    const { globalFilter, pageIndex } = state

    return (
        <Layout>
            <div className={styles.container_index}>
                <div className={styles.content}>
                    <div className={styles.container_project}>
                        <ProjectBar
                            projectTokenMaps={projectTokenMaps}
                            setSelectedProjectToken={setSelectedProjectToken}
                            setSelectedProjectTokenDataUrl={
                                setSelectedProjectTokenDataUrl
                            }
                        />
                    </div>
                    {allColumns.length > 0 &&
                    selectedProjectToken != EMPTY_PROJECT_PLACEHOLDER ? (
                        <div className={styles.container_data}>
                            <TopBar
                                allColumns={allColumns}
                                goToTokenId={goToTokenId}
                                setGoToTokenId={setGoToTokenId}
                                activeTopbarRef={activeTopbarRef}
                                pageIndex={pageIndex}
                                pageCount={pageCount}
                                pageOptions={pageOptions}
                                gotoPage={gotoPage}
                                canPreviousPage={canPreviousPage}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                canNextPage={canNextPage}
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                            <TableData
                                getTableProps={getTableProps}
                                getTableBodyProps={getTableBodyProps}
                                headerGroups={headerGroups}
                                rows={page}
                                prepareRow={prepareRow}
                                goToTokenId={goToTokenId}
                                setActiveTopbarRef={setActiveTopbarRef}
                            />
                            <ChartBar
                                fetchedData={fetchedData}
                                columnHeaders={headerGroups}
                                dataTokensLength={dataTokensLength}
                                numOfFlatRows={flatRows.length}
                            />
                        </div>
                    ) : isLoadingDataTokens ? (
                        <p>{FUN_LOADING_PLACEHOLDER}</p>
                    ) : (
                        <p>{FUN_EMPTY_PLACEHOLDER}</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Index
