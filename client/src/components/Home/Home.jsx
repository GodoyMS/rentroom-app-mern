import * as React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { styled } from '@mui/material/styles';
import {Box} from '@mui/material';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import {Divider, Tooltip} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red,lightBlue } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container,CssBaseline,Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {Button} from '@mui/material';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import state from '../../store';
import { useSnapshot } from 'valtio';
import { useContext } from 'react';
import { UserContext } from '../../utils/UserContext';
import { backendURL } from '../../config/config';

const Home = () => {
  const {user}=useContext(UserContext)
  const [allRentPlaces,setAllRentPlaces]=useState([]);
  const[isSearchMode,setIsSearchMode]=useState(false);
  const[countrySearch,setCountrySearch]=useState("");
  const[regionSearch,setRegionSearch]=useState("");
  const[isSearchButton,setisSearchButton]=useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const handleSearch=(ev)=>{
    setRegionSearch(ev);
    setIsSearchMode(true);
    setisSearchButton(true)
  }

  const resetSearch=()=>{
    setIsSearchMode(false);
    setisSearchButton(false);
    setCountrySearch("");
    setRegionSearch("")
  }
  const snap=useSnapshot(state)
  useEffect(() => {
    axios.get('/rentplaces').then(({data}) => {
      setAllRentPlaces(data);
      setIsLoading(false);
    })
  },[]);
  console.log(user)
  
  return (
    <Container style={{paddingBottom:"200px"}}>
      <CssBaseline />

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
                  value={countrySearch}
                  onChange={(ev) =>{ setCountrySearch(ev);setRegionSearch("")}}
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
                country={countrySearch}
                value={regionSearch}
                required
                onChange={ev =>{ handleSearch(ev);}}
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

         {isSearchButton&&(
      
           <Button           
           onClick={resetSearch}           
           variant="outlined"
           endIcon={<YoutubeSearchedForIcon/>}
           
         >
           Reset 
         </Button>
         
         )}

        
          <Box
            component={"div"}
            sx={{mt:5}}
            >
            <Typography variant="subtitle2" component={"span"} sx={{fontWeight:"bold"}} color="primary">
              {isSearchMode? `Search for: ${countrySearch} - ${regionSearch}` :'All countries, all regions'}
          <Divider/>
          </Typography>

          </Box>
          
          
        
      {isLoading &&(<div>Loading ...</div>)}
      <Grid  container spacing={2} sx={{mt:1,mb:2}}>
        {allRentPlaces.length>0 &&!isSearchMode && allRentPlaces.map((rentPlace)=>(
          <Grid key={rentPlace._id} item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' sx={{ maxWidth: 345,position:'relative',m:'auto' }}>
            <Link to={`/rentplace/${rentPlace._id}` } style={{textDecorationLine:'none'}}>
            <CardMedia
              sx={{position:'relative'}}
              component="img"
              height="300"
              image={backendURL +rentPlace.photos[0]}
              alt={rentPlace.title}/>        
            
            </Link>

            

            <CardHeader
            
              avatar={
                <Avatar sx={{ bgcolor: lightBlue[500] }} aria-label="recipe">
                  {rentPlace?.ownerName?.slice(0,1)}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={rentPlace.owner.name}
              subheader={`${rentPlace.country}, ${rentPlace.region}`}
            />
            <CardContent sx={{marginBottom:'-10px'}}>
              <Typography variant="subtitle1" sx={{fontWeight:"bold"}} color="primary">
              {`$ ${rentPlace.monthlyPrice} / Month`}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary"  aria-label="more">
                {`Publication date: ${rentPlace.date.slice(0, 10)}`}
              </Typography>
            </CardContent>

            <Tooltip  sx={{position:'absolute',top:0,right:0,p:1}} title="Add to favorites">
            <IconButton>
            <FavoriteIcon sx={{color:red[500]}}/>
            </IconButton>
            </Tooltip>

              


           
           
            

          </Card>
          

        </Grid>
          
        ))}

      {allRentPlaces.length>0 && isSearchMode && allRentPlaces.map((rentPlace)=>{
        if(rentPlace.country===countrySearch && rentPlace.region===regionSearch){
          return (
              <Grid key={rentPlace._id} item xs={12} sm={6} md={4} lg={3}>
              <Card variant='outlined' sx={{ maxWidth: 345,position:'relative',m:'auto' }}>
                <Link to={`/rentplace/${rentPlace._id}` } style={{textDecorationLine:'none'}}>
                <CardMedia
                  sx={{position:'relative'}}
                  component="img"
                  height="300"
                  image={backendURL +rentPlace.photos[0]}
                  alt={rentPlace.title}/>                        
                </Link>    

                <CardHeader
                
                  avatar={
                    <Avatar sx={{ bgcolor: lightBlue[500] }} aria-label="recipe">
                      {rentPlace.ownerName.slice(0,1)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={rentPlace.owner.name}
                  subheader={`${rentPlace.country}, ${rentPlace.region}`}
                />
                <CardContent sx={{marginBottom:'-10px'}}>
                  <Typography variant="subtitle1" sx={{fontWeight:"bold"}} color="primary">
                  {`$ ${rentPlace.monthlyPrice} / Month`}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary"  aria-label="more">
                    {`Publication date: ${rentPlace.date.slice(0, 10)}`}
                  </Typography>
                </CardContent>

                <Tooltip  sx={{position:'absolute',top:0,right:0,p:1}} title="Add to favorites">
                <IconButton>
                <FavoriteIcon sx={{color:red[500]}}/>
                </IconButton>
                </Tooltip>
              </Card>
            </Grid>
            )
          }
        }
       
        
        
      )}
        

      </Grid>
    
    
    </Container>
  );
}

export default Home