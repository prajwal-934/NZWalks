import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeIcons } from '@fluentui/react';
import { ThemeProvider } from '@fluentui/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { azureTheme } from './theme';
import Region from './components/region/Region'; 
import Layout from './components/Layout';
import Walk from './components/walk/Walk';

// Initialize Fluent UI icons
initializeIcons();

// Protected route wrapper
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={azureTheme}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes with Layout */}
            <Route element={<Layout />}>
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/region"
                element={
                  <PrivateRoute>
                    <Region />
                  </PrivateRoute>
                }
              />
              <Route
                path="/walks"
                element={
                  <PrivateRoute>
                    <Walk/>
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
