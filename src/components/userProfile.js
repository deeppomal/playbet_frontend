import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useGetBets } from '../hooks/useGetBets';
import { MyBetsCard } from './MyBetsCard';
export const UserProfile = () => {
    const navigate = useNavigate();
    const localUser = JSON.parse(localStorage.getItem('userData'));
    const logout = () => {
        localStorage.setItem('userData', JSON.stringify([]));
        navigate("/login");
    }
    const {data,isError,error,isLoading} = useGetBets(localUser.googleId)
  return (
    <div>
        <div className='flex w-full justify-between p-4'>
            <div className='flex items-center'>
                <img src={localUser.photo} className='w-16 h-16 rounded-full' />
                <div className='ml-3'>
                    <p className='text-white text-xl font-semibold'>{localUser.username}</p>
                    <p className='text-white text-lg font-semibold'>$ {localUser.balance.toFixed(2)}</p>
                </div>
            </div>
            <div>
                <LogoutIcon className='text-white cursor-pointer' fontSize='medium' onClick={logout} />
            </div>
        </div>
        <div className='flex w-full flex-col p-3'>
            {
                data?.data?.reverse().map((data,index) => {
                    return(
                        <MyBetsCard data={data} index={index} />
                    )
                })
            }
        </div>
    </div>
  )
}
