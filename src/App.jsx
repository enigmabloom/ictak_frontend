import './App.css'
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentDashboard from './components/StudentDashboard'
import { StudentProvider } from './components/StudentProvider.jsx';
import ProjectBoard from './components/Project_board';
// import WeeklySubmission from './components/WeeklySubmission';
// import FinalSubmission from './components/FinalSubmission';
// import Vivavoce from './components/Vivavoce';
// import DiscussionForum from './components/DiscussionForum';
import Layout from './components/Layout.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

function App() {

  return (
    <>
    <StudentProvider>
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/' element={<Layout />}>
              <Route path='/student-dashboard' element={<StudentDashboard />} />
              <Route path ="/project-dashboard" element={<ProjectBoard/>} />
            </Route>
          </Route>
        </Routes>
    </StudentProvider>
    </>
  )
}

export default App