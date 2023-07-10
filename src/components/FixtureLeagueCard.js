import React from 'react'
import { FixtureCard } from './FixtureCard'

export const FixtureLeagueCard = ({data,toggleBettingModal}) => {
  return (
    <div className={`flex w-full flex-col mt-3 bg-[#0a1f3c] rounded`}>
        <p className='text-[#dbd9d8] font-medium lg:text-lg mx-5 mt-2'>{data[1][0].league.country +' - ' +data[1][0].league.name}</p>
        {
            data[1]?.map( (fixture, index) => {
                return <FixtureCard key={index} index={index} toggleBettingModal={toggleBettingModal} data={fixture} />
            })
        }
    </div>
  )
}
