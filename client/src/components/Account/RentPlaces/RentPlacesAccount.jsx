import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import {CssBaseline} from '@mui/material';
import {Grid} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useSnapshot } from 'valtio';
import state from '../../../store';
import { backendURL } from '../../../config/config';
const RentPlacesAccount = () => {

  const [rentPlaces,setRentPlaces]=useState([]);
  const snap=useSnapshot(state)

  useEffect(() => {
    axios.get('/user-rentplaces').then(({data}) => {
      setRentPlaces(data);
    })
  },[]);
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid  container spacing={2} sx={{mt:1,mb:2}}>
        {rentPlaces.length > 0 && rentPlaces.map(rentPlace=>(
          <Grid key={rentPlace._id} item xs={12} md={6} lg={4}>
          <Card sx={{ maxWidth: 345,m:'auto' }}>
            <Link to={`/rentplace/${rentPlace._id}` } style={{textDecorationLine:'none'}}>
              <CardMedia
                  component="img"
                  alt="Rent place photo"
                  height="140"
                  image={backendURL+rentPlace.photos[0]}
                />

            </Link>
             
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {rentPlace.title}
                </Typography>
                <Typography  variant="body2" color="text.secondary">
                  {rentPlace.description}
                </Typography>
                <Typography   variant="body4" color="text.secondary">
                  {`$ ${rentPlace.monthlyPrice} / Month`}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={2} sx={{mt:0,mb:0}}>
                  <Grid item>
                    <Link to={`/rentplace/${rentPlace._id}` } style={{textDecorationLine:'none'}}>
                    <Button size="small">
                      View Post    
                      <FindInPageIcon sx={{ml:'5px'}}/>

                    </Button>                    
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link to={`/account/rentplaces/${rentPlace._id}`} style={{textDecorationLine:'none'}}>
                      <Button size="small">
                      Edit Post
                      <EditIcon  sx={{ml:'5px'}}/>
                    </Button>
                    </Link>
                  </Grid>

                </Grid>
                             
                
              </CardActions>
            </Card>
  
          </Grid>
  

        ))}
        
      </Grid>
    
    
 
  </Container>
  )
}

export default RentPlacesAccount