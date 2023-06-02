import React from 'react'
import { useDispatch } from 'react-redux';
import { changeFixture } from '../reducers/fixtureReducer';

export const FixtureCard = ({index,toggleBettingModal,data}) => {

  const dispatch = useDispatch();

  const getLocalTime = (timestamp) => {
    return new Date(timestamp*1000).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})
  }
  const handleClick = () => {
    dispatch(changeFixture(data))
    toggleBettingModal()
  }

  return (
    <div className={`flex w-full items-center justify-center
    p-5 cursor-pointer `}
    onClick={handleClick}>
        <div className='w-1/3 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium text-lg'>{data?.teams?.home?.name}</p>
        </div>
        <div className='bg-[#494949] rounded-md 
        px-2 p-1'>
            <p className='text-center text-[#dbd9d8] text-xs'>{getLocalTime(data?.fixture?.timestamp)}</p>
        </div>
        <div className='w-1/3 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium text-lg'>{data?.teams?.away?.name}</p>
        </div>
    </div>
  )
}
