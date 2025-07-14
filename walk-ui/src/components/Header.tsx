import React from 'react';
import { Stack, Text, DefaultButton } from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Do not show logout on login or register pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={{
        root: {
          backgroundColor: '#0078D4',
          padding: '12px 24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Text variant="xLarge" styles={{ root: { color: 'white' } }}>
        Walks and Trail
      </Text>

      {!isAuthPage && (
        <DefaultButton
          text="Logout"
          onClick={handleLogout}
          styles={{
            root: {
              backgroundColor: 'white',
              color: '#0078D4',
              border: 'none',
            },
            rootHovered: {
              backgroundColor: '#f3f2f1',
            },
          }}
        />
      )}
    </Stack>
  );
};

export default Header;
