import { useQuery } from 'react-query'
import axios from 'axios'

const fetchFootballData = (url,date,leagueCode)=>{
    let year = new Date().getFullYear()-1
    // let year = '2023'
    const options = {
        method: 'GET',
        url: url,
        // params: {date: date,league: leagueCode, season: year},
        params: {date: date},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_HOST
        }
    };
    return axios.request(options)
}
export const useFootballAPI = (queryName,url,date,leagueCode) => {
    return useQuery(
        queryName+leagueCode+date,
        ()=>fetchFootballData(url,date,leagueCode),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
            staleTime:Infinity
        }
    )
}