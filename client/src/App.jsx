/* eslint-disable no-unused-vars */
import React from 'react';
import Login from './login.jsx';
import Signup from './signup.jsx';
import TaskPage from './TaskPage.jsx';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/tasks" element={<TaskPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
