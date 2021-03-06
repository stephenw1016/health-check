import React from 'react';
import Link from "next/link";
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
import { routes } from '../constants';

const Header = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null|Element>(null);
  const { user } = useAuth();

  const handleAvatarClick = (e: React.MouseEvent) => setAnchorEl(e.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    // auth().signOut();
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Link href={routes.HOME} passHref>
          <Typography
            color="inherit"
            variant="h6"
            sx={{ cursor: 'pointer', flexGrow: 1 }}
          >
            Team Health Check
          </Typography>
        </Link>
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
