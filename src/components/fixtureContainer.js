import React from 'react'
import { useFootballAPI } from '../hooks/useFootballAPI'
import { FixtureCard } from './FixtureCard'
import { useSelector, } from 'react-redux';
import { getDate } from '../reducers/dateReducer';
import { getUser } from '../reducers/userReducer';
import { FixtureLeagueCard } from './FixtureLeagueCard';

export const FixtureContainer = ({toggleBettingModal}) => {

  const dateStored = useSelector(getDate);

  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';
  const {data,isError,error,isLoading} = useFootballAPI('fixtures',url,dateStored,'3')
  // const {data,isError,error,isLoading} = useFootballAPI('fixtures',url,dateStored,'960')

  const getFilteredFixtures = () =>{
    let fixtures = data?.data?.response
    fixtures = fixtures.filter( fixture => (new Date(fixture?.fixture?.timestamp * 1000)) > (new Date()))
    let groupedFixtures = {}
    for(let i = 0; i<fixtures.length; i++){
      groupedFixtures[fixtures[i].league.id] = groupedFixtures[fixtures[i].league.id] ? [...groupedFixtures[fixtures[i].league.id],fixtures[i]] : [fixtures[i]]
    }
    const leagueCodes = ['1','3','39','140','135','78','61'];
    let filteredFixtures = []
    for(let i in groupedFixtures){
      if(leagueCodes.indexOf(i) != -1){
        filteredFixtures.unshift([{id:i},groupedFixtures[i]])
      }
      else{
        filteredFixtures.push([{id:i},groupedFixtures[i]])
      }
    }
    return filteredFixtures
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
    <div className='w-1/2 mt-5
    rounded-md flex items-center flex-col p-1'>
        {
          getFilteredFixtures().map((data, index) => {
            return(
              <FixtureLeagueCard toggleBettingModal={toggleBettingModal} data={data} />
            )
          })
        }
    </div>
  )
}
