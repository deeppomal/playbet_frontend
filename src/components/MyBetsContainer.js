import React from 'react'
import { MyBetsCard } from './MyBetsCard'

export const MyBetsContainer = ({toggleBettingModal}) => {
  return (
    <div className='bg-[#202020] w-full mt-2
    rounded-md flex items-center flex-col p-1'>
        <MyBetsCard toggleBettingModal={toggleBettingModal} />
    </div>
  )
}
