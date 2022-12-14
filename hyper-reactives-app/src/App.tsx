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
import VehicleHistory from './containers/VehicleHistory/VehicleHistory';
import VehicleServicing from './containers/VehicleServicing/VehicleServicing';
import PageNotFound from './components/404Page/404Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="signup" />} />
        <Route path="signup" element={<UserRegistration />}></Route>
        <Route path="login" element={<UserLogin />}></Route>

        <Route path="layout" element={<BasicLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="admin" element={<AdminPage />}></Route>
          <Route path='register-vehicle' element={<RegisterVehicle />} />
          <Route path='vehicle-history' element={<VehicleHistory />} />
          <Route path='vehicle-servicing' element={<VehicleServicing />} />
          <Route path="vehicle-approval" element={<VehicleApproval />}></Route>
        </Route>


        <Route path="*" element={<PageNotFound />} />
      </Routes >
    </Router >

  );
}

export default App;
