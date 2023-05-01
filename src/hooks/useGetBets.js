import { useQuery } from 'react-query'
import axios from 'axios'

const fetchGetBet = (id)=>{
    const options = {
        method: 'GET',
        url: `http://localhost:4000/bet/get-all-bets/${id}`,
    };
    return axios.request(options)
}
export const useGetBets = (id) => {
    return useQuery(
        'get -'+id,
        ()=>fetchGetBet(id),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
            staleTime:Infinity,
        }
    )
}