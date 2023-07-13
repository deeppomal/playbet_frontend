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
    <div className='min-h-screen flex w-full flex-col lg:flex-row
    bg-gradient-to-r from-[#041327] via-[#091f3f] to-[#0d264d]'>
        <p className='text-[#4f8bd4] font-extrabold lg:text-4xl text-2xl lg:top-10 top-5 lg:ml-12 ml-5 fixed'>PlayBet</p>
        <div className='lg:w-1/2 justify-center flex h-screen'>
            <img src='./benzi.png' className='h-3/4 lg:h-screen' />
        </div>
        <div className='w-full -mt-20 flex justify-center lg:hidden'>
            <div className='bg-gray-200 w-2/3 flex  p-3 rounded-md items-center justify-center cursor-pointer'
                onClick={login}>
                <GoogleIcon className='text-[#1f5394]' />
                <p className='font-semibold mx-3'>
                    Login with Google
                </p>
            </div>     
        </div>
        
        <div className='lg:w-1/2 lg:flex hidden justify-center items-start flex-col p-4'>
            <div className='lg:p-16 w-full'>
                <p className='mt-5 text-gray-50 lg:text-5xl text-3xl font-semibold w-full'>Get Started With $5000</p>
                <p className='mt-12 text-[#427dc5] lg:text-4xl text-2xl font-semibold w-full'>Build Your Luck With</p>
                <p className='mt-1 text-[#427dc5] lg:text-4xl text-2xl font-semibold w-full'>Every Bet</p>
                <p className=' text-[#b1b1b1] lg:text-2xl text-xl font-semibold lg:mt-20 mt-10'>Create an account</p>
                <div className='bg-gray-200 mt-3 w-full lg:w-1/2  flex lg:p-4 p-3 rounded-md items-center justify-center cursor-pointer'
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
