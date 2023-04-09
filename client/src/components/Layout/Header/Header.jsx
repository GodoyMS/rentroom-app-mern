
import * as React from 'react';
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import { UserContext } from "../../../utils/UserContext";
import Logout from '../../../utils/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';

import { indigo } from '@mui/material/colors';
import UserButtons from './UserButtons';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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

  
  const {user,setUser} = useContext(UserContext);
  useEffect(()=>{
    
  })
  return (
    <AppBar color='transparent' elevation={0} position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
        <Link to='/'  style={{textDecorationLine:'none'}} >
          <Typography
            variant="h6"
            noWrap
            component="h1"
            
            sx={{
              mr: 2,
              ml:{xs:10,lg:0},
              fontSize:{xs:15,lg:20},
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: {xs:'.1rem',lg:'0.3rem'},
              color:'primary',
              textDecoration: 'none',
            }}
          >
             
            Rent a Room
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: "flex",justifyContent:"space-around"}}>
           
           
          </Box>

          {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
 
         


          {!user && (
          <Box sx={{display:'flex', gap:2}}>
          <Link to={'/login'} style={{textDecorationLine:'none'}}>          
          <Button variant='contained' color='primary' sx={{fontSize:{xs:10,md:12}}}>Login</Button>

          </Link>
          <Link to={'/Register'} style={{textDecorationLine:'none'}}>          
          <Button variant='contained' color="primary"  sx={{fontSize:{xs:10,md:12}, whiteSpace:'nowrap',color:"white"}}>Sign Up</Button>

          </Link>

        </Box>
        )}
        
          <UserButtons user={user} />                  
       
            
          

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
