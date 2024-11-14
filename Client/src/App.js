import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import SubmitComplaint from './components/ComplaintSubmission';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Home from './components/Home';
import Headers from './components/Headers';
import Dashboard from './components/Dashboard/Dashboard';
import Error from './components/Error';
import AdminView from './components/AdminComplaintView';

const App = () => {
  return (
      <div>
      <Headers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/complaintsubmit' element={<SubmitComplaint></SubmitComplaint>}/>
          <Route path='/adminview' element={<AdminView></AdminView>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/Home' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
  );
};

export default App;

