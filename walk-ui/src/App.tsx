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
import Walks from './components/Walks';

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

        {/* Protected Routes with Header */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/region" element={<Region />} />
          <Route path="/walks" element={<Walks />} />
        </Route>
      </Routes>
    </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
