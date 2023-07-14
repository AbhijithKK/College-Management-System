
import './App.css';

import LoginForm from './components/Login/Login';
import MainPage from './components/mainpage/MainPage';
import { Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import Student from './components/StudentPages/StudentPageControll/Student';
import Faculty from './components/FacultyPages/FacultyControlls';
import Fpage from './components/404page';

import Admin from './components/AdminPages/adminpageControlls/Admin';

function App() {

  return (
    <div className="App">
<BrowserRouter>
     <Routes>
  <Route exact path='/' element={<MainPage />} />

  <Route exact path='/student/studentlogin' element={<LoginForm data={"STUDENT LOGIN"} img={'student'} />} />
  <Route exact path='/faculty/facultylogin' element={<LoginForm data={"FACULTY LOGIN"} img={'faculty'} />} />
  <Route exact path='/admin/adminlogin' element={<LoginForm data={"ADMIN LOGIN"} img={'admin'} />} />

    <Route exact path='/admin/*' element={<Admin />} />
    <Route exact path='/admin/' element={<Navigate to="/admin/dashboard" />} />
   
    <Route exact path='/student/*' element={<Student />} />
    <Route exact path='/student/' element={<Navigate to="/student/profile" />} />
   
    <Route exact path='/faculty/*' element={<Faculty />} />
    <Route exact path='/faculty/' element={<Navigate to="/faculty/profile" />} />
   
    <Route  path='/404' element={<Fpage />} />
    <Route  path="/*"  element={<Navigate to="/404" />} />
   
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
