import axios from '../../libs/axios'

export const getSurveyAssignments = async () =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')

        const res = await axios.get('/core/survey-assignments/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}