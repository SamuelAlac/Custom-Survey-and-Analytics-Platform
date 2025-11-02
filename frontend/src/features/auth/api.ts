import axios from '../../libs/axios'

export const loginUser = async({ email, password, rememberMe} : { email: string; password: string, rememberMe: boolean }) =>{
    try {
        const res = await axios.post('/token/', { email, password, remember_me: rememberMe })
        return res.data
    } catch (error) {
      console.log(`Failed to login: ${error}`)
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
    console.log(`Failed to register: ${error}`)
  }
}

export const logoutUser = async () => {
  try {
    await axios.post('/logout/');
    return { success: true };
  } catch (error) {
    return { success: false, error };
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