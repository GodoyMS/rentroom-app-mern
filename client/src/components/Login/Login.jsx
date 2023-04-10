import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../../utils/UserContext.jsx";

import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import { string, number } from "yup";
//
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormHelperText } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  const handleSubmit =  async (values) => {
    try {
      await axios.post('/login', values)
        .then((response)=>{setUser(response.data)})
        .then(()=>alert('Login succesful'))
        .then(()=>setRedirect(true))
        .catch((e)=>console.log(e))
  
      
    } catch (error) {
      alert('Login failed');

    }
  
};


  const formik = useFormik({
    initialValues: {email:"",password:""},
    onSubmit:(values)=>{
      handleSubmit(values)
    },

    validationSchema: Yup.object({
      email: string().email('Invalid email address').required('Required'),
      password: string().required('Required'),

    }),
  });



  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (


    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          error={formik.errors.email && formik.touched.email ? true:false}
          
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"          
          autoComplete="email"
          autoFocus
          
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          {...formik.getFieldProps('email')}

        />
        <FormHelperText>{formik.errors.email && formik.touched.email ? <Typography color={"tomato"}>{formik.errors.email}</Typography>  : (<DoneAllIcon color="success"/>)}</FormHelperText>

        


        








        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={ev => setPassword(ev.target.value)} 
          {...formik.getFieldProps('password')}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
          <Link to={'/register'}  style={{textDecorationLine:'none'}} >
              <Typography variant="p" color="primary">
              {"Forgot password?"}
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to={'/register'}  style={{textDecorationLine:'none'}} >
              <Typography variant="p" color="primary">
              {"Don't have an account? "}<strong>Sign Up</strong>
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>










  );
}
export default LoginPage;