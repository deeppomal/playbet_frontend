import React from 'react'

export const MyBetsCard = ({toggleBettingModal}) => {
  return (
    <div className={`flex w-11/12 items-center justify-center
    p-5 cursor-pointer`}
    onClick={toggleBettingModal}>
        <div className='w-1/2 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium text-lg'>Real Madrid</p>
        </div>
        <div className='bg-[#494949] rounded-md 
        px-2 p-1'>
            <p className='text-center text-[#dbd9d8] text-xs'>10:00 AM</p>
        </div>
        <div className='w-1/2 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium text-lg'>Barcelona</p>
        </div>
       
    </div>
  )
}
