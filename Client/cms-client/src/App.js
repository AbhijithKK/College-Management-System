
import './App.css';
import Admin from './components/AdminPages/adminpageControlls/Admin';
import LoginForm from './components/Login/Login';
import MainPage from './components/mainpage/MainPage';
import { Routes, Route} from 'react-router-dom';
import axios from './components/Axios/Axios'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Student from './components/StudentPages/StudentPageControll/Student';
function App() {

  const dispatch = useDispatch()
  const { refresh, admin,student } = useSelector((state) => {
    
    return state
  })
  console.log(admin.login);
  useEffect(() => {
    axios.get('/admin/checkAuth', {
      headers: { 'Content-Type': 'application/json' }
    }).then((data) => {
      dispatch({ type: 'admin', payload: { login: data.data } })
      
      
    })
    axios.get('/student/checkAuth', {
      headers: { 'Content-Type': 'application/json' }
    }).then((data) => {
      console.log(data.data);
      dispatch({ type: 'student', payload: { login: data.data } })

    })
  }, [refresh, dispatch])
  return (
    <div className="App">

     <Routes>
  <Route exact path='/' element={<MainPage />} />

  <Route exact path='/student/studentlogin' element={<LoginForm data={"STUDENT LOGIN"} img={'student'} />} />
  <Route exact path='/facultylogin' element={<LoginForm data={"FACULTY LOGIN"} img={'faculty'} />} />
  <Route exact path='/admin/adminlogin' element={<LoginForm data={"ADMIN LOGIN"} img={'admin'} />} />

  {/* {admin.login === false && (
   
      <Route exact path='/admin/*' element={<Navigate to="/admin/adminlogin" />} />
    
  )} */}

  {admin.login === true && (
    <Route exact path='/admin/*' element={<Admin />} />
  )}
  {student.login === true && (
    <Route exact path='/student/*' element={<Student />} />
  )}
</Routes>

      

    </div>
  );
}

export default App;
