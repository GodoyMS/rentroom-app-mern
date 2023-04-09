import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Grid } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WifiIcon from '@mui/icons-material/Wifi';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import PetsIcon from '@mui/icons-material/Pets';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import BathtubIcon from '@mui/icons-material/Bathtub';
import WeekendIcon from '@mui/icons-material/Weekend';
const PerksList = ({place}) => {
    const filterWifi=place.perks.filter(element=>element==="wifi");
    const filterTv=place.perks.filter(element=>element==="tv");
    const pets=place.perks.filter(element=>element==="pets");
    const parking=place.perks.filter(element=>element==="parking");
    const privateEntrance=place.perks.filter(element=>element==="privateEntrance");
    const privanteBathroom=place.perks.filter(element=>element==="privanteBathroom");
    const furniture=place.perks.filter(element=>element==="furniture");

  return (
    <Box sx={{ width: '100%',  bgcolor: 'background.paper' }}>
      <List >
        {filterWifi.length>0 && (<ListItem  disablePadding> <ListItemIcon> <WifiIcon /> </ListItemIcon> <ListItemText primary="Wi-fi" />  </ListItem> )}
        {filterTv.length>0 && (<ListItem disablePadding> <ListItemIcon> <ConnectedTvIcon /> </ListItemIcon> <ListItemText primary="Tv" />  </ListItem> )}
        {pets.length>0 && (<ListItem disablePadding> <ListItemIcon> <PetsIcon /> </ListItemIcon> <ListItemText primary="Pets" />  </ListItem> )}
        {parking.length>0 && (<ListItem disablePadding> <ListItemIcon> <DirectionsCarIcon /> </ListItemIcon> <ListItemText primary="Parking" />  </ListItem> )}
        {privateEntrance.length>0 && (<ListItem disablePadding> <ListItemIcon> <SensorDoorIcon /> </ListItemIcon> <ListItemText primary="Private Entrance" />  </ListItem> )}
        {privanteBathroom.length>0 && (<ListItem disablePadding> <ListItemIcon> <BathtubIcon /> </ListItemIcon> <ListItemText primary="Private Bathroom" />  </ListItem> )}
        {furniture.length>0 && (<ListItem disablePadding> <ListItemIcon> <WeekendIcon /> </ListItemIcon> <ListItemText primary="Furniture" />  </ListItem> )}

        


      </List>
 
  </Box>
    
    
  )
}

export default PerksList