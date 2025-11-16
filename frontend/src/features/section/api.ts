import axios from '../../libs/axios'
import { jwtDecode } from 'jwt-decode'

export const getSections = async () =>{
    try {
        const res = await axios.get('/core/sections/')
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

export const getSectionDetail = async ({ id }: { id:number }) =>{
    try {
        const res = await axios.get(`/core/sections/${id}/`)
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

export const getSectionStudents = async () =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')

        const res = await axios.get('/auth/section-students/',{
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}