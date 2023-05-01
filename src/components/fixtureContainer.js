import React from 'react'
import { useFootballAPI } from '../hooks/useFootballAPI'
import { FixtureCard } from './FixtureCard'
import { useSelector, } from 'react-redux';
import { getDate } from '../reducers/dateReducer';
import { getUser } from '../reducers/userReducer';

export const FixtureContainer = ({toggleBettingModal}) => {

  const dateStored = useSelector(getDate);

  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';
  const {data,isError,error,isLoading} = useFootballAPI('fixtures',url,dateStored,'39')
  // const {data,isError,error,isLoading} = useFootballAPI('fixtures',url,dateStored,'960')

  const getFilteredFixtures = () =>{
    let fixtures = data?.data?.response
    return fixtures.filter( item => (new Date(item?.fixture?.timestamp * 1000)) > (new Date()))
  }
  if(isLoading){
    return(
      <div className='mt-10'>
        <p className='text-center font-semibold text-xl text-[#dbd9d8]'>Fixtures are loading...</p>
      </div>
    )
  }
  if(getFilteredFixtures().length < 1) {
    return(
      <div className='mt-10'>
        <p className='text-center font-semibold text-xl text-[#dbd9d8]'>There are no fixtures today</p>
      </div>
    )
  }
  return (
    <div className='bg-[#202020] w-1/2 mt-5
    rounded-md flex items-center flex-col p-1'>
        {
          getFilteredFixtures().map((item, index) => {
            return(
              <FixtureCard key={index} index={index} toggleBettingModal={toggleBettingModal} data={item} />
            )
          })
        }
    </div>
  )
}
