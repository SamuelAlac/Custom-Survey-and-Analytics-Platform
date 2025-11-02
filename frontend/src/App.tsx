import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StudentLayout } from './layouts/StudentLayout'
import Index from './pages/auth/Index'
import StudentDashboard from './pages/student/dashboard/StudentDashboard'
import TeacherDashboard from './pages/teacher/dashboard/TeacherDashboard'
import StudentResponses from './pages/student/my_responses/StudentResponses'
import { TeacherLayout } from './layouts/TeacherLayout'
import NewSurvey from './pages/teacher/new_survey/NewSurvey'
import TeacherLogin from './pages/auth/Teacher/Login'
import { AuthLayout } from './layouts/AuthLayout'
import StudentLogin from './pages/auth/Student/Login'
import StudentRegister from './pages/auth/Student/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index/>
  },
  {
    path: '/Auth',
    element: <AuthLayout/>,
    children: [
      {
        path: 'Teacher-Login',
        element: <TeacherLogin/>
      },
      {
        path: 'Student-Login',
        element: <StudentLogin/>
      },
      {
        path: 'Student-Register',
        element: <StudentRegister/>
      }
    ]
  },
  {
    path: '/Student',
    element: <StudentLayout/>,
    children: [
      {
        path: 'Dashboard',
        element: <StudentDashboard/>,
      },
      {
        path: 'MyResponses',
        element: <StudentResponses/>,
      }
    ]
  },
  {
    path: '/Teacher',
    element: <TeacherLayout/>,
    children: [
      {
        path: 'Dashboard',
        element: <TeacherDashboard/>,
      },
      {
        path: 'NewSurvey',
        element: <NewSurvey/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
}
export default App
