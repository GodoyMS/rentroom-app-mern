import React from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../utils/UserContext'
import { useContext,useState,useEffect } from 'react';
import { Container,CssBaseline,Avatar, TextField, Button, Box } from '@mui/material';
function Account() {
  const {auth,user,setUser} = useContext(UserContext);  
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [shortDescription,setShortDescription] = useState('');

  useEffect(() => {      
    axios.get('/profile').then(response => {
       const {data} = response;
       setName(data.name);
       setEmail(data.email);  
       setShortDescription(data.shortDescription);       

    });
  }, []);

  async function submitUpdateProfile(ev) {
    ev.preventDefault();
    const rentPlaceData = { name,email,shortDescription };

    
  
    await axios.put('/update-profile', {...rentPlaceData}).then(alert('profile updated saved'))
    await axios.get('/profile').then(({data}) => {
      setUser(data);
    });
          
    ;}

  return (
    <div>
    {user && (
    <Container maxWidth="md">
      <CssBaseline />
      <Avatar
      alt="Remy Sharp"
      src="/static/images/avatar/1.jpg"
      sx={{ width: 56, height: 56,mx:'auto' }}
      />

      <Box
      component="form"
      onSubmit={submitUpdateProfile}
      noValidate
      sx={{ mt: 1 }}
      >

      
      <TextField  
      margin="normal"
          required
          fullWidth
          id="address"
          type="text"
          label="Name"
          name="name"
          value={name}
          onChange={ev => setName(ev.target.value)}

          autoFocus></TextField>

      <TextField  
      margin="normal"
          required
          fullWidth
          id="address"
          type="text"
          label="Email Address"
          name="email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}

          autoFocus></TextField>

           <TextField  
      margin="normal"
          required
          fullWidth
          id="shortDescription"
          type="text"
          label="Short Description"
          name="shortDescription"
          value={shortDescription}
          onChange={ev => setShortDescription(ev.target.value)}
          multiline
          rows={4}

          autoFocus></TextField>

          <Button
          type="submit"
          fullWidth
          
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >Update </Button>

   </Box>

    </Container>
    )}
    {/* {!user   && (<Navigate to={'/login'}/>) } */}
    </div>
  )
  
 
}

export default Account