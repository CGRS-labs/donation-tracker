import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Sunflower from './Sunflower';

// FIXME: Don't show Sign In, Sign up if user is logged in
// FIXME: Get the chapter Id from user context
const chapterId = 1;
const pages = [
  {
    text: 'Sign In',
    link: '/signin',
    showPublic: true,
    showPrivate: false,
  },
  {
    text: 'Chapters',
    link: '/chapters',
    showPublic: true,
    showPrivate: true,
  },
  {
    text: 'Map',
    link: '/map',
    showPublic: true,
    showPrivate: true,
  },
  {
    text: 'Global Dashboard',
    link: '/dashboard',
    showPublic: false,
    showPrivate: true,
  },
  {
    text: 'My Dashboard',
    link: `/dashboard/${chapterId}`,
    showPublic: false,
    showPrivate: true,
  },
  {
    text: 'Add Chapter',
    link: '/chapter/add',
    showPublic: false,
    showPrivate: true,
  },
  {
    text: 'Add Admin',
    link: '/signup',
    showPublic: false,
    showPrivate: true,
  },
  // {
  //   text: 'Logout',
  //   link: '/logout',
  //   showPublic: false,
  //   showPrivate: true,
  // },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          <Box
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to='/' component={RouterLink} underline='none'>
              <Sunflower width={48} height={48} />
            </Link>

          </Box>
          {/* Condensed nav menu for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* TODO: Use showPrivate, showPublic to conditionally render based on if user is logged in */}
              {pages.map((page, i) => (
                <Link key={page.text} to={page.link} underline="none" component={RouterLink}>
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* CENTERED LOGO for small screens */}
          <Box
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to='/' component={RouterLink} underline='none'>
              <Sunflower width={48} height={48} />
            </Link>
          </Box>

          {/* Nav Bar for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* TODO: Use showPrivate, showPublic to conditionally render based on if user is logged in */}
            {pages.map((page, i) => (
              <Link key={page.text} to={page.link} underline="none" component={RouterLink}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;