import { useQuery } from 'react-query'
import axios from 'axios'

const fetchGetBet = (id)=>{
    const options = {
        method: 'GET',
        url: `https://playbet-backend-ptwt.onrender.com/bet/get-all-bets/${id}`,
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
        }
    )
}