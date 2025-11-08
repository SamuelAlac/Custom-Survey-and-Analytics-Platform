import axios from '../../libs/axios'

export const getSurveyAssignments = async () =>{
    try {
        const token = localStorage.getItem('access')
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