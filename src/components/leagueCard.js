import React,{useState} from 'react'

export const LeagueCard = ({data,handleSelectedLeague}) => {
    const [isSelected,setIsSelected] = useState(false)
    const handleOnClick = () => {
      setIsSelected(!isSelected)
      handleSelectedLeague(data[1][0].league.id)
    }
  return (
    <div className={`flex items-center  my-3 p-1 py-3 mx-3 rounded-lg cursor-pointer ${isSelected ? 'bg-[#071429]' : 'bg-[#0a1f3c]'}`}
    onClick={handleOnClick}>
        <div className=''>
            <img src={data[1][0].league.logo} className='w-11 h-11' />
        </div>
        <div className='ml-3 flex flex-col'>
            <p className='text-gray-50 font-semibold text-lg w-full  overflow-hidden whitespace-nowrap text-ellipsis'>{data[1][0].league.name}</p>
            <p className='text-gray-400'>{data[1][0].league.country}</p>
        </div>
    </div>
  )
}
