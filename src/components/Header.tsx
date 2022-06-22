import React, { SyntheticEvent, useState } from 'react';

import {
  AppBar,
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignOutIcon from '@mui/icons-material/ExitToApp';

import { useAuth } from '../hooks/useAuth';
// import { FirebaseContext } from '../../context/FirebaseContext';
import { routes } from '../constants';

const Header = () => {
  const theme = useTheme();
  // const firebase = useContext(FirebaseContext);
  const [anchorEl, setAnchorEl] = useState<null|Element>(null);
  const user = useAuth();

  const handleAvatarClick = (e: SyntheticEvent) => setAnchorEl(e.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    // firebase.auth().signOut();
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Typography color="inherit" variant="h6" sx={{ flexGrow: 1 }}>Team Health Check</Typography>
        {user ? (
          <>
            <Typography
              variant="subtitle1"
              color="inherit"
              onClick={handleAvatarClick}
              sx={{ cursor: 'pointer' }}
            >
              {user.displayName}
            </Typography>
            <Avatar
              alt={user.displayName}
              src={user.photoURL}
              aria-owns={anchorEl ? 'user-menu' : undefined}
              aria-haspopup="true"
              onClick={handleAvatarClick}
              sx={{
                cursor: 'pointer',
                marginLeft: theme.spacing(2),
                height: 35,
                width: 35,
              }}
            />
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <SignOutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </MenuItem>
            </Menu>
          </>
        ) : <Button color="inherit">Sign In</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
