import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { getUser } from '../reducers/userReducer';
import { BettingModal } from './BettingModal';
import { Calender } from './Calender'
import { FixtureContainer } from './fixtureContainer';
import { MyBets } from './MyBets';
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const [isBettingModalVisible,setIsBettingModalVisible] = 
    useState(false)
    const toggleBettingModal = () => {
      setIsBettingModalVisible(!isBettingModalVisible)
    }
    const[selectedDate,setSelectedDate] = useState('')
    const localUser = JSON.parse(localStorage.getItem('userData'));
    const storedUser = useSelector(getUser)
    const logout = () => {
      localStorage.setItem('userData', JSON.stringify([]));
      navigate("/login");
    }
  return (
    <div className='bg-[#161616] min-h-screen' >
      {isBettingModalVisible && <BettingModal toggleBettingModal={toggleBettingModal} />}
      <p className='text-white text-right pr-40 pt-12'>$ {localUser?.balance}</p>
      <p className='text-white text-right pr-40 pt-12 cursor-pointer' onClick={logout}>Logout</p>
      <div className="flex items-center flex-col z-10 pt-16">
        {/* <MyBets /> */}
        <Calender />
        <FixtureContainer toggleBettingModal={toggleBettingModal}  />
      </div>
      
    </div>
   
  )
}
