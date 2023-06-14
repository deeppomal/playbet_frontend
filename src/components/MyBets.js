import React from 'react'
import { MyBetsContainer } from './MyBetsContainer'

export const MyBets = ({toggleBettingModal}) => {
  return (
    <div className='w-1/2 mt-4'>
        <div className='flex justify-between items-baseline'>
        <p className='text-[#dbd9d8] font-semibold text-lg'>My Bets</p>
        <p className='text-[#dbd9d8] cursor-pointer font-thin text-sm'>See all</p>
        </div>
        <MyBetsContainer   />
    </div>
  )
}
