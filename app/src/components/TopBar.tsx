import React, { useState, useEffect } from "react"

import LongInput from "./LongInput"
import NumInput from "./NumInput"
import Checkbox from "./Checkbox"
import styles from "../styles/TopBar.module.css"

const TopBar = ({
    allColumns,
    goToTokenId,
    setGoToTokenId,
    activeTopbarRef,
    pageIndex,
    pageCount,
    pageOptions,
    gotoPage,
    canPreviousPage,
    previousPage,
    nextPage,
    canNextPage,
}) => {
    const [selectCollectionInput, setSelectCollectionInput] = useState()

    useEffect(() => {
        if (
            activeTopbarRef &&
            activeTopbarRef.current &&
            activeTopbarRef.current.scrollIntoView
        ) {
            console.log("scroll to", goToTokenId)
            activeTopbarRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            })
        }
    }, [activeTopbarRef])

    return (
        <div className={styles.container_topbar}>
            <div className={styles.filter_owners}>
                <h2>Token armory</h2>

                <div className={styles.input_long}>
                    <LongInput
                        input={selectCollectionInput}
                        setInput={setSelectCollectionInput}
                        placeholder="Select collection to filter"
                    />
                </div>
            </div>
            <div className={styles.filter_owners}>
                {allColumns.map((column) => (
                    <Checkbox key={column.Header} column={column} />
                ))}
            </div>

            <div className={styles.input_short}>
                <NumInput
                    input={goToTokenId}
                    setInput={setGoToTokenId}
                    placeholder="Go to token number"
                />
            </div>
            <div>
                <span>
                    Page {pageIndex + 1} of {pageCount}
                </span>
                <span>
                    Go to page{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(event) => {
                            const pageNumber = event.target.value
                                ? Number(event.target.value) - 1
                                : 0
                            console.log(pageOptions)
                            gotoPage(pageNumber)
                        }}
                    />
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {">>"}
                </button>
            </div>
        </div>
    )
}

export default TopBar
