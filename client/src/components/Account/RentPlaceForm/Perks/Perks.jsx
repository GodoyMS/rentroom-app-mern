import React from 'react'
import {FormControlLabel} from '@mui/material'
import {Checkbox} from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi';
import DoneIcon from '@mui/icons-material/Done';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import PetsIcon from '@mui/icons-material/Pets';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import BathtubIcon from '@mui/icons-material/Bathtub';
import WeekendIcon from '@mui/icons-material/Weekend';
const Perks = ({selected,onChange}) => {

    function handleClickChange(ev) {
        const {checked,name} = ev.target;
        if (checked) {
          onChange([...selected,name]);
        } else {
          onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
      }
    const radioGroupElement=(nameProp,icon,text)=>{
        return(<FormControlLabel 
            control={<Checkbox checked={selected.includes(nameProp)} onChange={handleClickChange} inputProps={{name:nameProp}}  checkedIcon={<DoneIcon />} />}
             label={<div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1px'}}>{icon}{text}</div>} />
        )
    }
  return (
            <div style={{margin:'10px 0px'}}>

                {radioGroupElement('wifi',<WifiIcon/>,'Wi-fi')}
                {radioGroupElement('tv',<ConnectedTvIcon/>,'TV')}
                {radioGroupElement('pets',<PetsIcon/>,'Pets')}
                {radioGroupElement('parking',<DirectionsCarIcon/>,'Parking spot')}
                {radioGroupElement('privateEntrance',<SensorDoorIcon/>,'Private Entrance')}
                {radioGroupElement('privateBathroom',<BathtubIcon/>,'Private bathroom')}
                {radioGroupElement('furniture',<WeekendIcon/>,'Furniture included')}




   
            </div>

  )
}

export default Perks