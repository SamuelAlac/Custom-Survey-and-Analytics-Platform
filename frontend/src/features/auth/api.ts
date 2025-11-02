import axios from '../../libs/axios'

export const loginUser = async({ email, password, rememberMe} : { email: string; password: string, rememberMe: boolean }) =>{
    try {
        const res = await axios.post('/token/', { email, password, remember_me: rememberMe })
        return res.data
    } catch (error) {
      console.log(`Failed to login user: ${error}`)
    }
}

export const registerUser = async ({ fname, lname, email, password1, password2, section, tac }: 
{ fname: string, lname: string, email: string, password1: string, password2: string, section: string, tac: boolean }) =>{
  try {
    const res = await axios.post('/register/', {
      first_name: fname,
      last_name: lname,
      email,
      password1,
      password2,
      section,
      terms_and_condition:  tac
    })
    return res.data
  } catch (error) {
    console.log(`Failed to register user: ${error}`)
  }
}

export const verifyUser = async ({email, code}: { email: string, code:string }) =>{
  try {
    const res = await axios.post('/verify-code/',{ email, code })
    return res
  } catch (error) {
    console.log(`Failed to verify user: ${error}`)
  }
}

export const reVerifyUser = async ({email}: { email: string }) =>{
  try {
    const res = await axios.post('/resend-code/', { email })
    return res
  } catch (error) {
    console.log(`Failed to resend verifiction to user: ${error}`)
  }
}

export const logoutUser = async () => {
  try {
    const res = await axios.post('/logout/');
    return res.data
  } catch (error) {
    console.log(`Failed to logout user: ${error}`)
  }
};

export const getAuthState = async() =>{
    try {
        const res = await axios.get('/v1/auth/user/')
        return res.data
    } catch (error) {
        console.log(`Failed to get authentication state: ${error}`)
    }
}