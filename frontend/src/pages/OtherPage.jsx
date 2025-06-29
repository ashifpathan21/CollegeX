import React from 'react'
import {useNavigate} from 'react-router-dom'

const OtherPage = () => {
    const navigate = useNavigate()
  return (
    <div className='bg-[#080b19f2] min-h-screen text-white w-screen flex justify-center items-center '>
        <div className='p-4 flex flex-col gap-2 items-center '>
             <h2 className='font-bold  text-xl  '>Not Found This Page !!</h2>
             <p onClick={() => navigate('/') } className='text-blue underline cursor-pointer '>Go to Home </p>
        </div>
      
    </div>
  )
}

export default OtherPage
