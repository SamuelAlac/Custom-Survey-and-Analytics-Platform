import axios from '../../libs/axios'

export const getSections = async () =>{
    try {
        const res = await axios('/core/sections/')
        return res.data
    } catch (error) {
        console.log(`Failed to get sections ${error}`)
    }
}

export const getSectionDetail = async ({ id }: { id:number }) =>{
    try {
        const res = await axios.get(`/core/sections/${id}/`)
        return res.data
    } catch (error) {
        console.log(`Failed to get section with the id of ${id}`)
    }
}