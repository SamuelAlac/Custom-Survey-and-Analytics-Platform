import axios from '../../libs/axios'

export const loginUser = async({ id, password, rememberMe} : { id: string; password: string, rememberMe: boolean }) =>{
  try {
      const res = await axios.post('/auth/token/', { id, password, remember_me: rememberMe })
      return res.data
  } catch (error: any) {
    if(error.response?.data){
      throw error.response?.data
    }
  }
}

export const registerUser = async ({ id, fname, lname, email, password1, password2, section, tac }: 
{ id: string, fname: string, lname: string, email: string, password1: string, password2: string, section: string, tac: boolean }) =>{
  try {
    const res = await axios.post('/auth/register/', {
      id,
      first_name: fname,
      last_name: lname,
      email,
      password1,
      password2,
      section,
      terms_and_condition:  tac
    })
    return res.data
  } catch (error: any) {
    if (error.response?.data){
      throw error.response?.data
    }
  }
}

export const verifyUser = async ({email, code}: { email: string, code:string }) =>{
  try {
    const res = await axios.post('/auth/verify-code/',{ email, code })
    return res.data
  } catch (error: any) {
    return { message: 'failed to verify user', success: false }
  }
}

export const reVerifyUser = async ({email}: { email: string }) =>{
  try {
    const res = await axios.post('/auth/resend-code/', { email })
    return res
  } catch (error: any) {
    console.log(`Failed to resend verifiction to user: ${error}`)
  }
}

export const getMyAccount = async() =>{
  try {
      const token = localStorage.getItem('access')
      if (!token) throw new Error('No access token found')

      const res = await axios.get('/auth/my-account/',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
  } catch (error: any) {
      console.log(`Failed to get your account: ${error}`)
  }
}

export const logoutUser = async () => {
  try {

    const token = localStorage.getItem('access')
    const res = await axios.post('/auth/logout/',{
      headers: {
            Authorization: `Bearer ${token}`
      }
    });
    return res.data
  } catch (error: any) {
    console.log(`Failed to logout user: ${error}`)
  }
};