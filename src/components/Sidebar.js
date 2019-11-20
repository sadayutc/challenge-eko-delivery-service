import React from 'react';
import {
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Divider,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';

import {
  ArrowRight as ArrowRightIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useLayout } from '../contexts/layoutContext';

const drawerWidth = 250;

const DrawerWrapper = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const StyledList = styled(List)({
  width: drawerWidth,

  '&& *': {
    color: 'white',
  },
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& > .MuiPaper-root': {
    borderRight: 'none',
  },

  '& > .MuiPaper-root::before': {
    content: `' '`,
    position: 'fixed',
    display: 'block',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: drawerWidth,
    height: '100vh',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: `url('${process.env.PUBLIC_URL}/images/menu-background-01.jpg')`,
    opacity: 0.75,
    zIndex: -200,
  },

  '& > .MuiPaper-root::after': {
    content: `' '`,
    position: 'fixed',
    display: 'block',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: drawerWidth,
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.85,
    zIndex: -199,
  },
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 30,
});

// const FakeToolbar = styled('div')(({ theme }) => ({ ...theme.mixins.toolbar }));

const mainMenu = [
  { id: 0, label: 'Set routes', link: '/route/set', icon: <ArrowRightIcon /> },
  { id: 1, label: 'Delivery cost', link: '/route/delivery-cost', icon: <ArrowRightIcon /> },
  { id: 2, label: 'Possible delivery route', link: '/route/possible-delivery-route', icon: <ArrowRightIcon /> },
  { id: 3, label: 'Cheapest delivery route', link: '/route/cheapest-delivery-route', icon: <ArrowRightIcon /> },
];

const userMenu = [
  { id: 0, label: 'Logout', link: '/logout', icon: <ArrowRightIcon /> },
];

const drawer = (
  <>
    {/* <FakeToolbar /> */}
    {/* <Divider /> */}
    <div>
      <StyledList
        aria-labelledby="main-list"
        subheader={(
          <ListSubheader disableSticky component="div" id="main-list">
            Main
          </ListSubheader>
        )}
      >
        {mainMenu.map(menu => (
          <ListItem button key={menu.id} component={Link} to={menu.link}>
            <StyledListItemIcon>{menu.icon}</StyledListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItem>
        ))}
      </StyledList>
      <Divider />
      <StyledList
        aria-labelledby="user-list"
        subheader={(
          <ListSubheader disableSticky component="div" id="user-list">
            User
          </ListSubheader>
        )}
      >
        {userMenu.map(menu => (
          <ListItem button key={menu.id} component={Link} to={menu.link}>
            <StyledListItemIcon>{menu.icon}</StyledListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItem>
        ))}
      </StyledList>
    </div>
  </>
);

const Sidebar = () => {
  const {
    state: { isMobileSidebarOpen },
    toggleMobileSidebarOpen,
  } = useLayout();

  return (
    <DrawerWrapper>
      <Hidden smUp implementation="css">
        <StyledDrawer
          variant="temporary"
          anchor="left"
          open={isMobileSidebarOpen}
          onClose={toggleMobileSidebarOpen}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </StyledDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <StyledDrawer variant="permanent" open>
          {drawer}
        </StyledDrawer>
      </Hidden>
    </DrawerWrapper>
  );
};

export default Sidebar;
