import { useQuery } from 'react-query'
import axios from 'axios'

const saveGoogleUser = (data)=>{
    if(data?.name){
        const options = {
            method: 'POST',
            url: `http://localhost:4000/auth/add-user`,
            data: {username: data.name,userEmail:data.email,googleId: data.id, photo: data.picture,balance:1000},
        };
        return axios.request(options)
    }
}
export const useGoogleSave = (data,key) => {

    return useQuery(
        'save '+key,
        ()=>saveGoogleUser(data),
        {
            retryOnMount:false,
            refetchOnWindowFocus:false,
        }
    )
}