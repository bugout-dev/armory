import React, { useState, useEffect, useMemo } from "react"
import { useTable } from "react-table"

import Layout from "../components/Layout"
import TopBar from "../components/TopBar"
import TableData from "../components/TableData"
import useTokenData from "../hooks/useTokenData"
import styles from "../styles/Index.module.css"

const Index = () => {
    const [data, setData] = useState([])

    const columns = useMemo(
        () => [
            {
                Header: "Token ID",
                accessor: "token_id",
                maxWidth: 50,
                minWidth: 50,
                width: 50,
            },
            {
                Header: "Owner",
                accessor: "current_owner",
                maxWidth: 150,
                minWidth: 100,
                width: 150,
            },
            {
                Header: "Name",
                accessor: "name",
                maxWidth: 150,
                minWidth: 100,
                width: 150,
            },
        ],
        []
    )

    const onSuccess = () => {}
    const onError = (error) => {
        console.log(error?.message)
    }
    // const { isLoading: isLoadingTokens, data: dataTokens } = useTokenData(
    //     onSuccess,
    //     onError
    // )
    const dataTokens = [
        {
            token_id: 1,
            token_uri: "https://champions.io/champions/nfts/1",
            current_owner: "0x20c5954A11B9fc625Cc91e976E2933c0471f3bF2",
            name: "Champion #1",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "2",
                },
                {
                    trait_type: "Family",
                    value: "Il\u2019gra",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Formidable",
                },
                {
                    trait_type: "Fangs",
                    value: "D \ud83d\udc80 Rotbite",
                },
                {
                    trait_type: "Tail",
                    value: "R \ud83c\udf31  Prideback",
                },
                {
                    trait_type: "Horns",
                    value: "D \ud83d\udd2e Bloodskewer",
                },
                {
                    trait_type: "Wings",
                    value: "None",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83c\udf31  Imbued",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udc80 Loneliness",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "E - Dual Basil",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 2,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 2,
            token_uri: "https://champions.io/champions/nfts/2",
            current_owner: "0x5B0cDF5369295B6EF918BBAb8b38a11d574AafFb",
            name: "Champion #2",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Il\u2019gra",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Auspicious",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udc80 Solitary",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83c\udf31  Feathershine",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83c\udf31  Bharal",
                },
                {
                    trait_type: "Wings",
                    value: "None",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udc80 Elongated ",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udd2e Discipline",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Dual Green",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 3,
            token_uri: "https://champions.io/champions/nfts/3",
            current_owner: "0x51EF6A683256a5B8bdbF197ba50bfedf02f7245a",
            name: "Champion #3",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Darulk",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Majestic",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83c\udf31  Decorous",
                },
                {
                    trait_type: "Tail",
                    value: "R \ud83d\udd2e Tigris",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83c\udf31  Moose",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83d\udc80 Nightbug",
                },
                {
                    trait_type: "Claws",
                    value: "None",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udc80 Conflict",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Scarlet Long",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 4,
            token_uri: "https://champions.io/champions/nfts/4",
            current_owner: "0xe63CdCDb22D01ec60cA833452D6c09CA49938dE5",
            name: "Champion #4",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Keymaster",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Auspicious",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udc80 Solitary",
                },
                {
                    trait_type: "Tail",
                    value: "None",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83d\udd2e Oni",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udd2e Soarplume",
                },
                {
                    trait_type: "Claws",
                    value: "R \ud83c\udf31  Cartilage",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udc80 Lamentation",
                },
                {
                    trait_type: "Piercing",
                    value: "E - Rings",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Dark Rising",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 5,
            token_uri: "https://champions.io/champions/nfts/5",
            current_owner: "0xc9e6b57dE8fe0fdb83B3ac36166E8DD6a2C4bECA",
            name: "Champion #5",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Grondal",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Providential",
                },
                {
                    trait_type: "Fangs",
                    value: "D \ud83d\udc80 Rotbite",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udd2e Shiftplume",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udc80 Charger",
                },
                {
                    trait_type: "Wings",
                    value: "None",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udd2e Spinegrowth",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udd2e Adage",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - No Hair",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "0",
                },
            ],
        },
        {
            token_id: 6,
            token_uri: "https://champions.io/champions/nfts/6",
            current_owner: "0xB3846e8A6A230A5A853867f24Ecd7AE800CAe967",
            name: "Champion #6",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Aos",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Daunting",
                },
                {
                    trait_type: "Fangs",
                    value: "D \ud83d\udc80 Rotbite",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83c\udf31  Griffin",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83c\udf31  Sagebird",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83c\udf31  Imbued",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83c\udf31  Family",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Gravely Black",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 7,
            token_uri: "https://champions.io/champions/nfts/7",
            current_owner: "0x02a0780f4148BD88eae770385a2691e22346c9C2",
            name: "Champion #7",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Fenrir",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Hopeful",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udd2e Incisors",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83c\udf31  Bliss",
                },
                {
                    trait_type: "Horns",
                    value: "E \ud83c\udf31  Mar",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udd2e Levitation",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83c\udf31  Construct",
                },
                {
                    trait_type: "Warpaint",
                    value: "None",
                },
                {
                    trait_type: "Piercing",
                    value: "R - Bone",
                },
                {
                    trait_type: "Hairstyle",
                    value: "E - Pink Wolfstripe",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "3",
                },
            ],
        },
        {
            token_id: 8,
            token_uri: "https://champions.io/champions/nfts/8",
            current_owner: "0xF52b21144F13DFC4d4E7Ffbd912C13b9dA1e6f8E",
            name: "Champion #8",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Whisperer",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Grandiose",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udc80 Hungering",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udd2e Shiftplume",
                },
                {
                    trait_type: "Horns",
                    value: "D \ud83d\udc80 Malevolence",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83c\udf31  Sagebird",
                },
                {
                    trait_type: "Claws",
                    value: "None",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Reality",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Stud",
                },
                {
                    trait_type: "Hairstyle",
                    value: "E - White Slick-back",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 9,
            token_uri: "https://champions.io/champions/nfts/9",
            current_owner: "0x3380875760555912EC3E985ceB8b9b4b2A9157D6",
            name: "Champion #9",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Gatekeeper",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Propitious",
                },
                {
                    trait_type: "Fangs",
                    value: "D \ud83c\udf31  Soulpiercer",
                },
                {
                    trait_type: "Tail",
                    value: "None",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udc80 Striker",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udc80 Swampstrider",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udd2e Conjurer",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83c\udf31  Ancestry",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Stud",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Plucked Amber",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 10,
            token_uri: "https://champions.io/champions/nfts/10",
            current_owner: "0xB0603BDb6D0d94eA126E8A6dbaC41Cf783E60beE",
            name: "Champion #10",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Vitra",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Grandiose",
                },
                {
                    trait_type: "Fangs",
                    value: "None",
                },
                {
                    trait_type: "Tail",
                    value: "E \ud83c\udf31  Peacock",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83c\udf31  Bharal",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udd2e Bluechirp",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udc80 Feral",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Birth",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Classic Ponytail",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 11,
            token_uri: "https://champions.io/champions/nfts/11",
            current_owner: "0x01C0cDd9F051EcF9ae9Cf541c317deCa7A473193",
            name: "Champion #11",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Il\u2019gra",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Magnificent",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83d\udc80 Sidetooth",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udd2e Plategrom",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83c\udf31  Takin",
                },
                {
                    trait_type: "Wings",
                    value: "None",
                },
                {
                    trait_type: "Claws",
                    value: "R \ud83c\udf31  Peregrine",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udd2e Lore",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Dual Green",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 12,
            token_uri: "https://champions.io/champions/nfts/12",
            current_owner: "0xEc206aAd6416478443F6a47b0C900AF8A7A98675",
            name: "Champion #12",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Darulk",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Formidable",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83d\udc80 Gnasher",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udc80 Leandrake",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83c\udf31  Takin",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udd2e Bluechirp",
                },
                {
                    trait_type: "Claws",
                    value: "None",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udd2e Adage",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Stud",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Purple Long",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 13,
            token_uri: "https://champions.io/champions/nfts/13",
            current_owner: "0xaFA158D67798c70E4acF241599250E8f2cC6740C",
            name: "Champion #13",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Il\u2019gra",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Imposing",
                },
                {
                    trait_type: "Fangs",
                    value: "D \ud83d\udd2e Riddlegash",
                },
                {
                    trait_type: "Tail",
                    value: "E \ud83d\udc80 Noxious",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83d\udc80 Regal",
                },
                {
                    trait_type: "Wings",
                    value: "None",
                },
                {
                    trait_type: "Claws",
                    value: "R \ud83d\udd2e Hooked",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udd2e History",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "E - Dual Basil",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 14,
            token_uri: "https://champions.io/champions/nfts/14",
            current_owner: "0xdd7D6305b430b9B7D72a94D77B64FB76335c30E8",
            name: "Champion #14",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Aos",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Splendid",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83d\udc80 Gnasher",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udc80 Wurm",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udc80 Raventalon",
                },
                {
                    trait_type: "Claws",
                    value: "R \ud83c\udf31  Cartilage",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udd2e Discipline",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Gravely Blonde",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 15,
            token_uri: "https://champions.io/champions/nfts/15",
            current_owner: "0x89C5f1EF5084908004bceF44d5E5680abCb49FB3",
            name: "Champion #15",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Darulk",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Splendid",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udc80 Hungering",
                },
                {
                    trait_type: "Tail",
                    value: "R \ud83d\udd2e Tigris",
                },
                {
                    trait_type: "Horns",
                    value: "D \ud83d\udd2e Bloodskewer",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83c\udf31  Sagebird",
                },
                {
                    trait_type: "Claws",
                    value: "None",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udd2e History",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Scarlet Long",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "3",
                },
            ],
        },
        {
            token_id: 16,
            token_uri: "https://champions.io/champions/nfts/16",
            current_owner: "0xD4818d4C5d0c689e9569C73321910C4774Ad4d52",
            name: "Champion #16",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Keymaster",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Propitious",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83c\udf31  Sangreal",
                },
                {
                    trait_type: "Tail",
                    value: "None",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83c\udf31  Bharal",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83d\udc80 Nightbug",
                },
                {
                    trait_type: "Claws",
                    value: "D \ud83d\udd2e Gutripper",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Reality",
                },
                {
                    trait_type: "Piercing",
                    value: "R - Bone",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Blue Rising",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "3",
                },
            ],
        },
        {
            token_id: 17,
            token_uri: "https://champions.io/champions/nfts/17",
            current_owner: "0xB733B82341B2f0cD788beF1482c8cA4b6896F354",
            name: "Champion #17",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Darulk",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Majestic",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83c\udf31  Sangreal",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83c\udf31  Griffin",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udc80 Striker",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83c\udf31  Odonata",
                },
                {
                    trait_type: "Claws",
                    value: "None",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udc80 Lamentation",
                },
                {
                    trait_type: "Piercing",
                    value: "R - Bone",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Scarlet Long",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "0",
                },
            ],
        },
        {
            token_id: 18,
            token_uri: "https://champions.io/champions/nfts/18",
            current_owner: "0x4C831B771CCCfF7B4b1356E11161f4726383d3F3",
            name: "Champion #18",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Seris",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Splendid",
                },
                {
                    trait_type: "Fangs",
                    value: "None",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udc80 Moonfang",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83d\udd2e Oni",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83c\udf31  Odonata",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83c\udf31  Appendix",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udd2e History",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Mountain Brown",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 19,
            token_uri: "https://champions.io/champions/nfts/19",
            current_owner: "0xaFA158D67798c70E4acF241599250E8f2cC6740C",
            name: "Champion #19",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Vitra",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Formidable",
                },
                {
                    trait_type: "Fangs",
                    value: "None",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83c\udf31  Griffin",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udd2e Antler",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83c\udf31  Sagebird",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83c\udf31  Imbued",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udc80 Loneliness",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Brown Ponytail",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 20,
            token_uri: "https://champions.io/champions/nfts/20",
            current_owner: "0xaFA158D67798c70E4acF241599250E8f2cC6740C",
            name: "Champion #20",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Fenrir",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Magnificent",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83c\udf31  Fleshpiercer",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udd2e Plategrom",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83d\udc80 Anoa",
                },
                {
                    trait_type: "Wings",
                    value: "E \ud83d\udc80 Boneframe",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udc80 Sharpened",
                },
                {
                    trait_type: "Warpaint",
                    value: "None",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Stud",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - White Wolfstripe",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 21,
            token_uri: "https://champions.io/champions/nfts/21",
            current_owner: "0x9eA6d85ad6aeb8A3bB34140dF9c027B6b264069D",
            name: "Champion #21",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Aos",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Hopeful",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83c\udf31  Sangreal",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udc80 Moonfang",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83c\udf31  Odonata",
                },
                {
                    trait_type: "Claws",
                    value: "D \ud83c\udf31  Heartseeker",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udc80 Midnight",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Gravely White",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "3",
                },
            ],
        },
        {
            token_id: 22,
            token_uri: "https://champions.io/champions/nfts/22",
            current_owner: "0xcB7d7ABd39f647707182E32a5b9e3EA42A565bF5",
            name: "Champion #22",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Saadari",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Grandiose",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udd2e Craving",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udd2e Shiftplume",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udc80 Carcass",
                },
                {
                    trait_type: "Claws",
                    value: "D \ud83d\udc80 Marrowstrike",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Inertia",
                },
                {
                    trait_type: "Piercing",
                    value: "E - Rings",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Scarlethooks",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 23,
            token_uri: "https://champions.io/champions/nfts/23",
            current_owner: "0xd722B0584286Fdb7a99A4Becb55B57971d62BbD8",
            name: "Champion #23",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "2",
                },
                {
                    trait_type: "Family",
                    value: "Fenrir",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Auspicious",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udd2e Craving",
                },
                {
                    trait_type: "Tail",
                    value: "D \ud83d\udc80 Doomscale",
                },
                {
                    trait_type: "Horns",
                    value: "D \ud83c\udf31  Endgame",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udd2e Levitation",
                },
                {
                    trait_type: "Claws",
                    value: "R \ud83d\udc80 Overarching",
                },
                {
                    trait_type: "Warpaint",
                    value: "None",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Brown Wolfstripe",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 2,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 24,
            token_uri: "https://champions.io/champions/nfts/24",
            current_owner: "0x02f1ECAd208fcaB5A81Efdd93ecAF2f6C670Af16",
            name: "Champion #24",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Keymaster",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Magnificent",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udd2e Saber",
                },
                {
                    trait_type: "Tail",
                    value: "None",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83d\udc80 Anoa",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83c\udf31  Odonata",
                },
                {
                    trait_type: "Claws",
                    value: "D \ud83d\udd2e Gutripper",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Birth",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Blue Rising",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 25,
            token_uri: "https://champions.io/champions/nfts/25",
            current_owner: "0xEDBa61C18c7cc93c6D5AEee44472Be318420B471",
            name: "Champion #25",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Karkadon",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Imposing",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83c\udf31  Razor",
                },
                {
                    trait_type: "Tail",
                    value: "R \ud83d\udd2e Tigris",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udd2e Eland",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83d\udc80 Tentacled",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udc80 Feral",
                },
                {
                    trait_type: "Warpaint",
                    value: "None",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - No Hair",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 26,
            token_uri: "https://champions.io/champions/nfts/26",
            current_owner: "0xcfe1CCF15327a6Bd64Cf52C9387fF0Ba16D69C41",
            name: "Champion #26",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "2",
                },
                {
                    trait_type: "Family",
                    value: "Seris",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Auspicious",
                },
                {
                    trait_type: "Fangs",
                    value: "None",
                },
                {
                    trait_type: "Tail",
                    value: "D \ud83c\udf31  Dawnsong",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83c\udf31  Moose",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83c\udf31  Mothlight",
                },
                {
                    trait_type: "Claws",
                    value: "D \ud83c\udf31  Heartseeker",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Reality",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Mountain Brown",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 2,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "5",
                },
            ],
        },
        {
            token_id: 27,
            token_uri: "https://champions.io/champions/nfts/27",
            current_owner: "0xaFA158D67798c70E4acF241599250E8f2cC6740C",
            name: "Champion #27",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Saadari",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Splendid",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83c\udf31  Razor",
                },
                {
                    trait_type: "Tail",
                    value: "R \ud83d\udc80 Bonestinger",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udd2e Levitation",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udd2e Spinegrowth",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udc80 Lamentation",
                },
                {
                    trait_type: "Piercing",
                    value: "R - Bone",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Greenhooks",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 28,
            token_uri: "https://champions.io/champions/nfts/28",
            current_owner: "0x1eFFF6682F30e9Fa7C5fd7ec6138d006eafD137B",
            name: "Champion #28",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Aos",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udd2e Arcane",
                },
                {
                    trait_type: "Halo",
                    value: "Magnificent",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udd2e Craving",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udc80 Wurm",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "E \ud83d\udc80 Boneframe",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udc80 Sharpened",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udc80 Conflict",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Stud",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Gravely Blonde",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 29,
            token_uri: "https://champions.io/champions/nfts/29",
            current_owner: "0xC95E687C5F1850C114ba4439b568fAB7dB9D902C",
            name: "Champion #29",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Karkadon",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Hopeful",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83c\udf31  Razor",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83c\udf31  Feathershine",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udd2e Eland",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83d\udc80 Tentacled",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83c\udf31  Appendix",
                },
                {
                    trait_type: "Warpaint",
                    value: "None",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Sage Ponytail",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "3",
                },
            ],
        },
        {
            token_id: 30,
            token_uri: "https://champions.io/champions/nfts/30",
            current_owner: "0xF5F5238dB66194835F90DF511cC7C8Ff02E0660a",
            name: "Champion #30",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Gatekeeper",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Daunting",
                },
                {
                    trait_type: "Fangs",
                    value: "C \ud83d\udc80 Solitary",
                },
                {
                    trait_type: "Tail",
                    value: "None",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udc80 Striker",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83d\udc80 Carcass",
                },
                {
                    trait_type: "Claws",
                    value: "D \ud83c\udf31  Heartseeker",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udd2e Adage",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Plucked Amber",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "3",
                },
            ],
        },
        {
            token_id: 31,
            token_uri: "https://champions.io/champions/nfts/31",
            current_owner: "0xc703b0cdD619258BE670d796f19B45A844CFe2C7",
            name: "Champion #31",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "2",
                },
                {
                    trait_type: "Family",
                    value: "Whisperer",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83c\udf31  Life",
                },
                {
                    trait_type: "Halo",
                    value: "Auspicious",
                },
                {
                    trait_type: "Fangs",
                    value: "D \ud83d\udd2e Riddlegash",
                },
                {
                    trait_type: "Tail",
                    value: "D \ud83d\udd2e Gravelash",
                },
                {
                    trait_type: "Horns",
                    value: "C \ud83d\udd2e Eland",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83c\udf31  Sagebird",
                },
                {
                    trait_type: "Claws",
                    value: "None",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Inertia",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Stud",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Black Slick-back",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 2,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 32,
            token_uri: "https://champions.io/champions/nfts/32",
            current_owner: "0xb0F47c1dAD4824c0ADe3570e6c4F69899d58500D",
            name: "Champion #32",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "0",
                },
                {
                    trait_type: "Family",
                    value: "Vitra",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Forbidding",
                },
                {
                    trait_type: "Fangs",
                    value: "None",
                },
                {
                    trait_type: "Tail",
                    value: "C \ud83d\udd2e Scalecoat",
                },
                {
                    trait_type: "Horns",
                    value: "R \ud83d\udc80 Anoa",
                },
                {
                    trait_type: "Wings",
                    value: "C \ud83c\udf31  Sunsparked",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udd2e Spinegrowth",
                },
                {
                    trait_type: "Warpaint",
                    value: "R \ud83d\udc80 Lamentation",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "E - Silver Ponytail",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 0,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "2",
                },
            ],
        },
        {
            token_id: 33,
            token_uri: "https://champions.io/champions/nfts/33",
            current_owner: "0x73183A1B0B8CACDC76157E375acC37d56eB91e2d",
            name: "Champion #33",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "3",
                },
                {
                    trait_type: "Family",
                    value: "Aos",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Imposing",
                },
                {
                    trait_type: "Fangs",
                    value: "D \ud83d\udc80 Rotbite",
                },
                {
                    trait_type: "Tail",
                    value: "D \ud83c\udf31  Dawnsong",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83c\udf31  Odonata",
                },
                {
                    trait_type: "Claws",
                    value: "D \ud83d\udc80 Marrowstrike",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udc80 Loneliness",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Classic",
                },
                {
                    trait_type: "Hairstyle",
                    value: "R - Gravely Black",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 3,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "3",
                },
            ],
        },
        {
            token_id: 34,
            token_uri: "https://champions.io/champions/nfts/34",
            current_owner: "0x4155f09A168c95EF880B88093982769a6C2cf67d",
            name: "Champion #34",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Aos",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Formidable",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83c\udf31  Decorous",
                },
                {
                    trait_type: "Tail",
                    value: "D \ud83c\udf31  Dawnsong",
                },
                {
                    trait_type: "Horns",
                    value: "None",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83d\udd2e Flightframe",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83d\udc80 Feral",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83c\udf31  Reality",
                },
                {
                    trait_type: "Piercing",
                    value: "C - Stud",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Gravely Blonde",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
        {
            token_id: 35,
            token_uri: "https://champions.io/champions/nfts/35",
            current_owner: "0xba6cAA5734c4E1Bba0B40A960ADf0208B7e816BD",
            name: "Champion #35",
            attributes: [
                {
                    trait_type: "Edition",
                    value: "Prime",
                },
                {
                    trait_type: "Ascension",
                    value: "Eternal",
                },
                {
                    trait_type: "Divinity",
                    value: "1",
                },
                {
                    trait_type: "Family",
                    value: "Keymaster",
                },
                {
                    trait_type: "Core Essence",
                    value: "\ud83d\udc80 Death",
                },
                {
                    trait_type: "Halo",
                    value: "Formidable",
                },
                {
                    trait_type: "Fangs",
                    value: "R \ud83c\udf31  Decorous",
                },
                {
                    trait_type: "Tail",
                    value: "None",
                },
                {
                    trait_type: "Horns",
                    value: "D \ud83d\udd2e Bloodskewer",
                },
                {
                    trait_type: "Wings",
                    value: "R \ud83d\udd2e Soarfin",
                },
                {
                    trait_type: "Claws",
                    value: "C \ud83c\udf31  Imbued",
                },
                {
                    trait_type: "Warpaint",
                    value: "C \ud83d\udc80 Midnight",
                },
                {
                    trait_type: "Piercing",
                    value: "E - Rings",
                },
                {
                    trait_type: "Hairstyle",
                    value: "C - Dark Rising",
                },
                {
                    display_type: "ranking",
                    max_value: 5,
                    trait_type: "Divine Parts",
                    value: 1,
                },
                {
                    display_type: "number",
                    max_value: 5,
                    trait_type: "Purity",
                    value: "1",
                },
            ],
        },
    ]

    useEffect(() => {
        if (dataTokens) {
            setData(dataTokens)
        }
    }, [dataTokens, setData])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
    } = useTable({
        columns: columns,
        data: data,
    })

    return (
        <Layout>
            <div className={styles.container_index}>
                <div className={styles.top_bar}>
                    <TopBar allColumns={allColumns} />
                </div>

                <div className={styles.table_data}>
                    <TableData
                        getTableProps={getTableProps}
                        getTableBodyProps={getTableBodyProps}
                        headerGroups={headerGroups}
                        rows={rows}
                        prepareRow={prepareRow}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Index
