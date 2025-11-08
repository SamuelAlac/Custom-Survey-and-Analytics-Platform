import axios from '../../libs/axios'

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