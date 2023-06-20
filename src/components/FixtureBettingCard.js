import React,{useState} from 'react'
import { BettingCard } from './BettingCard'
import { useDispatch, useSelector } from 'react-redux'
import { getFixture } from '../reducers/fixtureReducer'
import { useFixtureBets } from '../hooks/useFixtureBets'
import { useAddBet } from '../hooks/useAddBet'
import { changeUser, getUser } from '../reducers/userReducer'
import { useUpdateUser } from '../hooks/useUpdateUser'

export const FixtureBettingCard = ({data,toggleBettingCard}) => {
    const dispatch = useDispatch()
  const selectedFixture = useSelector(getFixture)
  const storedUser = useSelector(getUser)
  const localUser = JSON.parse(localStorage.getItem('userData'));

  const [stakeInput,setStakeInput] = useState()
  const [expReturn,setExpReturn] = useState(0.00)
  const [selectedBet,setSelectedBet] = useState([])
  const [betError,setBetError] = useState('')


  const {data: addBetData,refetch} = useAddBet({
    userId:localUser?.googleId,
    fixtureId:data?.data?.response[0]?.fixture?.id,
    home:selectedFixture?.teams?.home?.name,
    away:selectedFixture?.teams?.away?.name,
    betAmount:stakeInput,
    expectedReturn:expReturn,
    selectedTeam:selectedBet.value,
    hasWon:false,
    amountWon:0,
    oddsDetail:data?.data?.response[0]?.bookmakers[0]?.bets[0]?.values,
    isResultChecked:false,      
  })
  const {data:dataUpdatedUser,refetch: refetchUpdatedUser} = useUpdateUser(localUser.googleId,stakeInput)

  const handleClick = (e) => {
    e.stopPropagation()
  }
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
  const checkBetLegibility = () => {
    let legibility = {
      isPossible: false,
      message:''
    }
    const localUser = JSON.parse(localStorage.getItem('userData'));
    if(localUser.balance < stakeInput){
      legibility.isPossible= false
      legibility.message =  'You don\'t have enough balance, try again with lesser bet amount'
    }
    else{
      legibility.isPossible= true
      legibility.message =  ''
    }
    return legibility
  }
  const handleSaveBtn = async () => {
    let betLigibility = checkBetLegibility()
    if(betLigibility.isPossible){
      const localUser = JSON.parse(localStorage.getItem('userData'));
      let tempUser = localUser
      tempUser.balance = localUser.balance - stakeInput
      localStorage.setItem('userData', JSON.stringify(tempUser) );
      window.dispatchEvent(new Event("balanceUpdate"));
      await refetchUpdatedUser()
      refetch()
      toggleBettingCard()
    }
    else{
      setBetError(betLigibility.message)
    }
  }
  return (
        <div className='w-full bg-[#080808] z-30 cursor-default
        flex p-2 pb-4 flex-col items-center '
        onClick={(e) => handleClick(e)}>
            <p className=' mt-3 font-semibold text-xl text-[#dbd9d8]'>{data?.data?.response[0]?.bookmakers[0]?.bets[0]?.name}</p>
            <div className='flex w-11/12 mt-1 justify-center'>
            {
                data?.data?.response < 1 ?
                <div className='mt-10'>
                    <p className='text-center font-semibold text-xl text-[#dbd9d8]'>Bets are not available yet</p>
                </div>
                :
                data?.data?.response[0]?.bookmakers[0]?.bets[0]?.values?.map((item,index) => {
                return(
                    <BettingCard key={index} index={index} data={item} handleBetChange={handleBetChange} selectedBet={selectedBet}/>
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
            {betError.length > 0 &&<p className='text-center text-red-500 mt-3'>{betError}</p>}
            <div className='bg-[#161616] rounded-md w-1/4 p-2 cursor-pointer flex items-center justify-center mt-10'
            onClick={handleSaveBtn}>
            <p className='text-[#dbd9d8] font-medium text-lg'>Save</p>
            </div>
        </div>
  )
}
