import React, { useState, useEffect } from "react"

import LongSelect from "./LongSelect"
import LongSelectOption from "./LongSelectOption"
import LongInput from "./LongInput"
import NumInput from "./NumInput"
import Checkbox from "./Checkbox"
import PageNavigation from "./PageNavigation"
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
    projectTokens,
}) => {
    // Search owner address
    const [selectOwnerAddressInput, setSelectOwnerAddressInput] =
        useState(undefined)

    // Collection
    const [selectedCollection, setSelectedCollection] = useState(undefined)
    const [collectionOptions, setCollectionOptions] = useState([])

    // Checkboxes
    const [columnCheckboxes, setColumnCheckboxes] = useState([])

    useEffect(() => {
        if (
            activeTopbarRef &&
            activeTopbarRef.current &&
            activeTopbarRef.current.scrollIntoView
        ) {
            console.log("scroll to", goToTokenId)
            activeTopbarRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            })
        }
    }, [activeTopbarRef])

    useEffect(() => {
        const tempCollectionOptions = [
            <LongSelectOption
                key={0}
                option_id={undefined}
                option_name="Collection not selected"
            />,
        ]
        setCollectionOptions(tempCollectionOptions)
    }, [allColumns])

    return (
        <div className={styles.container_topbar}>
            <h2>Search and filter</h2>
            <div className={styles.topbar_row}>
                <div className={styles.element}>
                    <LongInput
                        input={selectOwnerAddressInput}
                        setInput={setSelectOwnerAddressInput}
                        placeholder="Search for owner address"
                    />
                </div>
                <div className={styles.element}>
                    <LongSelect
                        setSelectedOption={setSelectedCollection}
                        name="collectionSelect"
                    >
                        {collectionOptions}
                    </LongSelect>
                </div>
            </div>

            <h2>Columns visibility</h2>
            <div className={styles.topbar_row}>
                <div className={styles.columns_checkbox}>
                    {allColumns.map((column) => (
                        <div
                            key={column.Header}
                            className={styles.columns_checkbox_group}
                        >
                            <Checkbox key={column.Header} column={column} />
                        </div>
                    ))}
                </div>
            </div>

            <h2>Navigation</h2>
            <div className={styles.topbar_row}>
                <div className={styles.input_short}>
                    <div className={styles.input_inner}>
                        <div className={styles.container_input_inner}>
                            <p>Go to token id</p>
                            <NumInput
                                input={goToTokenId}
                                onChange={(event) =>
                                    setGoToTokenId(event.target.value)
                                }
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className={styles.input_inner}>
                        <div className={styles.container_input_inner}>
                            <p>Jump to page</p>
                            <NumInput
                                input={pageIndex + 1}
                                onChange={(event) => {
                                    const pageNumber = event.target.value
                                        ? Number(event.target.value) - 1
                                        : 0
                                    console.log(pageOptions)
                                    gotoPage(pageNumber)
                                }}
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.page_navigation}>
                    <PageNavigation
                        pageIndex={pageIndex}
                        pageCount={pageCount}
                        pageOptions={pageOptions}
                        gotoPage={gotoPage}
                        canPreviousPage={canPreviousPage}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        canNextPage={canNextPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default TopBar
