import React,{useState,useRef,useEffect} from 'react'
import {Link, useNavigate } from "react-router-dom"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useGoogleSave } from '../hooks/useGoogleSave';
import { useDispatch } from 'react-redux';
import { changeUser } from '../reducers/userReducer';


export const Login = () => {
    
    const dispatch = useDispatch()
    const [userData,setUserData] = useState([])
    const navigate = useNavigate();

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

    const {data} = useGoogleSave(userData,userData?.email)
    if(data) {
        dispatch(changeUser(data?.data))
        localStorage.setItem('userData', JSON.stringify(data?.data));
        navigate("/");
    }

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
