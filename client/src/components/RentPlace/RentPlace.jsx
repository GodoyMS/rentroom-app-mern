import React from 'react'
import {Link, useParams} from "react-router-dom";
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { format,parseISO  } from "date-fns";

import RentPlaceGallery from '../Widgets/RentPlaceGallery';
import PerksList from '../Widgets/PerksList';
import { Paper,Container,Typography,CssBaseline,Box,Avatar, Icon, Button,Divider, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { red } from '@mui/material/colors';
import { UserContext } from '../../utils/UserContext';
import ModalHelper from '../Widgets/ModalHelper';
import ToastAlert from '../Widgets/ToastAlert';

const RentPlace = () => {
    const {id} = useParams();
    const [place,setPlace] = useState(null);
    const [nameRentPlace,setNameRentPlace]=useState('')
    const [monthlyPricePlace,setMonthlyPricePlace]=useState(0);
    const {user}=useContext(UserContext);
    const [modalOpen,setModalOpen]=useState(false)
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    console.log(user);
    async function saveToFavorites(ev) {
      ev.preventDefault();
      const favoritePlaceData = {
        rentPlace:id,name:nameRentPlace,monthlyPrice:monthlyPricePlace
      };
      if(!user){
        setModalOpen(true);
        

      }else{
        try {
          await axios.post('/account/postfavorite', favoritePlaceData)
            .then((e)=>{alert(e.statusText,"hi")})
            .catch(err=>{alert(err)});
  
          
        } catch (error) {
          console.log(error)
          
        }
      }      
    
      }


    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(`/rentplaces/${id}`).then(response => {

        setPlace(response.data);
        setNameRentPlace(response.data.title);
        setMonthlyPricePlace(response.data.monthlyPrice);
        
      });
    }, [id]);


  
    if (!place) return '';



  return (
    <>

    <Container component="main" maxWidth="md">
      <CssBaseline/>
     
       <Typography variant='h5' component="h1" sx={{
        marginTop: 8,
        // display: "flex",
        // flexDirection: "row",
        // alignItems: "start"
      }}>
        {place.title}
      </Typography>

      <ModalHelper ismodalOpen={modalOpen} handleClose={handleClose} handleOpen={handleOpen}/>
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center", mt:2}}>
          <Box sx={{display:"flex"}}>
            <Icon>
              <LocationOnIcon sx={{color:"text.secondary"}}/>
            </Icon>
            <Typography variant='subtitle1' color="text.secondary">
              {`${place.country}, ${place.region}`}
            </Typography>
          </Box>
          <Button onClick={saveToFavorites} variant="outlined">
            <FavoriteIcon />
            <Typography>Save</Typography>
          </Button>


      </Box>

      <RentPlaceGallery place={place}/>
      <Grid container spacing={2} sx={{mt:1,mb:2}}>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap:1,
                  p:2
                  
                }} >
                  

                  <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
                    <Avatar
                    sx={{ bgcolor: "primary",width: 36, height: 36 }}
                    
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                  > B</Avatar> 
                  <Typography variant='subtitle1' component="header">{place.owner.name}</Typography>  

                  </Box>

                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"end",alignItems:"end"}}>
                     
                  <Typography variant="subtitle2" component="span" color="text.secondary" align='right'>{ format(parseISO(place.date), 'MMM dd, yyyy')}</Typography>  

                  </Box>







                  {place.availability==="Available" && (
                      <Button sx={{display:"flex",gap:2,alignItems:"center",width:"100%",mt:1}} variant='outlined'>
                      <CheckCircleIcon/>
                      <Typography variant="subtitle1" component="span"  sx={{fontSize:15}}>{place.availability}</Typography>
                        
                        </Button>                     
                  )} 

                  {place.availability==="Unavailable" && (
                      <Button sx={{display:"flex",gap:2,alignItems:"center",width:"100%",mt:1}} color="error" variant='outlined'>
                      <UnpublishedIcon/>
                      <Typography variant="subtitle1" component="span"  sx={{fontSize:15}}>{place.availability}</Typography>
                        
                        </Button>                     
                  )}

                
                     

                <Box sx={{display:"flex",gap:1,alignItems:"center",mt:2}}>
                  <LocationOnIcon/>
                  <Typography variant="subtitle1" component="span" color="text.secondary" sx={{fontSize:15}}>{place.address}</Typography>  

                </Box>

                <Box sx={{display:"flex",gap:1,alignItems:"center",}}>
                  <PeopleIcon/>

                  <Typography variant="subtitle1"  component="span" color="text.secondary" >{`Max people: ${place.maxPeople}`}</Typography>  

                </Box>

                <Divider flexItem></Divider>

                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"end",alignItems:"end"}}>
                  <Typography variant="subtitle1"  component="span" color="primary" sx={{fontSize:20,fontWeight:"bold"}}>{` $ ${place.monthlyPrice} / month`}</Typography>  

                </Box>
   
            </Box>

          </Paper>
  

        </Grid>




        <Grid item  xs={12} sm={8}>
          
      <Box sx={{
            marginTop: 2,
             display: "flex",
             flexDirection: "column",
             alignItems: "start",
             gap:1
            
          }} >
        <Typography variant="h6" component='h2' >
          Description
        </Typography>
        
        <Typography paragraph color="text.secondary">
          {place.description}
        </Typography>
      </Box>

      <Divider></Divider>

      <Box sx={{
            marginTop: 2,
             display: "flex",
             flexDirection: "column",
             alignItems: "start",
             gap:1
            
          }} >
        <Typography variant="h6" component='h2' >
          What this place offers
        </Typography>
        
        <PerksList place={place}/>

      </Box>
      <Divider> </Divider>
      <Box sx={{
            marginTop: 2,
             display: "flex",
             flexDirection: "column",
             alignItems: "start",
             gap:1
            
          }} >
        <Typography variant="h6" component='h2' >
          Extra Info
        </Typography>
        
        <Typography paragraph color="text.secondary">
          {place.extraInfo}
        </Typography>
      </Box>

        </Grid>

      </Grid>
  






     


    </Container>
    </>
  )
}

export default RentPlace