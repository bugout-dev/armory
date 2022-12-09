import React, { useState } from "react"

import ShortButton from "./ShortButton"
import styles from "../styles/PageNavigation.module.css"

const PageNavigation = ({
    pageIndex,
    pageCount,
    pageOptions,
    gotoPage,
    canPreviousPage,
    previousPage,
    nextPage,
    canNextPage,
}) => {
    return (
        <div className={styles.page_navigation_container}>
            <div className={styles.page_counter}>
                <p>
                    Page {pageIndex + 1} of {pageCount}
                </p>
            </div>
            <div className={styles.navigation}>
                <ShortButton
                    text="<<"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                />
                <ShortButton
                    text="Previous"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                />

                <ShortButton
                    text="Next"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                />
                <ShortButton
                    text=">>"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                />
            </div>
        </div>
    )
}

export default PageNavigation
