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