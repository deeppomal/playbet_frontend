import { useQuery } from 'react-query'
import axios from 'axios'

const fetchGoogleUser = (access_token)=>{
    console.log(access_token)
    const options = {
        method: 'GET',
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    };
    return axios.request(options)
}
export const useGoogleProfile = (access_token) => {
    return useQuery(
        'googleprofile',
        ()=>fetchGoogleUser(access_token),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
            enabled:false
        }
    )
}