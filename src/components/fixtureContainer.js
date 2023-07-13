import React,{useState,useEffect} from 'react'
import { useFootballAPI } from '../hooks/useFootballAPI'
import { FixtureCard } from './FixtureCard'
import { useSelector, } from 'react-redux';
import { getDate } from '../reducers/dateReducer';
import { getUser } from '../reducers/userReducer';
import { FixtureLeagueCard } from './FixtureLeagueCard';
import { LeagueCard } from './leagueCard';
import { UserProfile } from './userProfile';

export const FixtureContainer = ({toggleBettingModal}) => {

  const dateStored = useSelector(getDate);
  const [selectedLeagues,setSelectedLeagues] = useState({})
  const [fixturelist,setFixtureList] = useState([])
  const [allLeagues,setAllLeagues] = useState([])
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';
  const {data,isError,error,isLoading,isFetched} = useFootballAPI('fixtures',url,dateStored,'3')
  // const {data,isError,error,isLoading} = useFootballAPI('fixtures',url,dateStored,'960')

  useEffect(()=>{
    setFixtureList(getFilteredFixtures())
    setAllLeagues(getFilteredFixtures())
  },[data])

  const getFilteredFixtures = () =>{
    let fixtures = data?.data?.response
    fixtures = fixtures?.filter( fixture => (new Date(fixture?.fixture?.timestamp * 1000)) > (new Date()))
    let groupedFixtures = {}
    for(let i = 0; i<fixtures?.length; i++){
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

  const handleSelectedLeague = (id) => {
    let leagueIds = selectedLeagues
    leagueIds[id] = leagueIds[id] ? leagueIds[id] + 1 : 1
    setSelectedLeagues(leagueIds)
    filterLeagueFixtures()
  }
  const filterLeagueFixtures = () => {
    let leagues = []
    let filteredFixtures = []
    let allFixtures = getFilteredFixtures()
    for(let i in selectedLeagues){
      if(selectedLeagues[i] % 2 !=0){
        leagues.push(i)
      }
    }
    
    for(let i in leagues){
      for(let j in allFixtures){
        if(leagues[i] == allFixtures[j][0].id){
          filteredFixtures.push(allFixtures[j])
          break
        }
      }
    }
    if(leagues.length == 0){
      setFixtureList(allFixtures)
    }
    else{
      setFixtureList(filteredFixtures)
    }
  }
  if(isLoading){
    return(
      <div className='flex justify-center p-4 mt-5 w-full h-screen'>
        <div className="grid justify-center pt-10 items-start">
          <div className={`h-20 w-20 border-4 border-t-[#f3f3f3] border-[#1f5394]  rounded-full animate-spin `}>
          </div>
        </div>
      </div>
    )
  }
  if(!isLoading && fixturelist == 0){
    return(
      <div className={`w-1/2 flex px-4 flex-col`}>
        <div className='w-full bg-[#0a1f3c] rounded p-4 lg:mt-10 mt-5 flex flex-col items-center justify-center'>
          <p className='lg:text-2xl text-lg text-gray-100 font-bold'>No fixtures left for today!</p>
          <p className='lg:text-lg text-gray-400 mt-3'>There aren't any fixtures left today, please change the date to bet on future matches</p>
        </div>
        <div className='w-full bg-[#0a1f3c] rounded-lg mt-3'>
          <UserProfile />
        </div>
      </div>
    )
  }
  return (
    <div className='w-full mt-5 rounded-md flex p-1 justify-center'>
      <div className='lg:flex w-1/4 px-4 hidden'>
        <div className='w-full bg-[#0a1f3c] rounded-lg mt-3'>
         {
            allLeagues.map((data) => {
              return(
                <LeagueCard data={data} handleSelectedLeague = {handleSelectedLeague} />
              )
            })
           
          }
        </div>
      </div>
      <div className='flex w-11/12 lg:w-2/4 items-center flex-col'>
        {
          fixturelist.map((data, index) => {
            return(
              <FixtureLeagueCard toggleBettingModal={toggleBettingModal} data={data} />
            )
          })
        }
      </div>
      <div className={`lg:w-1/4 w-1/3 lg:flex hidden lg:px-4 px-1 `}>
        <div className='w-full bg-[#0a1f3c] rounded-lg mt-3'>
          <UserProfile />
        </div>
      </div>
    </div>
  )
}
