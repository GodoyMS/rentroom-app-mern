import React,{useState} from 'react';
import {Navigate} from "react-router-dom";
import axios from 'axios';
import { Container, FormLabel, TextareaAutosize } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Button} from '@mui/material';
import {Typography} from '@mui/material';
import {Input} from '@mui/material';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhotosUploader from '../../Widgets/PhotosUploader';
import Perks from './Perks/Perks';
const RentPlaceForm = () => {

  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [maxPeople,setMaxPeople] = useState(1);
  const [monthlyPrice,setMonthlyPrice] = useState(100);
  const[country,setCountry]= useState('');
  const[region,setRegion]= useState('');
  const [redirect,setRedirect] = useState(false);



async function submitRentPlace(ev) {
  ev.preventDefault();
  const rentPlaceData = {
    title,country,region, address, addedPhotos,
    description, perks, extraInfo,
     maxPeople, monthlyPrice
  };

    await axios.post('/account/rentplaces/post', rentPlaceData);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/rentplaces'} />
  }


  







  return (

    <Container component="main" maxWidth="md">
      
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom:8
      }}
    >
      
      <Typography component="h1" variant="h5">
        New Rent Place
      </Typography>
      <Box
        component="form"
        onSubmit={submitRentPlace}
        noValidate
        sx={{ mt: 1 }}
      >
          <TextField
          
          
          margin="normal"
          required
          fullWidth
          id="title"
          type="text"
          label="Title"
          name="title"          
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          autoFocus
        />
       

        <TextField
          
          
          margin="normal"
          required
          fullWidth
          id="address"
          type="text"
          label="Address"
          name="address"
          value={address}
          onChange={ev => setAddress(ev.target.value)}

          autoFocus
          

        />

          <Grid container spacing={2} sx={{mt:1,mb:2}}>
            <Grid item  xs={6}>
            <label htmlFor='countries'>Country</label>


            </Grid>
            <Grid item  xs={6}>
            <label htmlFor='regions'>Region</label>

            </Grid>

            <Grid item  xs={6}>
            <CountryDropdown     
                  id='countries'
                  value={country}
                  onChange={(ev) => setCountry(ev)}
                  required

                  style={{
                    
                    width:'100%',
                    padding:'0.5rem',             
                    borderRadius:'5px',       
                    backgroundColor:'white',
                    color:'black'
                    
                }}
                   />

            </Grid>
            <Grid item xs={6}>
                <RegionDropdown

                id='countries'
                country={country}
                value={region}
                required
                onChange={ev => setRegion(ev)}
                style={{
                    
                  width:'100%',
                  padding:'0.5rem',             
                  borderRadius:'5px',       
                  backgroundColor:'white',
                  color:'black'
                  
              }}

                />
            </Grid>
            
            
          </Grid>



        

        
          <FormLabel id="description">Description</FormLabel>

          <TextareaAutosize 
            aria-labelledby='description'
            
            style={{resize:'none',width:'100%',fontFamily:'inherit',backgroundColor:'transparent',color:'black'}} 
            placeholder="Write a description"
            minRows={6}
            value={description}
            label="Title"

            onChange={ev => {setDescription(ev.target.value);console.log(description)}}
            >           

          </TextareaAutosize>

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          <Perks selected={perks} onChange={setPerks}/>


          <FormLabel id="extrainfo">Extra Information</FormLabel>
          <TextareaAutosize 
            aria-labelledby='extrainfo'
            required
            
            
            style={{resize:'none',width:'100%',fontFamily:'inherit',backgroundColor:'transparent',color:'black'}} 
            placeholder="Write extra information"
            minRows={3}
            value={extraInfo}
            label="Extra information"

            onChange={ev => {setExtraInfo(ev.target.value);console.log(description)}}
            >           

          </TextareaAutosize>

          <Grid container spacing={2} sx={{mt:1,mb:2}}>
            <Grid item xs={6}>
              <TextField
                
                
                margin="normal"
                required
                sx={{width:'100%'}}
                
                
                id="maxNumberOfPeople"
                type="number"
                label="Max number of people"
                name="maxNumberOfPeople"
                value={maxPeople}
                onChange={ev => setMaxPeople(ev.target.value)}

                autoFocus         

              />
            </Grid>
            <Grid item xs={1}>

            </Grid>

              <Grid item xs={1}>
              <TextField
                  
                  
                  margin="normal"
                  sx={{width:'100%'}}
                  disabled
                  label="$"


                />

              </Grid>
              <Grid item xs={4}>
              <TextField
                  
                  
                  margin="normal"
                  required
                  sx={{width:'100%'}}
                  
                  
                  id="maxNumberOfPeople"
                  type="number"
                  label="Price/month"
                  name="maxNumberOfPeople"
                  value={monthlyPrice}
                  onChange={ev => setMonthlyPrice(ev.target.value)}

                  autoFocus         

                />

              
              
            </Grid>

          </Grid>
          

         




         
       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Post
        </Button>
        
      </Box>
    </Box>
  </Container>
  )
}

export default RentPlaceForm