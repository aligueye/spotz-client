import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import useToken from './utils/useToken'

import Home from './pages/Home'
import About from './pages/About'
import StudentLogin from './pages/StudentLogin';
import ErrorPage from './pages/ErrorPage';

function App() {

  const { token, setToken } = useToken()

  if (!token) {
    return <StudentLogin setToken={setToken} />
  }
  else {
    console.log(token)
  }

  return (
    <div>
      
      <Router>
        <nav>
          <Link to='/'> Home </Link>
          <Link to='/about'> About </Link>
          <Link to='/login'> Login </Link>
        </nav>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/about' element={ <About/> }/>
          <Route path='/login' element={ <StudentLogin setToken={setToken}/> }/>
          <Route path='*' element={ <ErrorPage/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
