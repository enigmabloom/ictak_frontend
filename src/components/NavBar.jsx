import {  useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StudentContext } from './StudentProvider';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'Projects'];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { student, setStudent } = useContext (StudentContext);
    const navigate = useNavigate();
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogout = () => {
      setStudent(null);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      navigate('/');
    }



    // useEffect(() => {
    //   async function fetchStudent () {
    //       const res = await axios.get(`http://localhost:3000/student/${studentID}`);
    //       try {
    //           setStudent(res.data);
    //       } catch (error) {
    //           console.log(error);
    //       }
    //   }
    //   fetchStudent();
    // }, []);

  return (
    <AppBar position="static" style={{backgroundImage: 'linear-gradient(to right, #004d40, #00acc1)'}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
            }}
        >
            <img
                src="../public/logo/iip-white.png"
                alt="ICTAK Internship Portal Logo"
                style={{width:'10rem'}}
            />
        </Box>
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
                '& .MuiPaper-root': {
                    backgroundColor: '#2d2d2d',
                    color: 'white'
                }
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu} sx={{
                '&:hover': {
                    backgroundColor: '#353535'
                }
              }}>
                <Typography
                    sx={{ textAlign: 'center' }}>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
            sx={{
                mr:2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
            }}
        >
            <img src="../public/logo/iip-white.png" alt="ICTAK Internship Portal Logo" style={{width: '10rem'}} />
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2, color: 'white', display: 'block',
                '&:hover': {
                    backgroundColor: '#353535'
                }
            }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="John Doe" src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
                mt: '45px',
                '& .MuiPaper-root': {
                    backgroundColor: '#2d2d2d',
                    color: 'white'
                }
            }}
            id="menu-appbar"
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
            {/* {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={handleCloseUserMenu}
                sx={{
                    '&:hover': {
                        backgroundColor: '#353535'
                    }
                }}
            >
                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
              </MenuItem>
            ))} */}
            <MenuItem
              sx={{
                '&:hover': {
                  backgroundColor: '#353535'
                }
              }}
            >
              <Typography sx={{ textAlign: 'center', color: '#ececec' }}>{student?.name}</Typography>
            </MenuItem>
            <MenuItem
              onClick={ handleLogout }
              sx={{
                '&:hover': {
                  backgroundColor: '#353535'
                }
              }}
            >
              <Typography sx={{ textAlign: 'center', color: "#ececec" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default NavBar