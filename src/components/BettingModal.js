import React,{useState} from 'react'
import { BettingCard } from './BettingCard'
import { useSelector } from 'react-redux'
import { getFixture } from '../reducers/fixtureReducer'
import { useFixtureBets } from '../hooks/useFixtureBets'
const dataD =[
  {
    id:1,
    team:'Real Madrid'
  },
  {
    id:2,
    team:'Draw'
  },
  {
    id:3,
    team:'Barcelona'
  },

]
export const BettingModal = ({toggleBettingModal}) => {

  const selectedFixture = useSelector(getFixture)

  const url = 'https://api-football-v1.p.rapidapi.com/v3/odds';
  const {data,isError,error,isLoading} = useFixtureBets(url,selectedFixture?.fixture?.id)

  const handleClick = (e) => {
    e.stopPropagation()
  }
  const [stakeInput,setStakeInput] = useState()
  const [expReturn,setExpReturn] = useState(0.00)
  const [selectedBet,setSelectedBet] = useState([])

  const handleBetChange = (bet) => {
    if(selectedBet.value === bet.value){
      setSelectedBet([])
      calculateReturn(stakeInput,0)
    }
    else{
      setSelectedBet(bet)
      calculateReturn(stakeInput,bet.odd)
    }     
  }
  const handleOnChange = (value) => { 
    if(!isNaN(value)){
      setStakeInput(value)
      calculateReturn(value,selectedBet?.odd)
    }
  }
  const calculateReturn = (value,odds) => {
    if(odds && value){
      let returnVal = (value * parseFloat(odds)).toFixed(2)
      setExpReturn(returnVal)
    }
    else{
      setExpReturn(0)
    }
  }
  return (
    <div className='bg-[#161616]/[0.9] h-full w-full 
    absolute top-0 left-0 z-20 flex items-center 
    justify-center cursor-pointer'
      onClick={toggleBettingModal}>
      <div className='w-1/2 bg-[#202020] z-30 cursor-default
      flex p-2 pb-4 flex-col items-center'
      onClick={(e) => handleClick(e)}>
        <p className='text-center font-semibold text-xl text-[#dbd9d8]'>Bets</p>
        <p className=' mt-3 font-semibold text-xl text-[#dbd9d8]'>{data?.data?.response[0]?.bookmakers[0]?.bets[0]?.name}</p>
        <div className='flex w-11/12 mt-1 justify-center'>
          {
            isLoading?
              <div className='mt-10'>
                <p className='text-center font-semibold text-xl text-[#dbd9d8]'>Bets are loading...</p>
              </div>
            :
            data?.data?.response < 1 ?
              <div className='mt-10'>
                <p className='text-center font-semibold text-xl text-[#dbd9d8]'>Bets are not available yet</p>
              </div>
            :
            data?.data?.response[0]?.bookmakers[0]?.bets[0]?.values?.map((item,index) => {
              return(
                <BettingCard key={item.id} index={index} data={item} handleBetChange={handleBetChange} selectedBet={selectedBet}/>
              )
            })
          }
        </div>
        <div className='flex w-11/12 mt-7 justify-between'>
          <div className='flex flex-col'>
            <p className='text-[#c7c6c6] font-semibold'>
              Stake
            </p>
            <input inputMode='numeric' className='bg-[#202020] border-2 mt-2 border-[#494949]
            p-2 rounded-sm text-[#c7c6c6] outline-none' placeholder='$'
            value={stakeInput} 
            onChange={(t) => handleOnChange(t.target.value)} />
          </div>
          <div className='flex flex-col'>
            <p className='text-[#49da80] font-semibold'>
              Expected Return
            </p>
            <input type="text" className='bg-[#202020] border-2 mt-2 border-[#494949]
            p-2 rounded-sm text-[#c7c6c6] outline-none' placeholder='$'
            value={'$ '+ expReturn } disabled />
          </div>
        </div>
        <div className='bg-[#161616] rounded-md w-1/4 p-2 cursor-pointer flex items-center justify-center mt-10'
        onClick={toggleBettingModal}>
          <p className='text-[#dbd9d8] font-medium text-lg'>Save</p>
        </div>
      </div>
      
    </div>
  )
}
