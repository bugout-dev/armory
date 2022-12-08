import { useQuery } from "react-query"
import axios from "axios"

const fetchTokenData = () => {
    return axios.get(
        "https://s3.amazonaws.com/data.moonstream.to/dev/armory/champions_ascension/pec.json"
    )
}

// {cacheTime: CACHE_TIME, staleTime: STALE_TIME_LONG}
const CACHE_TIME = 60000
const STALE_TIME_LONG = 60000 // How long it will not re-fetch data from server and show stale results

interface Token {
    token_id: number
    current_owner: string
    name: string
}

const useTokenData = (onSuccess, onError) => {
    return useQuery("tokenData", fetchTokenData, {
        onSuccess,
        onError,
        select: (data) => {
            const tokens: Token[] = data?.data.map((token) => {
                return {
                    token_id: token.token_id,
                    current_owner: token.current_owner,
                    name: token.name,
                }
            })
            return tokens
        },
    })
}

export default useTokenData
