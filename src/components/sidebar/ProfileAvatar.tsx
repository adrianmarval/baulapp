'use client';
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import React from 'react';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface Props {
  username: string;
}

export const ProfileAvatar = ({username}: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{flexGrow: 0}}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar className='font-extrabold'>{username.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{mt: '45px'}}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
