import React,{useState,useRef,useEffect} from 'react'
import {Link, useNavigate } from "react-router-dom"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useGoogleSave } from '../hooks/useGoogleSave';
import { useDispatch } from 'react-redux';
import { changeUser } from '../reducers/userReducer';
import GoogleIcon from '@mui/icons-material/Google';

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
    <div className='min-h-screen flex w-full bg-gradient-to-r from-[#041327] via-[#091f3f] to-[#0d264d]'>
        <div className='w-1/2  justify-center flex'>
            <p className='text-[#4f8bd4] font-extrabold text-4xl top-10 w-1/2 ml-12 fixed'>PlayBet</p>
            <img src='./benzi.png' className='h-screen' />
        </div>
        <div className='w-1/2 flex justify-center items-start flex-col p-4'>


            <div className='p-16'>
                <p className='mt-5 text-gray-50 text-5xl font-semibold w-full'>Get Started With $5000</p>
                <p className='mt-12 text-[#427dc5] text-4xl font-semibold w-full'>Build Your Luck With</p>
                <p className='mt-1 text-[#427dc5] text-4xl font-semibold w-full'>Every Bet</p>
                <p className=' text-[#b1b1b1] text-2xl font-semibold mt-20'>Create an account</p>
                <div className='bg-gray-200 mt-3 flex p-4 rounded-md items-center justify-center cursor-pointer'
                onClick={login}>
                    <GoogleIcon className='text-[#1f5394]' />
                    <p className='font-semibold mx-3'>
                        Login with Google
                    </p>
                </div>     
            </div>
        </div>
    </div>
  )
}
