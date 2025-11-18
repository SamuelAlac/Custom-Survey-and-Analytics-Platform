import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StudentLayout } from './layouts/StudentLayout'
import Index from './pages/auth/Index'
import StudentDashboard from './pages/student/dashboard/StudentDashboard'
import TeacherDashboard from './pages/teacher/dashboard/TeacherDashboard'
import StudentResponses from './pages/student/my_responses/StudentResponses'
import { TeacherLayout } from './layouts/TeacherLayout'
import TeacherLogin from './pages/auth/Teacher/Login'
import { AuthLayout } from './layouts/AuthLayout'
import StudentLogin from './pages/auth/Student/Login'
import StudentRegister from './pages/auth/Student/Register'
import VerifyAccount from './pages/auth/Student/VerifyAccount'
import { ProtectedRoute } from './routes/ProtectedRoute'
import CreateSurvey from './pages/teacher/new_survey/CreateSurvey'
import NewSurvey from './pages/teacher/new_survey/NewSurvey'
import TakeSurvey from './pages/student/take_survey/TakeSurvey'
import StudentResponse from './pages/student/my_responses/view/StudentResponse'
import UpdateSurvey from './pages/teacher/new_survey/update/UpdateSurvey'
import ViewSurvey from './pages/teacher/view_survey/ViewSurvey'
import Profile from './pages/student/profile/components/Profile'
import Responses from './pages/teacher/responses/Responses'
import Analytics from './pages/teacher/analytics/Analytics'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index/>
  },
  {
    path: '*',
    element: <><h1>This page does not exist</h1></>
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
          { path: 'Profile', element: <Profile/> },
          { path: "Dashboard", element: <StudentDashboard /> },
          { path: "Dashboard/Take-Survey/:id", element: <TakeSurvey /> },
          { path: "MyResponses", element: <StudentResponses /> },
          { path: "MyResponses/:id", element: <StudentResponse/> },
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
          { path: 'ViewSurvey/:id', element: <ViewSurvey/> },
          { path: 'NewSurvey/Update-Survey/:id', element: <UpdateSurvey/> },
          { path: 'NewSurvey/Create-Survey', element: <CreateSurvey /> },
          { path: 'Responses', element: <Responses/> },
          { path: 'Analytics', element: <Analytics/> },
        ],
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
}
export default App
