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
import VerifyAccount from './pages/auth/Student/VerifyAccount'
import { ProtectedRoute } from './routes/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index/>
  },
  {
    path: '/Auth',
    element: <AuthLayout/>,
    children: [
      { path: 'Teacher-Login', element: <TeacherLogin/> },
      { path: 'Student-Login', element: <StudentLogin/> },
      { path: 'Student-Register', element: <StudentRegister/> },
      { path: 'Student-Register/:id', element: <VerifyAccount/>, }
    ]
  },
  {
    element: <ProtectedRoute allowedRoles={['STUDENT']}/>,
    children: [
      {
        path: '/Student',
        element: <StudentLayout/>,
        children: [
          { path: "Dashboard", element: <StudentDashboard /> },
          { path: "MyResponses", element: <StudentResponses /> },
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute allowedRoles={['TEACHER', 'ADMIN']} />,
    children: [
      {
        path: "/Teacher",
        element: <TeacherLayout />,
        children: [
          { path: "Dashboard", element: <TeacherDashboard /> },
          { path: "NewSurvey", element: <NewSurvey /> },
        ],
      },
    ]
    // path: '/Teacher',
    // element: <TeacherLayout/>,
    // children: [
    //   {
    //     path: 'Dashboard',
    //     element: <TeacherDashboard/>,
    //   },
    //   {
    //     path: 'NewSurvey',
    //     element: <NewSurvey/>
    //   }
    // ]
  }
])

function App() {
  return <RouterProvider router={router}/>
}
export default App
