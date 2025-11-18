import { FaUserCircle } from "react-icons/fa"
import { useAuth } from "../../../../context/AuthContext"

const Profile = () => {

  const { user } = useAuth()
  console.log(user)

  return (
    <section>
        <FaUserCircle className='text-[#FBA02C] text-[144px]'/>
    </section>
  )
}

export default Profile