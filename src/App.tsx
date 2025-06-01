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
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { AuthProvider } from './components/auth/AuthProvider';
import { UnAuth } from './components/UnAuth';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div style={{ display: 'flex' }}>
          <Sidebar />

          <div style={{ marginLeft: '220px', width: '100%' }}>
            <NavB />

            <div className="p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauth" element={<UnAuth />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/users" element={<UserConsole />} />
                <Route path="/items" element={<ItemConsole />} />
                <Route path="/requests" element={<RequestConsole />} /> */}
              

                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <UserConsole />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/items"
                  element={
                    <PrivateRoute>
                      <ItemConsole />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/requests"
                  element={
                    <PrivateRoute>
                      <RequestConsole />
                    </PrivateRoute>
                  }
                />

                <Route path="/*" element={<NotFound />} />``
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>

  );
};

export default App;
