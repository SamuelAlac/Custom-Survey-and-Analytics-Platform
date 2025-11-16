import axios from '../../libs/axios'

export const getSurveyAssignment = () =>{
    try {
        
    } catch (error) {
        
    }
}

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
    } catch (error: any) {
        throw error.response?.data
    }
}

// Survey Creation Format:
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

// Survey Assignment Creation Format:
// {
//     "survey": 19,
//     "sections": [1],
//     "due_date": "2025-11-08T16:49:00.976996Z",
//     "status": "active", // "active" or "inactive"
//     "editable": true // true or false for response editing
// }

// survey publishing function
export const publishSurvey = async (surveyData: {
    title: string,
    description?: string,
    questions: any[],
    sections: number[],
    dueDate: string,
    surveyStatus?: 'active' | 'inactive',
    responseEditing?: boolean
}) => {
    try {
        //Create the survey
        const survey = await createSurvey({
            title: surveyData.title,
            description: surveyData.description || ''
        })

        const surveyId = survey.id

        //Create all questions for this survey
        const questionPromises = surveyData.questions.map((question, index) => {
            let questionData: any = {
                survey: surveyId,
                text: question.content?.text || question.content?.question || question.content?.statement || 'Untitled Question',
                question_type: getQuestionType(question.type),
                order: index + 1
            }

            // Add question choices for multiple choice and likert scale questions
            if (question.type === 'multiple-choice' && question.content?.options) {
                questionData.question_choices = question.content.options.map((opt: any) => ({ 
                    text: typeof opt === 'string' ? opt : opt.text 
                }))
            } else if (question.type === 'likert-scale' && question.content?.scaleLabels) {
                questionData.question_choices = question.content.scaleLabels.map((label: string) => ({ 
                    text: label 
                }))
            }

            return createQuestion(questionData)
        })

        await Promise.all(questionPromises)

        //Create survey assignment
        const assignment = await createSurveyAssignment({
            survey: surveyId,
            sections: surveyData.sections,
            due_date: new Date(surveyData.dueDate).toISOString(),
            status: surveyData.surveyStatus || 'active',
            editable: surveyData.responseEditing !== undefined ? surveyData.responseEditing : true
        })

        return {
            survey,
            assignment,
            message: 'Survey published successfully!'
        }

    } catch (error: any) {
        console.error('Error publishing survey:', error)
        
        if (error.response?.data) {
            throw error.response.data
        } else if (error.message) {
            throw new Error(`Failed to publish survey: ${error.message}`)
        } else {
            throw new Error('Failed to publish survey due to an unknown error')
        }
    }
}

// Helper function to map question types
const getQuestionType = (type: string) => {
    switch (type) {
        case 'multiple-choice':
            return 'mcq'
        case 'likert-scale':
            return 'likert'
        case 'short-text':
            return 'text'
        case 'header':
            return 'text' // Headers can be treated as text questions
        default:
            return 'text'
    }
}

export const updateSurveyAssignment = async (id: any, surveyAssignmentData: any) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        
        const res = await axios.put(`/core/survey-assignment-surveys/${id}`, surveyAssignmentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error: any) {
        throw error.response?.data
    }
}

// Survey Assignment Update Format
// {
//     "survey": 17,
//     "sections": [2],
//     "status": "inactive", // status can be inactive or active
//     "due_date": "2025-11-08T16:49:00.976996Z",
//     "editable": true
// }

export const deleteSurvey = async (id: any) =>{
    try {
        const token = localStorage.getItem('access')
        if (!token) throw new Error('No access token found')
        
        const res = await axios.delete(`/core/survey-assignment-surveys/${id}/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data    
    } catch (error: any) {
        throw error.response?.data
    }
}