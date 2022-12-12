import React, { useState, useEffect } from "react"

import LongSelect from "./LongSelect"
import MetaMaskConnectButton from "./MetaMaskConnectButton"
import Button from "./Button"
import styles from "../styles/MetaMaskBar.module.css"

// https://docs.metamask.io/guide/rpc-api.html#restricted-methods

const MetaMaskBar = () => {
    const [ethereum, setEthereum] = useState<any>(undefined)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const ethereum = window.ethereum
            setEthereum(ethereum)
        }
    }, [])

    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [accountAddress, setAccountAddress] = useState()

    const connectMetaMask = async () => {
        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
                setIsConnected(true)
                setAccountAddress(accounts[0])
            })
            .catch((error) => {
                if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log("Please connect to MetaMask.")
                } else {
                    console.error(error)
                }
            })
    }

    const [network, setNetwork] = useState("undefined")

    const selectNetwork = () => {
        console.log("Select network")
    }

    // useEffect(() => {
    //     if (ethereum) {
    //         const isMetamask = ethereum.isMetaMask
    //         if (typeof ethereum !== "undefined") {
    //             console.log("MetaMask is installed!")
    //         }
    //     }
    // }, [ethereum])

    return (
        <li className={styles.container_metamask}>
            {isConnected ? (
                <ul className={styles.connected_inner_nav}>
                    <li className={styles.nav_menu}>
                        <Button
                            text={accountAddress}
                            onClick={(event) => {
                                if (
                                    navigator?.clipboard &&
                                    window?.isSecureContext
                                ) {
                                    navigator.clipboard.writeText(
                                        event.target.textContent
                                    )
                                }
                            }}
                            style={{ backgroundColor: "transparent" }}
                        />
                    </li>
                    <li className={styles.nav_menu}>
                        <LongSelect
                            setSelectedOption={() => {}}
                            style={{ width: "120px" }}
                        >
                            []
                        </LongSelect>
                    </li>
                </ul>
            ) : (
                <MetaMaskConnectButton
                    text="Connect wallet"
                    onClick={connectMetaMask}
                    style={{ width: "160px" }}
                />
            )}
        </li>
    )
}

export default MetaMaskBar
