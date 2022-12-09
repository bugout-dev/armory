import { useQuery } from "react-query"
import axios from "axios"

const mockData = [
    {
        project_id: 1,
        project_name: "Champions Ascension",
        token_address: "0x123",
        token_name: "PEC",
    },
    {
        project_id: 1,
        project_name: "Champions Ascension",
        token_address: "0x321",
        token_name: "CAP",
    },
]

const fetchProjectTokens = () => {
    // return axios.get(
    //     "https://s3.amazonaws.com/data.moonstream.to/dev/armory/champions_ascension/pec/data.json"
    // )
    return new Promise((resolveOuter) => {
        resolveOuter({ data: mockData })
    })
}

// {cacheTime: CACHE_TIME, staleTime: STALE_TIME_LONG}
const CACHE_TIME = 60000
const STALE_TIME_LONG = 60000 // How long it will not re-fetch data from server and show stale results

const useProjectTokens = (onSuccess, onError) => {
    return useQuery("projectTokens", fetchProjectTokens, {
        onSuccess,
        onError,
        select: (data: any) => {
            return data?.data
        },
        refetchOnWindowFocus: false,
    })
}

export default useProjectTokens
