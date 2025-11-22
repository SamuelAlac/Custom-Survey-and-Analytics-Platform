import { Link } from "react-router-dom"
const Index = () => {
  return (
    <main className="bg-[url(/auth_main_bg.svg)] bg-cover flex justify-center items-center min-h-screen w-full">
        <div className="bg-white w-220 h-120 flex justify-between rounded-4xl">
          <div className="flex-1 flex justify-center items-center m-1.5 
          bg-[url(/index_icon.svg)] bg-cover rounded-l-4xl bg-black/10 bg-blend-overlay">
            <figure className="flex flex-col items-center">
              <img src="survey_corps_logo.svg" alt="" />
                <h1 className="text-white font-bold text-2xl">Custom Survey</h1>
                <h1 className="text-white font-bold text-2xl">and Analytics Platform</h1>
            </figure>
          </div>
          <div className='w-110 bg-white flex flex-col justify-center items-center space-y-2.5 rounded-r-4xl'>
            <h2 className='text-black text-xl md:text-2xl font-bold'>Welcome to Survey Corps</h2>
            <div className='text-justify w-52 md:w-71'>
                <p className='text-[#ACA6A7]'>
                  Making every voice heard in education. Log in to participate in
                  surveys or create meaningful feedback opportunities.
                </p>
            </div>
            <p className='text-black text-lg md:text-xl font-bold mt-5'>Log in as</p>
            
            <div className='text-center md:mt-5 flex flex-col items-center space-y-5 text-black'>
                  <Link to='Auth/Student-Login' className='bg-[#FBA02C] hover:bg-[#f3951a] w-50 md:w-75 py-2 md:py-5 rounded-4xl shadow-lg shadow-black/20 font-semibold'>As Student</Link>
                <Link to='Auth/Teacher-Login' className='bg-[#FBA02C] hover:bg-[#f3951a] w-50 md:w-75 py-2 md:py-5 rounded-4xl shadow-lg shadow-black/20 font-semibold'>As Teacher</Link>
            </div>
        </div>
        </div>
    </main>
  )
}

export default Index