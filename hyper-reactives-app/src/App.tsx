import React from 'react';
import UserRegistration from './containers/UserRegistration/UserRegistration';
import UserLogin from './containers/UserLogin/UserLogin';
import './App.css'
import Demo from '../src/components/AdminPage/Admin';

import AdminPage from './components/AdminPage/Admin';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import VehicleApproval from './components/AdminPage/vehicle-approval';
import BasicLayout from './containers/BasicLayout/BasicLayout';
import RegisterVehicle from './containers/RegisterVehicle/RegisterVehicle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Signup" />} />
        <Route path="/Signup" element={<UserRegistration />}></Route>
        <Route path="/Login" element={<UserLogin />}></Route>
        <Route path="/Admin" element={<AdminPage />}></Route>
        <Route path="/Home" element={<Dashboard />}></Route>
        <Route path="/vehicle-approval" element={<VehicleApproval />}></Route>

        <Route path="/Layout" element={<BasicLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='RegisterVehicle' element={<RegisterVehicle />} />
        </Route>


        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes >
    </Router >

  );
}

export default App;
