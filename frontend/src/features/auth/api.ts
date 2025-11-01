import axios from '../../libs/axios'

export const loginUser = async({ email, password, rememberMe} : { email: string; password: string, rememberMe: boolean }) =>{
    try {
        const res = await axios.post('/v1/auth/login', { email, password, remember_me: rememberMe })
        return res.data
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
}

export const getAuthState = async() =>{
    try {
        const res = await axios.get('/v1/auth/user')
        return res.data
    } catch (error) {
        console.log(`Failed to get authentication state: ${error}`)
    }
}

export const logoutUser = async () => {
  try {
    await axios.post('/v1/auth/logout');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};