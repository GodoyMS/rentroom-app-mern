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
import { Link, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnapshot } from 'valtio';
import state from '../../../store';
const Favorites = () => {
  const snap=useSnapshot(state)

  const [rentPlaces,setRentPlaces]=useState([]);
  const [idToDelete,setIdToDelete]=useState('');

  async function deleteFavorite(ev) {
    
    try {
      const response = await axios.delete(`/account/deletefavorite/${ev._id}`) ;
        alert('Item deleted');

      
    } catch (error) {
      console.log(error)
      
    }
  
    }

  useEffect(() => {
    axios.get('/account/retrievefavorites').then(({data}) => {
      setRentPlaces(data);
    })
  },[rentPlaces]);
   return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid  container spacing={2} sx={{mt:1,mb:2}}>
        {rentPlaces.length > 0 && rentPlaces.map(rentPlace=>(
          <Grid key={rentPlace.rentPlace._id} item xs={12} md={6} lg={4}>
          <Card sx={{ maxWidth: 345,m:'auto' }}>
            <Link to={`/rentplace/${rentPlace.rentPlace._id}` } style={{textDecorationLine:'none'}}>
              <CardMedia
                  component="img"
                  alt="Rent place photo"
                  height="140"
                  image={snap.backendurl+rentPlace.rentPlace.photos[0]}
                />

            </Link>
             
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {rentPlace.rentPlace.title}
                </Typography>
             
                <Typography   variant="body4" color="text.secondary">
                  {`$ ${rentPlace.rentPlace.monthlyPrice} / Month`}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={2} sx={{mt:0,mb:0}}>
                  <Grid item>
                    <Link to={`/rentplace/${rentPlace.rentPlace._id}` } style={{textDecorationLine:'none'}}>
                    <Button size="small">
                          View Post    
                      <FindInPageIcon sx={{ml:'5px'}}/>

                    </Button>                    
                    </Link>
                  </Grid>

                  <Grid item>
                      <Button size="small" onClick={()=>deleteFavorite(rentPlace)} >
                         Delete
                      <DeleteIcon  sx={{ml:'5px'}}/>
                    </Button>
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

export default Favorites