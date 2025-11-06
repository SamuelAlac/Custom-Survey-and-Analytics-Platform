import { Link } from "react-router-dom"
const Index = () => {
  return (
    // <main className='bg-[#FBA02C] flex justify-center items-center min-h-screen w-full'>
    //       <div className='bg-white w-full m-5 md:m-0 md:w-140 h-100 md:h-140 rounded-4xl flex flex-col justify-center items-center space-y-3
    //       shadow-lg shadow-black/30'>
    //           <h2 className='text-black text-xl md:text-3xl font-bold'>Welcome to Survey Corps</h2>
    //           <div className='text-center w-52 md:w-90'>
    //               <p className='text-[#ACA6A7]'>Choose to log in as a student or as a teacher.</p>
    //           </div>
    //           <p className='text-black text-lg md:text-xl font-bold mt-2'>Log in as</p>
              
    //           <div className='text-[#F37611] text-center md:mt-5 flex flex-col items-center space-y-5'>
    //                 <Link to='Auth/Student-Login' className='bg-[#FFD9B3] w-50 md:w-75 py-2 md:py-5 rounded-4xl shadow-lg shadow-black/20'>As Student</Link>
    //               <Link to='Auth/Teacher-Login' className='bg-[#FFD9B3] w-50 md:w-75 py-2 md:py-5 rounded-4xl shadow-lg shadow-black/20'>As Teacher</Link>
    //           </div>
    //       </div>
    //   </main>
    <main className="bg-[url(/index_bg.svg)] bg-cover flex justify-center items-center min-h-screen w-full">

        <div className='bg-white w-full m-5 md:m-0 md:w-140 h-100 md:h-140 rounded-4xl flex flex-col justify-center items-center space-y-3
        shadow-lg shadow-black/30'>
            <h2 className='text-black text-xl md:text-3xl font-bold'>Welcome to Survey Corps</h2>
            <div className='text-center w-52 md:w-90'>
                <p className='text-[#ACA6A7]'>Choose to log in as a student or as a teacher.</p>
            </div>
            <p className='text-black text-lg md:text-xl font-bold mt-2'>Log in as</p>
            
            <div className='text-[#F37611] text-center md:mt-5 flex flex-col items-center space-y-5'>
                  <Link to='Auth/Student-Login' className='bg-[#FFD9B3] w-50 md:w-75 py-2 md:py-5 rounded-4xl shadow-lg shadow-black/20'>As Student</Link>
                <Link to='Auth/Teacher-Login' className='bg-[#FFD9B3] w-50 md:w-75 py-2 md:py-5 rounded-4xl shadow-lg shadow-black/20'>As Teacher</Link>
            </div>
        </div>
    </main>
  )
}

export default Index