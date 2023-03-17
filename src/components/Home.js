import React,{useState} from 'react'
import { BettingModal } from './BettingModal';
import { Calender } from './Calender'
import { FixtureContainer } from './fixtureContainer';
import { MyBets } from './MyBets';

export const Home = () => {
    const [isBettingModalVisible,setIsBettingModalVisible] = 
    useState(false)
    const toggleBettingModal = () => {
      setIsBettingModalVisible(!isBettingModalVisible)
    }
    const[selectedDate,setSelectedDate] = useState('')
    
  return (
    <div className='bg-[#161616] min-h-screen relative' >
      {isBettingModalVisible && <BettingModal toggleBettingModal={toggleBettingModal} />}
     
      <div className="flex items-center flex-col z-10 pt-16">
        <MyBets toggleBettingModal={toggleBettingModal}  />
        <Calender />
        <FixtureContainer toggleBettingModal={toggleBettingModal}  />
      </div>
      
    </div>
   
  )
}
