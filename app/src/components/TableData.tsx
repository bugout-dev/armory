import React, { useState } from "react"

import Layout from "../components/Layout"
import styles from "../styles/TableData.module.css"

const TableData = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
}) => {
    return (
        <table className={styles.table} {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr
                        key={"headerGroup"}
                        {...headerGroup.getHeaderGroupProps()}
                    >
                        {headerGroup.headers.map((column) => {
                            const modifiedColumnProps =
                                column.getSortByToggleProps()
                            modifiedColumnProps.style.minWidth = column.minWidth
                            modifiedColumnProps.style.width = column.width
                            modifiedColumnProps.style.maxWidth = column.maxWidth
                            return (
                                <th
                                    key={column.Header}
                                    {...column.getHeaderProps(
                                        modifiedColumnProps
                                    )}
                                >
                                    {column.render("Header")}
                                </th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr key={row.id} {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        key={cell.value}
                                        {...cell.getCellProps({
                                            style: {
                                                minWidth: cell.column.minWidth,
                                                width: cell.column.width,
                                                maxWidth: cell.column.maxWidth,
                                            },
                                        })}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableData
