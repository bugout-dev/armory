import React, { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"

import styles from "../styles/Layout.module.css"

const Layout = ({ children }) => {
    const [accountName, setAccountName] = useState<string>("unknown")

    return (
        <>
            <Head>
                <title>Armory</title>
            </Head>
            <div className={styles.container}>
                <header className={styles.header}>
                    <nav className={styles.site_nav}>
                        <div className={styles.nav_first}>
                            <Link href="https://moonstream.to">
                                <img
                                    className={styles.logo}
                                    src={"logo.png"}
                                    alt="moonstream-logo"
                                />
                            </Link>
                        </div>
                        <ul className={styles.site_nav_ul}>
                            <li className={styles.nav_account}>
                                <p>{accountName}</p>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className={styles.main}>{children}</main>
            </div>
        </>
    )
}

export default Layout
