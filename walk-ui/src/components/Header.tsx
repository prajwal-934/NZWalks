import React, { useState } from 'react';
import {
  Stack,
  Text,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton
} from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const confirmLogout = () => {
    logout();
    navigate('/login');
    closeDialog();
  };

  return (
    <>
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
            onClick={openDialog}
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

      <Dialog
        hidden={!isDialogOpen}
        onDismiss={closeDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Confirm Logout',
          subText: 'Are you sure you want to logout?',
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={confirmLogout} text="Yes" />
          <DefaultButton onClick={closeDialog} text="No" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Header;
