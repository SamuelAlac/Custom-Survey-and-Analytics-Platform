import axios from '../../libs/axios'

export const getResponses = async () =>{
    try {
        const token = localStorage.getItem('access')
        const res = await axios.get('/core/survey-responses/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

export const deleteResponse = async (id: any) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        const res = await axios.delete(`/core/survey-responses/${id}/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data  
    } catch (error: any) {
        throw error.response?.data
    }
}