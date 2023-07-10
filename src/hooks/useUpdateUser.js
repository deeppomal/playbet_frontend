import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUpdateUser = (id,betAmount)=>{
    return axios.patch('https://playbet-backend-ptwt.onrender.com/auth/update-user/'+id, {balance : -betAmount});
}
export const useUpdateUser = (id,betAmount) => {
    return useQuery(
        'updateuser' + id,
        ()=>fetchUpdateUser(id,betAmount),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
            staleTime:Infinity,
            enabled:false
        }
    )
}