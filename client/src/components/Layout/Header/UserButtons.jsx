import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logout from '../../../utils/Logout';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';

const UserButtons = ({user}) => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorElUser);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)};

    const handleCloseUserMenu = () => {
      setAnchorElUser(null)};


  return (
    !!user && (
        <Box sx={{ display: 'flex'}}>
         <Tooltip title="Favorites">
          <Link to={'/account/favorites'}>

          
            <IconButton  sx={{ p  : 0 }}>
              <FavoriteIcon   sx={{mr:1.5, fontSize:30,color:red[500]}} />
            </IconButton>
            </Link>
            
             </Tooltip>
           <Tooltip title="Open settings">
              <IconButton 
                  onClick={handleOpenUserMenu}  
                  
                  aria-controls={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{ p: 0 }}>
              <AccountCircleIcon  color='primary' sx={{fontSize:30}}  />
              <ExpandMoreSharpIcon  color='primary'/>
              </IconButton>
            

          </Tooltip>
          <Menu
            sx={{ mt: '45px',width:600 }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >                
          <Link to={"/account/profile"} style={{textDecorationLine:'none',color:'inherit'}} >
              <MenuItem onClick={handleCloseUserMenu} sx={{width:'100%'}}   >
                    <IconButton>
                      <AccountCircleIcon fontSize='medium'  color='primary'  />
                    </IconButton>
                    <Typography component={'span'} whiteSpace='nowrap' color='primary' textAlign="center"> {(
                          <div>
                            {user.name}
                          </div>
                        )}
                    </Typography>
             </MenuItem>   
                    
          </Link>    

           <Link to={"/account/rentplace/new"} style={{textDecorationLine:'none',color:'inherit'}} >
              <MenuItem onClick={handleCloseUserMenu} sx={{width:'100%'}}   >
              <IconButton>
                        <AddIcon fontSize='medium' color='primary' />
                      </IconButton>
                      <Typography component={'span'} whiteSpace='nowrap' color='primary' textAlign="center"> {(
                            <div>
                             Publish rentplace 
                            </div>
                          )}
                      </Typography>
             </MenuItem>   
                    
           </Link>  

            <Link to={"/account/rentplaces"} style={{textDecorationLine:'none',color:'inherit'}} >
                <MenuItem onClick={handleCloseUserMenu} sx={{width:'100%'}}   >
                      <IconButton>
                          <CollectionsIcon fontSize='medium' color='primary' />
                        </IconButton>
                        <Typography component={'span'} whiteSpace='nowrap' color='primary' textAlign="center"> {(
                              <div>
                                Mi rentplaces posts
                              </div>
                            )}
                        </Typography>
              </MenuItem>   
                    
           </Link>       

                             
              
             
                 <Logout onClick={handleCloseUserMenu} />

          </Menu>
      </Box>
    )
    
  )
}

export default UserButtons