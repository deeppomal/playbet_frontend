import React,{useState,useRef,useEffect} from 'react'
import {Link } from "react-router-dom"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useGoogleSave } from '../hooks/useGoogleSave';

export const Login = () => {
    
    const [userData,setUserData] = useState([])

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => getUserDataGoogle(codeResponse.access_token),
        onError: (error) => console.log('Login Failed:', error)
    });

    const getUserDataGoogle = (access_token) => {
        const options = {
            method: 'GET',
            url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        };
        axios.request(options).then(data => {
            setUserData(data.data)
        })
    }
    const {data,refetch} = useGoogleSave(userData,userData?.email)

  return (
    <div className='min-h-screen bg-[#161616] flex items-center justify-center'>
       <div className='bg-gray-600 flex p-3 rounded-md items-center justify-center cursor-pointer'
        onClick={login}>
            <p className='font-semibold'>
                Login with Google
            </p>
        </div>     
    </div>
  )
}
