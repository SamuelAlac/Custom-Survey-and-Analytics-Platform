import axios from '../../libs/axios'


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

// Survey Creation
// {
//     "title": "This is a test survey",
//     "description": "testing survey"

// }

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

// {
//   "survey": 19,
//   "text": "Test question",
//   "question_type": "mcq",
//   "order": 1,
//   "question_choices": [
//     {"text": "Choice A"},
//     {"text": "Choice B"},
//     {"text": "Choice C"},
//     { "text": "Choice D" }
//   ]
// }

// Likert Scale Question
// {
//   "survey": 19,
//   "text": "Test question",
//   "question_type": "likert",
//   "order": 2,
//   "question_choices": [
//     {"text": "Strongly Disagree"},
//     {"text": "Disagree"},
//     {"text": "Neutral"},
//     { "text": "Agree" },
//     { "text": "Strongly Agree" }
//   ]
// }

// Short Text
// Likert Scale Question
// {
//   "survey": 19,
//   "text": "Test question",
//   "question_type": "text",
//   "order": 3,
// }


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

// Survey Assignment Creation
// {
//     "survey": 19,
//     "sections": [1],
//     "due_date": 2025-11-08T16:49:00.976996Z
// }