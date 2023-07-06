import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { getFixture } from '../reducers/fixtureReducer'

export const BettingCard = ({data,index,handleBetChange,selectedBet}) => {
    const [isSelected,setIsSelected] = useState('')
    const selectedFixture = useSelector(getFixture)

    const toggleSelection = () => {
        if(isSelected === data?.value){
            setIsSelected('')
        }
        else{
            setIsSelected(data?.value)
        }     
    }
    const handleBetClick = () => {
        handleBetChange(data)
        // toggleSelection()
    }
  return (
    <div className={`p-3 w-1/3 ${index === 2 ? 'border' : 
    'border-y border-l'} border-[#0a1f3c] flex items-center
    justify-center cursor-pointer 
    ${selectedBet?.value === data?.value ?'bg-[#071429]' :'bg-[#0a1f3c]'}`}
    onClick={handleBetClick}>
        <div className='flex items-center justify-center flex-col'>
            <p className='text-[#dbd9d8] font-medium '>{index === 0 ? selectedFixture?.teams?.home?.name : index === 2 ? selectedFixture?.teams?.away?.name : data?.value}</p>
            <p className='text-[#dbd9d8] font-light mt'>{data?.odd}</p>
        </div>
    </div>
  )
}
