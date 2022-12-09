import React, { useState, useRef, useEffect } from "react"

const TableDataRow = ({ row, goToTokenId, setActiveTopbarRef }) => {
    const itemRef = useRef(null)

    useEffect(() => {
        // Responsible for scrolling to row
        if (goToTokenId && row.id == goToTokenId) {
            setActiveTopbarRef(itemRef)
        }
    }, [goToTokenId])

    return (
        <tr key={row.id} {...row.getRowProps()} ref={itemRef}>
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
}

export default TableDataRow
