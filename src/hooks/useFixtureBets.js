import { useQuery } from 'react-query'
import axios from 'axios'

const fetchFixtureBets = (url,fixture)=>{
    const options = {
        method: 'GET',
        url: url,
        params: {fixture: fixture},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_HOST
        }
    };
    return axios.request(options)
}
export const useFixtureBets = (url,fixture) => {
    return useQuery(
        'bets-'+fixture,
        ()=>fetchFixtureBets(url,fixture),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
            staleTime:Infinity,
            enabled:false
        }
    )
}