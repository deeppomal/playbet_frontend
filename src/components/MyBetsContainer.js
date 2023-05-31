import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useGetBets } from '../hooks/useGetBets'
import { getUser } from '../reducers/userReducer'
import { MyBetsCard } from './MyBetsCard'

export const MyBetsContainer = ({toggleBettingModal}) => {

  const localUser = JSON.parse(localStorage.getItem('userData'));
  const storedUser = useSelector(getUser); 

  const {data,refetch} = useGetBets(localUser?.googleId ? localUser.googleId : storedUser.googleId);

  return (
    <div className='bg-[#202020] w-full mt-2
    rounded-md flex items-center flex-col p-1'>
      {
        data?.data.reverse().slice(0,3).map((item,index) => {
          return(
            <MyBetsCard key={item._id} toggleBettingModal={toggleBettingModal} index={index} data={item} />
          )
        })
      }
    </div>
  )
}
