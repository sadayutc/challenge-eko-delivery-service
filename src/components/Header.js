import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useLayout } from '../contexts/layoutContext';

const drawerWidth = 250;

const Title = styled(Typography)({
  flexGrow: 1,
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Header = () => {
  const {
    state: { headerTitle },
    toggleMobileSidebarOpen,
  } = useLayout();

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <MenuButton
          onClick={toggleMobileSidebarOpen}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </MenuButton>
        <Title variant="h6" noWrap>
          {headerTitle || ''}
        </Title>
        <Avatar
          component={Link}
          to="#"
          src={`${process.env.PUBLIC_URL}/images/example-user-01.jpg`}
        />
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
