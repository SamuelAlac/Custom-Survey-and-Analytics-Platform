import axios from '../../libs/axios'

export const getRecentSurveyAssignments = async () =>{
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

export const getSurveyAssignments = async (page: number = 1, search: string) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')

        const res = await axios.get(`/core/survey-assignments/?page=${page}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

export const getSurveyAssignmentWithSurvey = async ({ id }: { id: string }) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')

        const res = await axios.get(`/core/survey-assignment-surveys/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

export const getSurveyAssignmentWithResponses = async ({ id }: { id: string }) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')

        const res = await axios.get(`/core/survey-assignment-responses/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

export const getSurveyAssignmentWithQuestionAndAnswer = async ({ id }: { id: string }) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')

        const res = await axios.get(`/core/survey-assignment-qa/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}