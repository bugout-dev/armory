import React, { useState, useEffect } from "react"

import TableDataRow from "./TableDataRow"
import styles from "../styles/TableData.module.css"

const TableData = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    goToTokenId,
    setActiveTopbarRef,
}) => {
    return (
        <div className={styles.container_table}>
            <table className={styles.table} {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            key={"headerGroup"}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    key={column.Header}
                                    {...column.getHeaderProps({
                                        style: {
                                            minWidth: column.minWidth,
                                            width: column.width,
                                            maxWidth: column.maxWidth,
                                        },
                                    })}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <TableDataRow
                                key={row.id}
                                row={row}
                                setActiveTopbarRef={setActiveTopbarRef}
                                goToTokenId={goToTokenId}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableData
