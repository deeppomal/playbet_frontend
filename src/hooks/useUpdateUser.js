import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUpdateUser = (data)=>{
    const options = {
        method: 'PATCH',
        url: `http://localhost:4000/auth/update-user/${data.googleId}`,
        data: {
            balance:data.balance
        },
    };
    return axios.request(options)
}
export const useUpdateUser = (data) => {
    return useQuery(
        'updateuser-'+data?.id,
        ()=>fetchUpdateUser(data),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
            staleTime:Infinity,
            enabled:false
        }
    )
}