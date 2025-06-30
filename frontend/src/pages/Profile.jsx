import React, { useContext , useEffect } from 'react';
import Navbar from '../components/Home/Navbar.jsx';
import { useSelector , useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'


const Profile = () => {
      const navigate = useNavigate()
      const user = useSelector((state) => state.user.user)
   
  return (
    <div className='min-h-screen w-screen bg-[#080b19f2]  ' >
        <Navbar/>
        
     <div className='px-4 flex flex-col md:flex-row lg:flex-row gap-10 '>
         <div className='flex items-center gap-10  w-screen h-full p-4 mt-5  '>
           {/* left side image  */}
            <div className='h-20 w-20 rounded-full overflow-hidden  shadow-md shadow-cyan-300  '>
                 <img src={user?.profilePic} className='h-20 shadow-sm  aspect-square w-20 rounded-full object-cover ' />
            </div>
            

            {/* right part detail  */}
            <div className='flex gap-1 justify-start  flex-start flex-col  text-white max-w-1/1.5 p-1 '>
                <h4 className='font-semibold text-xl '>{user?.fullName}</h4>
                <p className='text-sm text-slate-500'>{user?.collegeEmail}</p>
                <p className='text-sm text-slate-300 text-wrap'>{user?.college}</p>
                <p className='text-sm text-slate-300 text-wrap'>{user?.branch}</p>
                 
            </div>
        </div>

        <div className='w-full flex justify-center items-center '>
              <button className=' rounded-2xl  px-6 w-full  hover:shadow-lg duration-200  text-white shadow shadow-cyan-300 h-auto inline  p-3 '>
                 Edit Profile 
             </button>
       </div>
     </div>
       

    <div className='w-full p-3 gap-5  flex flex-col md:flex-row lg:flex-row  justify-center font-semibold text-white items-center mt-5'>
                  <button onClick={() => navigate('/myProducts')} className=' rounded-2xl shadow hover:shadow-lg duration-200  shadow-cyan-400 w-full p-3 ' >My Products</button>
                  <button onClick={() => navigate('/')} className=' rounded-2xl shadow hover:shadow-lg duration-200  shadow-cyan-400 w-full p-3 ' >Log Out</button>
    </div>
      
    </div>
  )
}

export default Profile
