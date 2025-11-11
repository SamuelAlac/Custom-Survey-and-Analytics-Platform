import axios from '../../libs/axios'
import { jwtDecode } from 'jwt-decode'


export const createSurvey = async (surveyData: any) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        
        const res = await axios.post('/core/surveys/', surveyData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
        // res.data.id ipapasa sa survey assignment api
    } catch (error: any) {
        throw error.response?.data
    }
}

export const createQuestion = async (questionData: any) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        
        const res = await axios.post('/core/questions/', questionData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
        // res.data.id ipapasa sa survey api
    } catch (error: any) {
        throw error.response?.data
    }
}

export const createSurveyAssignment = async (surveyAssignmentData: any) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        
        const res = await axios.post('/core/survey-assignment-surveys/', surveyAssignmentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}