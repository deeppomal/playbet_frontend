import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { changeFixture } from '../reducers/fixtureReducer';
import { useFixtureBets } from '../hooks/useFixtureBets';
import { FixtureBettingCard } from './FixtureBettingCard';

export const FixtureCard = ({data}) => {

  const [isBettingCardVisible,setIsBettingModalVisible] = useState(false)
  const dispatch = useDispatch()
  const url = 'https://api-football-v1.p.rapidapi.com/v3/odds';
  const {data:betData,isLoading,isFetched,refetch:refetchBetData} = useFixtureBets(url,data?.fixture?.id)
  
  const getLocalTime = (timestamp) => {
    return new Date(timestamp*1000).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})
  }
  const handleClick = () => {
    dispatch(changeFixture(data))
    !isBettingCardVisible && refetchBetData()
    setIsBettingModalVisible(!isBettingCardVisible)
  }
  const toggleBettingCard = () => {
    setIsBettingModalVisible(!isBettingCardVisible)
  }

  return (
    <div className={` `} >
      <div className='flex w-full items-center justify-between p-5 cursor-pointer' onClick={handleClick}>
        <div className='w-1/3 flex justify-end'>
            <p className='text-[#dbd9d8] font-medium text-lg
            overflow-hidden whitespace-nowrap text-ellipsis'>{data?.teams?.home?.name}</p>
        </div>
        <div className='bg-[#071429] rounded-md 
        px-2 mx-2 p-1'>
            <p className='text-center text-[#dbd9d8] text-xs'>{getLocalTime(data?.fixture?.timestamp)}</p>
        </div>
        <div className='w-1/3 flex '>
            <p className='text-[#dbd9d8] font-medium text-lg 
            overflow-hidden whitespace-nowrap text-ellipsis' >{data?.teams?.away?.name}</p>
        </div>
      </div>
      {isBettingCardVisible && isFetched &&<div className='flex'>
        <FixtureBettingCard data={betData} toggleBettingCard={toggleBettingCard}/>
      </div>}
    </div>
  )
}
