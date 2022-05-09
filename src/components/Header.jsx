import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import logo from 'assets/images/logo.png';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartCountSelector } from 'features/Cart/cartSelector';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.secondary[500],
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function Header() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  const cartItemCount = useSelector(cartCountSelector);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickLogout = () => {
    setAnchorEl(null);
    const action = logout();
    dispatch(action);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              <img src={logo} alt="logo" width="50px" />
            </Link>
          </Typography>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <NavLink className={classes.link} to="products">
            <Button color="inherit">PRODUCTS</Button>
          </NavLink>
          <NavLink className={classes.link} to="cart">
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </NavLink>
          {!isLoggedIn ? (
            <Button color="inherit" onClick={handleClickOpen}>
              LOGIN
            </Button>
          ) : (
            <IconButton color="inherit" onClick={handleClickMenu}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            onclose(event, reason);
          }
        }}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeBtn} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account? Sign in
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account? Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
