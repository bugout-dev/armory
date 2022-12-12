import { useQuery } from "react-query"
import axios from "axios"

import { CACHE_TIME, STALE_TIME } from "../settings"

const fetchTokenData = (queryKey) => {
    const selectedProjectTokenDataUrl = queryKey.queryKey[1]
    if (selectedProjectTokenDataUrl) {
        return axios.get(selectedProjectTokenDataUrl)
    }
}

const useTokenData = (
    onSuccess,
    onError,
    selectedProjectTokenDataUrl,
    selectedProjectToken
) => {
    return useQuery(
        [selectedProjectToken, selectedProjectTokenDataUrl],
        fetchTokenData,
        {
            onSuccess,
            onError,
            select: (data: any) => {
                return data?.data
            },
            refetchOnWindowFocus: false,
            cacheTime: CACHE_TIME,
            staleTime: STALE_TIME,
            enabled: false, // Do not fetch data when component mounts
        }
    )
}

export default useTokenData
