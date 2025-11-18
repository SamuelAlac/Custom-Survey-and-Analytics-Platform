import { FaUserCircle } from "react-icons/fa"
import { useAuth } from "../../../../context/AuthContext"

const Profile = () => {

  const { user } = useAuth()
  console.log(user)

  return (
    <section>

      <div className='h-10 md:h-15 flex items-center justify-between'>
          <h1 className="text-[#050505] text-xl md:text-2xl text-center lg:text-start lg:text-4xl font-semibold">Profile</h1>
    
      </div>
      <div className="bg-white p-6 md:p-8 rounded-3xl overflow-hidden shadow-md shadow-black/20 w-full max-w-md mx-auto">
            <div className="text-black font-bold text-sm sm:text-base md:text-lg mb-4 text-center">
              <h1>Personal Information</h1>
            </div>
       
        <div className="flex justify-center mb-6">
          <FaUserCircle className='text-[#FBA02C] text-[144px]'/>
        </div>

        <div className="text-black text-sm sm:text-base md:text-lg mb-2 space-y-4 text-center">
              <div>
                <span className="text-black font-bold text-sm block mb-1">Student No:</span>
                <h1 className="text-lg font-semibold">{user?.id || 'Not available'}</h1>
              </div>
              <div>
                <span className="text-black font-bold text-sm block mb-1">Name:</span>
                <h1 className="text-lg font-semibold">{user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.username || 'Not available'}</h1>
              </div>
              <div>
                <span className="text-black font-bold text-sm block mb-1">Section:</span>
                <h1 className="text-lg font-semibold">{user?.section_name || 'Not assigned'}</h1>
              </div>
              <div>
                <span className="text-black font-bold text-sm block mb-1">Email:</span>
                <h1 className="text-lg font-semibold">{user?.email || 'Not available'}</h1>
              </div>
            </div>
     </div>
        
    </section>
  )
}

export default Profile