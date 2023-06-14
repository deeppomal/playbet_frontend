import React,{useState} from 'react'

export const MyBetsCard = ({data,index}) => {

  const [isDetailsVisible,setIsDetailsVisible] = useState(false)
  return (
    <div className={`flex flex-col w-11/12 p-5 cursor-pointer ${index != 0 && 'border-t border-[#525252]'}`}
    onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
      <div className=' w-full flex items-center justify-center'>
        <div className='w-1/2 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium text-lg'>{data.home}</p>
        </div>
        <p className='text-center text-[#dbd9d8]'>v</p>
        <div className='w-1/2 flex items-center justify-center'>
            <p className='text-[#dbd9d8] font-medium text-lg'>{data.away}</p>
        </div>
      </div>
      {isDetailsVisible &&<div className='flex w-full h-36'>
        <div className='flex w-11/12 mt-7 justify-between'>
          <div className='flex flex-col items-center'>
            <p className='text-[#c7c6c6] font-semibold'>
              Stake
            </p>
            <input inputMode='numeric' className='bg-[#202020] border-2 mt-2 border-[#494949]
            p-2 rounded-sm text-[#c7c6c6] outline-none' placeholder='$'
            value={'$ '+data.betAmount} 
            disabled />
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-[#49da80] font-semibold'>
              Expected Return
            </p>
            <input type="text" className='bg-[#202020] border-2 mt-2 border-[#494949]
            p-2 rounded-sm text-[#c7c6c6] outline-none' placeholder='$'
            value={'$ '+ data.expectedReturn } disabled />
          </div>
        </div>
      </div>}
    </div>
  )
}
