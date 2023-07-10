import React,{useEffect,useState} from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useGetBets } from '../hooks/useGetBets';
import { MyBetsCard } from './MyBetsCard';


export const UserProfile = () => {
    const navigate = useNavigate();
    const [bets,setBets] = useState([])
    const localUser = JSON.parse(localStorage.getItem('userData'));
    const logout = () => {
        localStorage.setItem('userData', JSON.stringify([]));
        navigate("/login");
    }
    const {data,isError,error,isLoading,refetch} = useGetBets(localUser.googleId)
    useEffect(()=>{
        setBets(bets => bets = data?.data?.reverse())
    },[data])
    useEffect(()=>{
        refetch()
    },[localUser.balance])

  return (
    <div>
        <div className='flex w-full justify-between p-4'>
            <div className='flex items-center'>
                <img src={localUser.photo} className='lg:w-16 lg:h-16 w-10 h-10 rounded-full' />
                <div className='ml-3'>
                    <p className='text-white lg:text-xl font-semibold'>{localUser.username}</p>
                    <p className='text-white lg:text-lg font-semibold'>$ {localUser.balance.toFixed(2)}</p>
                </div>
            </div>
            <div>
                <LogoutIcon className='text-white cursor-pointer' fontSize='medium' onClick={logout} />
            </div>
        </div>
        <div className='flex w-full flex-col p-3'>
            {
                isLoading ?
                <div className="grid justify-center items-center mt-3 ">
                    <div className="h-14 w-14 border-4 border-t-[#f3f3f3] border-[#1f5394] rounded-full animate-spin ">
                    </div>
                </div>
                :
                bets?.map((data,index) => {
                    return(
                        <MyBetsCard data={data} index={index} />
                    )
                })
            }
        </div>
    </div>
  )
}
