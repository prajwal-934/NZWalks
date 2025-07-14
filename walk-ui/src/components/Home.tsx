import React from 'react';
import { Stack, Text, DefaultButton } from '@fluentui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Home: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
    <Header/>
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      tokens={{ childrenGap: 20 }}
      styles={{ root: { height: '100vh', background: '#f3f2f1' } }}
    >
      <Text variant="xxLarge">Welcome to the Walks & Trails App</Text>
      <Text variant="mediumPlus">This is your Home page. Content will appear here soon.</Text>
      <DefaultButton text="Logout" onClick={handleLogout} />
    </Stack>
    </>
  );
};

export default Home;
