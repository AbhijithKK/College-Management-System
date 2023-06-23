
import './App.css';
import Admin from './components/AdminPages/adminpageControlls/Admin';
import LoginForm from './components/Login/Login';
import MainPage from './components/mainpage/MainPage';
import { Routes, Route } from 'react-router-dom';
import axios from './components/Axios/Axios'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function App() {

  const dispatch = useDispatch()
  const { refresh, admin } = useSelector((state) => {
    return state
  })
  useEffect(() => {
    axios.get('/admin/checkAuth', {
      headers: { 'Content-Type': 'application/json' }
    }).then((data) => {
      dispatch({ type: 'admin', payload: { login: data.data } })

    })
  }, [refresh, dispatch])
  return (
    <div className="App">

      <Routes>
        <Route exact path='/' element={<MainPage />}></Route>

        <Route exact path='/studentlogin' element={<LoginForm data={"STUDENT LOGIN"} img={'student'} />}></Route>
        <Route exact path='/facultylogin' element={<LoginForm data={"FACULTY LOGIN"} img={'faculty'} />}></Route>
      </Routes>
      {
        admin.login === false &&
        <Routes>
          <Route exact path='/adminlogin' element={<LoginForm data={"ADMIN LOGIN"} img={'admin'} />}></Route>
        </Routes>
      }

      {
        admin.login === true &&
        <Routes>
          <Route exact path='/admin/*' element={<Admin />} />

        </Routes>
      }

    </div>
  );
}

export default App;
