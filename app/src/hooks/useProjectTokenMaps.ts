import { useQuery } from "react-query"
import axios from "axios"

import { CACHE_TIME, STALE_TIME } from "../settings"

const fetchProjectTokenMaps = () => {
    return axios.get(
        "https://s3.amazonaws.com/data.moonstream.to/dev/armory/token_projects_map.json"
    )
}

interface ProjectTokenMap {
    name: string
    address: string
    s3_data_url: string
}

// Fetch map of project tokens with names, blockchain addresses and link to s3 data
const useProjectTokenMaps = (onSuccess, onError) => {
    return useQuery("project-tokens", fetchProjectTokenMaps, {
        onSuccess,
        onError,
        select: (data: any) => {
            const projectTokenMaps: ProjectTokenMap[] = data?.data.map(
                (projectToken) => {
                    return {
                        name: projectToken.name,
                        address: projectToken.address,
                        s3_data_url: projectToken.s3_data_url,
                    }
                }
            )
            return projectTokenMaps
        },
        refetchOnWindowFocus: false,
        cacheTime: CACHE_TIME,
        staleTime: STALE_TIME,
    })
}

export default useProjectTokenMaps
