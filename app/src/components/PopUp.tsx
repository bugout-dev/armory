import React, { useState } from "react"
import type { NextPage } from "next"

import Layout from "../components/Layout"
import styles from "../styles/PopUp.module.css"

const PopUp = ({ message }) => {
    return (
        <Layout>
            <div className={styles.container_popup}>
                <p>{message}</p>
            </div>
        </Layout>
    )
}

export default PopUp
