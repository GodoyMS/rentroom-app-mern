import React from 'react'
import { useState,useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container,CssBaseline,Grid,Typography,Button } from '@mui/material';
import {Box} from '@mui/material';
import { TextareaAutosize,TextField,FormLabel,FormGroup,FormControlLabel,Switch } from '@mui/material';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import PhotosUploader from '../../Widgets/PhotosUploader';
import Perks from '../RentPlaceForm/Perks/Perks';
import {IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const RentPlaceId = () => {
    const{id}=useParams();
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
    const[availability,setAvailability]=useState('')
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get('/rentplaces/'+id).then(response => {
           const {data} = response;
           setTitle(data.title);
           setAddress(data.address);
           setCountry(data.country);
           setRegion(data.region);
           
           setAddedPhotos(data.photos);
           setDescription(data.description);
           setPerks(data.perks);
           setExtraInfo(data.extraInfo);
           setMaxPeople(data.maxPeople);
           setMonthlyPrice(data.monthlyPrice);
           setAvailability(data.availability)
        });
      }, [id]);

      function handleTogleSwitch(ev){
        const {checked,name,value} = ev.target;
        if(value==='Available'){
            setAvailability('Unavailable')
        }   
        if(value==='Unavailable'){
            setAvailability('Available')
        }       
      }

      async function submitSaveRentPlace(ev) {
        ev.preventDefault();
        const rentPlaceData = {
          title,country,region, address, addedPhotos,
          description, perks, extraInfo,
           maxPeople, monthlyPrice,availability };
      
        await axios.put('/account/rentplace/update', {id, ...rentPlaceData}).then(alert('Changes saved'))
        ;}

        async function handleDeleteRentPlace() {
            try {
                const response = await axios.delete(`/account/rentplaces/${id}`) ;
                alert('Post deleted');
                setRedirect(true);
             }             
             catch (error) {
                console.error('Error deleting object:', error);
                
            }
        }

        if(redirect){
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
        alignItems: "center"
      }}
    >
        <Link to={'/account/rentplaces'} style={{alignSelf:'start'}}>        
            <IconButton >
                <ArrowBackIcon />
            </IconButton>
        </Link>
      
      <Typography component="h1" variant="h5">
        Edit Rent Place
      </Typography>
      <Box
        component="form"
        onSubmit={submitSaveRentPlace}
        noValidate
        sx={{ mt: 1 }}
      >
        <div style={{display:'flex',justifyContent:'center'}}>
            <FormGroup  >
                <FormControlLabel control={<Switch checked={availability==='Available'} value={availability} onChange={handleTogleSwitch} inputProps={{name:'availabiltyButton'}} />} label={availability}/>
            </FormGroup>
            
        </div>
        
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
            
            
            style={{resize:'none',width:'100%',fontFamily:'inherit',backgroundColor:'transparent',color:'black'}} 
            placeholder="Write extra information"
            minRows={3}
            value={extraInfo}
            label="Extra information"

            onChange={ev => {setExtraInfo(ev.target.value)}}
            >           

          </TextareaAutosize>

          <Grid container spacing={2} sx={{mt:1,mb:2}}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={0} md={1}>
            </Grid>

              <Grid item xs={2} md={1}>
              <TextField
                  
                  
                  margin="normal"
                  sx={{width:'100%'}}
                  disabled
                  label="$"


                />

              </Grid>
              <Grid item xs={9} md={4}>
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
          <Grid container spacing={2} sx={{mt:1,mb:2}}>
            <Grid item xs={12} md={6}>
                <Button
                    type="submit"
                    fullWidth
                    
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    <SaveIcon sx={{mr:1}}/>
                    Save
                </Button>

            </Grid>
            <Grid item xs={12} md={6}>
                <Button
                    onClick={handleDeleteRentPlace}
                    color='warning'
                    fullWidth

                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    <DeleteIcon sx={{mr:1}}/>
                    Delete
                </Button>

            </Grid>
          </Grid>
       
        
        
        
      </Box>
    </Box>
  </Container>
 

  )
}

export default RentPlaceId