import React,{useState,useEffect} from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSelector, useDispatch } from 'react-redux';
import { changeDate,getDate } from '../reducers/dateReducer';

export const Calender = () => {

    const dispatch = useDispatch();

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const [date,setDate] = useState(new Date())

    useEffect(()=>{
        dispatch(changeDate(getStoreFormatDate()))
    },[])

    const handleLeftClick = () => {
        let threeDayAgo = new Date(new Date().setDate(new Date().getDate()))
        if(threeDayAgo.getDate() != date.getDate()){
            date.setDate(date.getDate() - 1);
            let dayBefore = new Date(date)
            setDate(dayBefore)
            dispatch(changeDate(getStoreFormatDate()))
        }
    }
    const handleRightClick = () => {
        let threeDayAfter = new Date(new Date().setDate(new Date().getDate()+3))
        if(threeDayAfter.getDate() != date.getDate()){
            date.setDate(date.getDate() + 1);
            let dayAfter = new Date(date)
            setDate(dayAfter)
            dispatch(changeDate(getStoreFormatDate()))
        }
    }
    const getFormattedDate = () =>{
        return month[date.getMonth()] + ' ' + date.getDate()
    }
    const getStoreFormatDate = () => {
        let yourDate = date
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        return yourDate.toISOString().split('T')[0]
    }
  return (
    <div className='w-1/2 mt-4 flex items-center justify-evenly'>
        <ArrowLeftIcon className='text-[#dbd9d8] cursor-pointer'
        fontSize='large' onClick={handleLeftClick} />
        <p className='text-[#dbd9d8] font-semibold text-lg'>{getFormattedDate()}</p>
        <ArrowRightIcon className='text-[#dbd9d8] cursor-pointer' 
        fontSize='large' onClick={handleRightClick} />
    </div>
  )
}
