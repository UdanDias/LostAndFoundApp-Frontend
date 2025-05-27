import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavB from './components/NavB';
import Sidebar from './components/SideBar';

import { ItemConsole } from './components/ItemConsole';
import { UserConsole } from './components/UserConsole';
import { RequestConsole } from './components/RequestConsole';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { NotFound } from './components/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />

        <div style={{ marginLeft: '220px', width: '100%' }}>
          <NavB />
          
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/items" />} />
              <Route path="/users" element={<UserConsole />} />
              <Route path="/items" element={<ItemConsole />} />
              <Route path="/requests" element={<RequestConsole />} />
              <Route path="/*" element={<NotFound/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router> 
  );
};

export default App;
