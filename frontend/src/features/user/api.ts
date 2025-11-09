import axios from '../../libs/axios'
import { jwtDecode } from 'jwt-decode'

export const getUserSurveys = async () =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        // const decoded: any = jwtDecode(token)
        // const userID = decoded.user_id

        const res = await axios.get(`/auth/user-surveys/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

export const getUserResponses = async () =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        
        const res = await axios.get('/auth/user-responses/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}