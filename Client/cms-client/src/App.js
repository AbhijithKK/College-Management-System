
import './App.css';
import Admin from './components/AdminPages/adminpageControlls/Admin';
import LoginForm from './components/Login/Login';
import MainPage from './components/mainpage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<MainPage />}></Route>
          <Route exact path='/adminlogin' element={<LoginForm data={"ADMIN LOGIN"} img={'admin'} />}></Route>
          <Route exact path='/studentlogin' element={<LoginForm data={"STUDENT LOGIN"} img={'student'} />}></Route>
          <Route exact path='/facultylogin' element={<LoginForm data={"FACULTY LOGIN"} img={'faculty'} />}></Route>
        </Routes>
      </BrowserRouter>
      <Admin />
    </div>
  );
}

export default App;
