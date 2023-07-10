import React,{useState} from 'react'

export const MyBetsCard = ({data,index}) => {

  const [isDetailsVisible,setIsDetailsVisible] = useState(false)
  return (
    <div className={`flex flex-col w-full rounded cursor-pointer ${data.hasWon ?  'bg-[#4CAF50]' : data.isResultChecked ? 'bg-[#EF5350]' : 'bg-[#071429]'}   mt-3`}
    onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
      <div className=' w-full flex items-center justify-center p-3'>
        <div className='w-1/2 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium  lg:text-lg'>{data.home}</p>
        </div>
        <p className='text-center text-[#dbd9d8]'>v</p>
        <div className='w-1/2 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium lg:text-lg'>{data.away}</p>
        </div>
      </div>
      {isDetailsVisible &&<div className='flex w-full px-3 mt-2 pb-7'>
        <div className='flex w-full bg-[#0a1f3c] rounded p-2 justify-around'>
          <div className='flex items-center flex-col'>
            <p className='text-gray-50 font-normal'>Invested</p>
            <p className='text-white lg:text-xl font-semibold mt-3'>$ {data.betAmount}</p>
          </div>
          <div className='flex items-center flex-col'>
            <p className='text-gray-50 font-normal'>Won</p>
            <p className='text-white lg:text-xl font-semibold mt-3'>$ {data.amountWon}</p>
          </div>
        </div>
      </div>}
    </div>
  )
}
